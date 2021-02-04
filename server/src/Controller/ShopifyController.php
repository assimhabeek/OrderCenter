<?php


namespace App\Controller;

use App\Common\OrderParser;
use App\Entity\Order;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class ShopifyController extends BaseController
{

    private $shopifyConnector;

    private $orderController;

    private $orderParser;

    private $authController;

    public function __construct(ContainerInterface $container,
                                ShopifyConnector $shopifyConnector,
                                OrderController $orderController,
                                AuthController $authController,
                                OrderParser $orderParser)
    {
        parent::__construct($container);
        $this->shopifyConnector = $shopifyConnector;
        $this->orderController = $orderController;
        $this->authController = $authController;
        $this->orderParser = $orderParser;
    }


    public function index(Request $request, Response $response, array $args): Response
    {
        $allOrders = [];

        do {

            $params = $this->wrapParams($request);

            if (sizeof($allOrders) != 0) {
                $params['since_id'] = max($this->getShopifyId($allOrders));
            }

            $payload = $this->shopifyConnector->shopifyCall("/admin/orders.json", $params);

            $orders = json_decode($payload['response'], TRUE)['orders'];

            if (sizeof($orders) != 0) {
                $allOrders = array_merge($allOrders, $this->orderParser->parseOrders($orders));
            }


        } while (sizeof($orders) > 0);


        $duplications = $this->orderController->getDuplication(array_column($orders, 'orderNo'));

        return $this->responseToJson(
            $response,
            [
                'status' => true,
                'data' => $allOrders,
                'total' => sizeof($allOrders),
                'duplication' => $duplications
            ]
        );
    }

    public function import(Request $request, Response $response, array $args): Response
    {
        $orders = $request->getParsedBody();
        return $this->responseToJson($response, $this->doImport($request, $orders));
    }


    public function delete($shId)
    {
        $orders = $this->em->getRepository(Order::class)->findBy(['shopifyId' => $shId]);
        foreach ($orders as $order){
            $this->em->remove($order);
        }
        $this->em->flush();
    }

    public function deleteByLineId($lineId)
    {
        $orders = $this->em->getRepository(Order::class)->findBy(['itemLineId' => $lineId]);
        foreach ($orders as $order){
            $this->em->remove($order);
        }
        $this->em->flush();
    }


    public function doImport($request, $orders): array
    {
        $responsePayload = [];
        $user = $this->authController->getCurrentUser($request);

        try {

            $toUpdate = [];
            $toInsert = [];

            foreach ($orders as $order) {
                unset($order['vehicle']);
                unset($order['matchScore']);

                $order = $this->hydrator->hydrate(Order::class, $order);
                $order->setModifiedBy($user);
                $copies = $this->getLineCopies($order->getShopifyId(), $order->getItemLineId());
                if (sizeof($copies) > 0) $toUpdate = array_merge($toUpdate, $this->updateCopies($copies, $order));
                else array_push($toInsert, $order);
            }

            $this->em->getConnection()->beginTransaction(); // suspend auto-commit

            foreach ($toInsert as $o) {
                $this->em->persist($o);
            }

            foreach ($toUpdate as $o) {
                $this->em->merge($o);
            }

            $this->em->flush();
            $this->em->getConnection()->commit();

            $responsePayload = ["status" => true, "message" => "Imported successfully"];

        } catch (Exception $exception) {
            $this->em->getConnection()->rollBack();
            $responsePayload = ["status" => false, "message" => "Failed to read file"];
        }

        return $responsePayload;
    }

    public function importParsedOrders($request, $orders): array
    {
        $responsePayload = [];
        $user = $this->authController->getCurrentUser($request);

        try {

            $toUpdate = [];
            $toInsert = [];

            foreach ($orders as $order) {
                $order->setModifiedBy($user);
                $copies = $this->getLineCopies($order->getShopifyId(), $order->getItemLineId());
                if (sizeof($copies) > 0) $toUpdate = array_merge($toUpdate, $this->updateCopies($copies, $order));
                else array_push($toInsert, $order);
            }
            $this->em->getConnection()->beginTransaction(); // suspend auto-commit

            foreach ($toInsert as $o) {
                $this->em->persist($o);
            }

            foreach ($toUpdate as $o) {
                $this->em->merge($o);
            }

            $this->em->flush();
            $this->em->getConnection()->commit();

            $responsePayload = ["status" => true, "message" => "Imported successfully"];

        } catch (Exception $exception) {
            $this->em->getConnection()->rollBack();
            $responsePayload = ["status" => false, "message" => "Failed to read file"];
        }

        return $responsePayload;
    }

    private function wrapParams($request): array
    {
        return array_merge($request->getQueryParams(),
            [
                'limit' => 250,
                'status' => 'open',
                'fulfillment_status' => 'unfulfilled'
            ]
        );
    }

    function getShopifyId($orders)
    {
        return array_map(
            function (Order $order) {
                return $order->getShopifyId();
            },
            $orders
        );
    }

    function getLineCopies($shId, $lnId)
    {
        return $this->em->getRepository(Order::class)->findBy(['shopifyId' => $shId, 'itemLineId' => $lnId]);
    }

    function updateCopies($copies, $new)
    {
        foreach ($copies as $copy) {
            $copy->setOrderDate($new->getOrderDate());
            $copy->setLastModification($new->getLastModification());
            $copy->setOrderNo($new->getOrderNo());
            $copy->setQuantity($new->getQuantity());
            $copy->setProductName($new->getProductName());
            $copy->setProductTitle($new->getProductTitle());
            $copy->setVehicleYear($new->getVehicleYear());
            $copy->setVehicleMake($new->getVehicleMake());
            $copy->setVehicleModel($new->getVehicleModel());
            $copy->setHighBeam($new->getHighBeam());
            $copy->setLowBeam($new->getLowBeam());
            $copy->setFogLight($new->getFogLight());
            $copy->setOrderNotes($new->getOrderNotes());
            $copy->setAdditionalDetails($new->getAdditionalDetails());
            $copy->setShippingName($new->getShippingName());
            $copy->setShippingAddress1($new->getShippingAddress1());
            $copy->setAddress2($new->getAddress2());
            $copy->setShippingCity($new->getShippingCity());
            $copy->setShippingZip($new->getShippingZip());
            $copy->setShippingProvince($new->getShippingProvince());
            $copy->setShippingCountryCode($new->getShippingCountryCode());
            $copy->setShippingCountry($new->getShippingCountry());
            $copy->setShippingPhone($new->getShippingPhone());
            $copy->setShippingCompany($new->getShippingCompany());
            $copy->setOrderStatus($new->getOrderStatus());
            $copy->setModifiedBy($new->getModifiedBy());
        }
        return $copies;
    }

}
