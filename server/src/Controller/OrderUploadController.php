<?php


namespace App\Controller;

use App\Common\Utils;
use App\Common\VehicleMatch\VehicleMatcher;
use App\Entity\Order;
use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;
use Box\Spout\Reader\ReaderInterface;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class OrderUploadController extends BaseController
{
    private $authController;
    private $vehicleMatcher;

    public function __construct(ContainerInterface $container,
                                AuthController $authController,
                                VehicleMatcher $vehicleMatcher)
    {
        parent::__construct($container);
        $this->authController = $authController;
        $this->vehicleMatcher = $vehicleMatcher;
    }

    public function upload(Request $request, Response $response): Response
    {
        $uploadedFile = $request->getUploadedFiles()["file"];

        if ($this->hasError($uploadedFile)) {
            return $this->responseToJson($response,
                [
                    "status" => false,
                    "log" => $uploadedFile->getError(),
                    "message" => "Failed to upload file"
                ]
            );
        }


        $responsePayload = [];

        try {

            $dataArray = $this->getFileContent($uploadedFile);

            $orders = $this->parseOrders($dataArray, $this->getOrderExtraFields($request));

            $this->em->getConnection()->beginTransaction(); // suspend auto-commit

            foreach ($orders as $order) {
                $this->em->persist($order);
            }

            $this->em->flush();
            $this->em->getConnection()->commit();

            $responsePayload = ["status" => true, "message" => "Uploaded successfully"];

        } catch (Exception $exception) {
            $this->em->getConnection()->rollBack();
            $responsePayload = ["status" => false, "message" => "Failed to read file"];
        }

        return $this->responseToJson($response, $responsePayload);
    }

    private function getOrderExtraFields(Request $request): \stdClass
    {
        $extras = new \stdClass();

        $currentDate = Utils::getCurrentDateTime();

        $extras->user = $this->authController->getCurrentUser($request);
        $extras->orderDate = $currentDate;
        $extras->lastModificationDate = $currentDate;

        return $extras;
    }

    private function hasError($uploadedFile): bool
    {
        return $this->uploadFailed($uploadedFile) || $this->notValidExtension($uploadedFile);
    }

    private function uploadFailed($uploadedFile): bool
    {
        return $uploadedFile->getError() !== UPLOAD_ERR_OK;
    }

    private function notValidExtension($uploadedFile): bool
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
        $exceptedExtensions = ['xlsx', 'xls', 'csv'];
        return !in_array($extension, $exceptedExtensions);
    }

    private function getFileContent($uploadedFile): array
    {
        $reader = ReaderEntityFactory::createReaderFromFile($uploadedFile->getClientFilename());

        $reader->setEncoding("UTF-8");

        $reader->open($uploadedFile->getFilePath());


        $dataArray = $this->dataToArray($reader);

        $reader->close();

        return $dataArray;
    }


    private function dataToArray(ReaderInterface $reader): array
    {
        $data = array();

        foreach ($reader->getSheetIterator() as $sheet) {

            foreach ($sheet->getRowIterator() as $rowIndex => $row) {

                if ($rowIndex === 1) continue;

                array_push($data, $row->toArray());

            }
        }
        return $data;
    }

    private function parseOrders($dataArray, $extras): array
    {
        $orders = [];
        foreach ($dataArray as $item) array_push($orders, $this->parseOrder($item, $extras));
        return $orders;
    }

    private function parseOrder($item, $extras): Order
    {
        $order = new Order();
        $modelMatcher = $this->vehicleMatcher->matchVehicle($item[4]);
        $vehicle = $modelMatcher ? $modelMatcher->getBestMatchedVehicle() : null;

        $order->setOrderNo($item[0]);
        $order->setQuantity($item[1]);
        $order->setProductName($item[2]);
        $order->setProductTitle($item[3]);
        $order->setVehicleYear($vehicle ? $vehicle->getYear() : null);
        $order->setVehicleMake($vehicle ? $vehicle->getMake() : null);
        $order->setVehicleModel($vehicle ? $vehicle->getModel() : null);
        $order->setHighBeam($vehicle ? ($vehicle->getHighBeam() ?: $vehicle->getHighLowBeam()) : null);
        $order->setLowBeam($vehicle ? ($vehicle->getLowBeam() ?: $vehicle->getHighLowBeam()) : null);
        $order->setFogLight($vehicle ? $vehicle->getFogLight() : null);
        $order->setOrderNotes($item[5]);
        $order->setAdditionalDetails($item[6]);
        $order->setShippingName($item[7]);
        $order->setShippingAddress1($item[8]);
        $order->setAddress2($item[9]);
        $order->setShippingCity($item[10]);
        $order->setShippingZip($item[11]);
        $order->setShippingProvince($item[12]);
        $order->setShippingCountryCode($item[13]);
        $order->setShippingCountry($item[14]);
        $order->setShippingPhone($item[15]);
        $order->setShippingCompany($item[16]);
        $order->setOrderStatus(Order::ORDER_STATUS_ACTIVE);
        $order->setModifiedBy($extras->user);
        $order->setOrderDate($extras->orderDate);
        $order->setLastModification($extras->lastModificationDate);
        return $order;
    }

}
