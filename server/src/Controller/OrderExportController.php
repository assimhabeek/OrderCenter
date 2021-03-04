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

    private const CARIFEX_TYPE = 'carifex';
    private const NON_CARIFEX_TYPE = 'non-carifex';


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

        $typeExpression = $type === self::CARIFEX_TYPE ?
            $this->orderCompletion->carifexCompleted() :
            $this->orderCompletion->nonCarifexCompleted();

        $timeExpression = new CompositeExpression(CompositeExpression::TYPE_AND, [
            Criteria::expr()->gte('orderDate', $start),
            Criteria::expr()->lte('orderDate', $end)
        ]);

        $statusExpression = Criteria::expr()->eq('orderStatus', Order::ORDER_STATUS_QUEUED);


        $previewExpression = new CompositeExpression(CompositeExpression::TYPE_AND, [
            $typeExpression,
            $timeExpression,
            $statusExpression
        ]);


        $criteria = Criteria::create()->where($previewExpression);


        $orders = $this->em->getRepository(Order::class)->matching($criteria)->toArray();

        return $this->responseToJson($response, ['status' => true, 'data' => $orders, 'query' => $criteria]);
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

        $output = $this->createXlsxFile($data, $exportHistory);
        if (!$output['status']) {
            return $this->responseToJson($response, $output);
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
        return $exportHistory->getType() === self::CARIFEX_TYPE ?
            $this->createCarifexFile($data, $exportHistory) :
            $this->createNonCarifexFile($data, $exportHistory);
    }

    private function createWriter($fileUrl): WriterInterface
    {
        $writer = WriterEntityFactory::createXLSXWriter();
        $writer->setShouldUseInlineStrings(false); // will use shared strings
        $writer = $writer->openToFile($fileUrl);
        $writer->setDefaultColumnWidth(30);
     //   $writer->setDefaultRowHeight(20);
        $writer->getCurrentSheet()->setName(Utils::getSheetName());
        return $writer;
    }

    private function createCarifexFile($data, $exportHistory): array
    {

        try {
            $writer = $this->createWriter($exportHistory->getFileUrl());
            $writer = $this->appendCarifexHeader($writer);
            $writer = $this->writeCarifexOrders($writer, $data);
            $writer->close();
            return ["status" => true];
        } catch (\Exception $exception) {
            return ["status" => false, "message" => $exception->getMessage()];
        }
    }

    private function writeCarifexOrders($writer, $orders)
    {
        $registeredOrder = [];
        $carifexMap = Order::CARIFEX_FILE_MAP;

        foreach ($orders as $order) {

            $notExistsBefore = $this->orderNotExistsYet($registeredOrder, $order);

            if ($notExistsBefore) {
                array_push($registeredOrder, $order['orderNo']);
                $firstRow = $this->createCarifexFirstRow($carifexMap, $order);
                $writer->addRow($firstRow->writterRow);
                $order[$firstRow->sku] = 'NIL';
            }

            $rows = $this->generateRowsFromSkus($order);

            foreach ($rows as $r) $writer->addRow($r);

        }
        return $writer;
    }

    private function orderNotExistsYet($registeredOrder, $datum): bool
    {
        return !in_array($datum['orderNo'], $registeredOrder);
    }

    private function createCarifexFirstRow($map, $datum)
    {
        $key = $this->getFirstValidSkus($datum);
        $map["SKU"] = $key !== null ? $key : 'TEMP';
        if ($map["SKU"] === 'TEMP') $datum['TEMP'] = '-';
        $datum["ShipService"] = "PREPAID";
        $datum["ShipBilling"] = "PREPAID";
/*        $datum["ShipAccount"] = "PREPAID";*/

        $firstRow = new \stdClass();
        $firstRow->writterRow = WriterEntityFactory::createRow($this->generateRowFromMap($map, $datum));
        $firstRow->sku = $key;
        return $firstRow;
    }

    private function createNonCarifexFile($data, $exportHistory)
    {
        try {
            $writer = $this->createWriter($exportHistory->getFileUrl());
            $writer = $this->appendNonCarifexHeader($writer);

            foreach ($data as $datum) {
                $row = WriterEntityFactory::createRow($this->generateRowFromMap(Order::NON_CARIFEX_MAP, $datum));
                $writer->addRow($row);
            }
            $writer->close();

            return ["status" => true];
        } catch (\Exception $exception) {
            return ["status" => false, "message" => $exception->getMessage()];
        }
    }

    private function appendCarifexHeader($writer)
    {
        $header = $this->carifexFileTopNotes();
        $style = (new StyleBuilder())->setFontBold()->build();
        $writer->addRow(WriterEntityFactory::createRowFromArray($header, $style));
        $writer->addRow(WriterEntityFactory::createRowFromArray(array_keys(Order::CARIFEX_FILE_MAP), $style));
        return $writer;
    }

    private function appendNonCarifexHeader($writer)
    {
        $style = (new StyleBuilder())->setFontBold()->build();
        $writer->addRow(
            WriterEntityFactory::createRowFromArray(
                array_keys(Order::NON_CARIFEX_MAP),
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
        $firstValid = null;
        foreach (Order::CARIFEX_TYPE_COLUMNS as $item) {
            if ($datum[$item] != 'NIL') {
                $firstValid = $item;
                continue;
            }
        }
        return $firstValid;
    }

    private function generateRowFromMap($map, $datum)
    {
        $row = [];
        foreach ($map as $key => $value) {
            $it = isset($value) && isset($datum[$value]) ? $datum[$value] : '';
            $it = $it === 'NIL' ? '-' : $it;
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
            if ($order[$col] != 'NIL') {
                $line = WriterEntityFactory::createRowFromArray(
                    $this->carifexRow(
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


    private function carifexFileTopNotes()
    {
        $row = array_fill(0, 30, "");
        $row[3] = "Order Import Template";
        $row[6] = "*Blue headers are required fields";
        return $row;
    }

    private function carifexRow($orderNo, $sku, $qty)
    {
        $row = array_fill(0, 30, "");
        $row[0] = $orderNo;
        $row[3] = 'PREPAID';
        $row[4] = 'PREPAID';
//        $row[5] = 'PREPAID';
        $row[23] = $sku;
        $row[24] = $qty;
        return $row;
    }


}
