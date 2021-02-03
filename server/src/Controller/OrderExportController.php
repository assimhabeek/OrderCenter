<?php


namespace App\Controller;

use App\Common\OrderCompletion;
use App\Common\Utils;
use App\Entity\ExportHistory;
use App\Entity\Order;
use Box\Spout\Writer\Common\Creator\Style\StyleBuilder;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Writer\WriterInterface;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Expr\CompositeExpression;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class OrderExportController extends BaseController
{
    private $authController;
    private $orderCompletion;
    private $exportHistoryController;

    private const CARIFIX_TYPE = 'carifix';
    private const NON_CARIFIX_TYPE = 'non-carifix';


    public function __construct(ContainerInterface $container,
                                AuthController $authController,
                                OrderCompletion $orderCompletion,
                                ExportHistoryController $exportHistoryController)
    {
        parent::__construct($container);
        $this->authController = $authController;
        $this->orderCompletion = $orderCompletion;
        $this->exportHistoryController = $exportHistoryController;
    }


    public function exportPreview(Request $request, Response $response): Response
    {

        $start = $request->getQueryParams()["start"];
        $end = $request->getQueryParams()["end"];
        $type = $request->getQueryParams()["type"];

        $typeExpression = $type === self::CARIFIX_TYPE ?
            $this->orderCompletion->carifexCompleted() :
            $this->orderCompletion->nonCarifexCompleted();

        $timeExpression = new CompositeExpression(CompositeExpression::TYPE_AND, [
            Criteria::expr()->gte('lastModification', $start),
            Criteria::expr()->lte('lastModification', $end)
        ]);

        $statusExpression = Criteria::expr()->eq('orderStatus', Order::ORDER_STATUS_QUEUED);


        $previewExpression = new CompositeExpression(CompositeExpression::TYPE_AND, [
            $typeExpression,
            $timeExpression,
            $statusExpression
        ]);


        $criteria = Criteria::create()->where($previewExpression);

        $orders = $this->em->getRepository(Order::class)->matching($criteria)->toArray();

        return $this->responseToJson($response, ['status' => true, 'data' => $orders]);
    }

    public function export(Request $request, Response $response): Response
    {
        $data = $request->getParsedBody()['data'];
        $type = $request->getParsedBody()['type'];
        $startDate = $request->getParsedBody()['startDate'];
        $endDate = $request->getParsedBody()['endDate'];

        $rootPath = $this->setting['exportPath'];
        $fileName = $this->creatFileName($type);

        $exportHistory = new ExportHistory();
        $exportHistory->setEndDate($endDate);
        $exportHistory->setStartDate($startDate);
        $exportHistory->setType($type);
        $exportHistory->setFileName($fileName);
        $exportHistory->setFileUrl($rootPath . $fileName);
        $exportHistory->setExportedBy($this->authController->getCurrentUser($request));

        if (!$this->createXlsxFile($data, $exportHistory)) {
            return $this->responseToJson($response,
                [
                    'status' => false,
                    'message' => 'Could not create file'
                ]
            );
        }

        $this->em->persist($exportHistory);
        $this->em->flush();


        $updateInfo = [
            'data' => array_column($data, "id"),
            'orderStatus' => Order::ORDER_STATUS_ARCHIVED,
            'exportId' => $exportHistory->getId()
        ];
        $this->archiveOrders($updateInfo, $exportHistory->getExportedBy()->getId());

        return $this->exportHistoryController->downloadFile($response, $exportHistory);
    }

    private function archiveOrders($updateInfo, $userId)
    {
        $sql = "UPDATE " . Order::class . " s SET 
        s.modifiedBy = :userId , 
        s.orderStatus = :orderStatus ,
        s.exportFile = :exportId 
        where s.id = :id ";

        $query = $this->em->createQuery($sql);

        $query->setParameter('exportId', $updateInfo['exportId']);
        $query->setParameter('orderStatus', $updateInfo['orderStatus']);
        $query->setParameter('userId', $userId);

        try {
            $this->em->getConnection()->beginTransaction(); // suspend auto-commit

            foreach ($updateInfo['data'] as $id) {
                $query->setParameter('id', $id);
                $query->getResult();
            }

            $this->em->flush();
            $this->em->getConnection()->commit();
        } catch (Exception $exception) {
            $this->em->getConnection()->rollBack();
        }

    }


    private function createXlsxFile($data, $exportHistory)
    {
        return $exportHistory->getType() === self::CARIFIX_TYPE ?
            $this->createCarifixFile($data, $exportHistory) :
            $this->createNonCarifixFile($data, $exportHistory);
    }

    private function createWriter($fileUrl): WriterInterface
    {
        $writer = WriterEntityFactory::createXLSXWriter();
        $writer->setShouldUseInlineStrings(false); // will use shared strings
        $writer = $writer->openToFile($fileUrl);
        $writer->setDefaultColumnWidth(30);
        $writer->setDefaultRowHeight(20);
        $writer->getCurrentSheet()->setName(date('Y-m-d'));
        return $writer;
    }

    private function createCarifixFile($data, $exportHistory): bool
    {

        try {
            $writer = $this->createWriter($exportHistory->getFileUrl());
            $writer = $this->appendCarifixHeader($writer);
            $writer = $this->writeCarifixOrders($writer, $data);
            $writer->close();
            return true;
        } catch (\Exception $exception) {
            return false;
        }
    }

    private function writeCarifixOrders($writer, $orders)
    {
        $registeredOrder = [];
        $carifixMap = Order::CARIFIX_FILE_MAP;

        foreach ($orders as $order) {

            $notExistsBefore = $this->orderNotExistsYet($registeredOrder, $order);

            $rows = $notExistsBefore ?
                $this->createCarifixFirstRow($carifixMap, $order) :
                $this->generateRowsFromSkus($order);

            if ($notExistsBefore) {
                array_push($registeredOrder, $order['orderNo']);
                $writer->addRow($rows);
            } else {
                foreach ($rows as $r) $writer->addRow($r);
            }

        }
        return $writer;
    }

    private function orderNotExistsYet($registeredOrder, $datum): bool
    {
        return !in_array($datum['orderNo'], $registeredOrder);
    }

    private function createCarifixFirstRow($map, $datum)
    {
        $key = $this->getFirstValidSkus($datum);
        $map["SKU"] = $key !== null ? $key : 'TEMP';
        if ($map["SKU"] === 'TEMP') $datum['TEMP'] = '-';
        $datum["ShipBilling"] = "PREPAID";
        $datum["ShipAccount"] = "PREPAID";

        return WriterEntityFactory::createRow($this->generateRowFromMap($map, $datum));
    }

    private function createNonCarifixFile($data, $exportHistory)
    {
        try {
            $writer = $this->createWriter($exportHistory->getFileUrl());
            $writer = $this->appendNonCarifixHeader($writer);

            foreach ($data as $datum) {
                $row = WriterEntityFactory::createRow($this->generateRowFromMap(Order::NON_CARIFIX_MAP, $datum));
                $writer->addRow($row);
            }
            $writer->close();

            return true;
        } catch (\Exception $exception) {
            return false;
        }
    }

    private function appendCarifixHeader($writer)
    {
        $header = $this->carifixFileTopNotes();
        $style = (new StyleBuilder())->setFontBold()->build();
        $writer->addRow(WriterEntityFactory::createRowFromArray($header, $style));
        $writer->addRow(WriterEntityFactory::createRowFromArray(array_keys(Order::CARIFIX_FILE_MAP), $style));
        return $writer;
    }

    private function appendNonCarifixHeader($writer)
    {
        $style = (new StyleBuilder())->setFontBold()->build();
        $writer->addRow(
            WriterEntityFactory::createRowFromArray(
                array_keys(Order::NON_CARIFIX_MAP),
                $style
            )
        );
        return $writer;
    }

    private function creatFileName($type): string
    {
        return Utils::getCurrentDateTime() . '_' . $type . '_export.xlsx';
    }

    private function getFirstValidSkus($datum)
    {
        $first_valid = null;
        foreach (Order::CARIFEX_TYPE_COLUMNS as $item) {
            if ($datum[$item] != '-') {
                $first_valid = $item;
                continue;
            }
        }
        return $first_valid;
    }

    private function generateRowFromMap($map, $datum)
    {
        $row = [];

        foreach ($map as $key => $value) {
            $it = isset($value) && isset($datum[$value]) ? $datum[$value] : '';
            $string = str_replace("\r", "", $it);
            $string = str_replace("\n", "", $string);
            array_push($row, WriterEntityFactory::createCell($string));
        }
        return $row;
    }


    private function generateRowsFromSkus($order): array
    {
        $rows = [];
        foreach (Order::CARIFEX_TYPE_COLUMNS as $col) {
            if ($order[$col] != '-') {
                $line = WriterEntityFactory::createRowFromArray(
                    $this->carifixRow(
                        $order['orderNo'],
                        $order[$col],
                        $order["quantity"]
                    )
                );
                array_push($rows, $line);
            }
        }
        return $rows;
    }


    private function carifixFileTopNotes()
    {
        $row = array_fill(0, 30, "");
        $row[3] = "Order Import Template";
        $row[6] = "*Blue headers are required fields";
        return $row;
    }

    private function carifixRow($orderNo, $sku, $qty)
    {
        $row = array_fill(0, 30, "");
        $row[0] = $orderNo;
        $row[4] = 'PREPAID';
        $row[5] = 'PREPAID';
        $row[23] = $sku;
        $row[24] = $qty;
        return $row;
    }


}
