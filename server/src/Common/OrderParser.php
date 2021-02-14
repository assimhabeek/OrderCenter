<?php


namespace App\Common;

use App\Common\VehicleMatch\VehicleMatcher;
use App\Controller\ProductSkuController;
use App\Entity\Order;
use Datetime;
use DateTimeZone;

class OrderParser
{
    private $vehicleMatcher;

    private $productSkuController;

    public function __construct(VehicleMatcher $vehicleMatcher,
                                ProductSkuController $productSkuController)
    {
        $this->vehicleMatcher = $vehicleMatcher;
        $this->productSkuController = $productSkuController;
    }


    public function parseOrders($orders)
    {
        $newOrders = [];
        foreach ($orders as $order) $newOrders =
            array_merge($newOrders, $this->parseOrderLines($order));
        return $newOrders;
    }

    public function parseOrderLines($order): array
    {
        $newOrders = [];

        foreach ($order["line_items"] as $ln) {

            if ($this->notRemoved($ln['id'], $order)) {


                $o = new Order();

                $vehicleInputText = sizeof($ln['properties']) > 0 ? $ln['properties'][0]['value'] : null;
                $modelMatcher = $this->vehicleMatcher->matchVehicle($vehicleInputText);
                $vehicle = $modelMatcher ? $modelMatcher->getBestMatchedVehicle() : null;
                $score = $modelMatcher ? $modelMatcher->getBestScore() : null;
                $productSkus = $this->productSkuController->getProductSkusById($ln['product_id']);

                $o->setShopifyId($order['id']);
                $o->setItemLineId($ln['id']);
                $o->setOrderDate($this->shopifyParseDate($order['created_at']));
                $o->setLastModification($this->shopifyParseDate($order['updated_at']));
                $o->setOrderNo($order['name']);
                $o->setQuantity($ln['quantity']);
                $o->setProductName($ln['name']);
                $o->setProductTitle($ln['variant_title']);
                $o->setVehicleYear($vehicle ? $vehicle->getYear() : null);
                $o->setVehicleMake($vehicle ? $vehicle->getMake() : null);
                $o->setVehicleModel($vehicle ? $vehicle->getModel() : null);
                $o->vehicle = $vehicleInputText;
                $o->matchScore = $score;

                $o->setHighBeam($vehicle ? ($vehicle->getHighBeam() ?: $vehicle->getHighLowBeam()) : null);
                $o->setLowBeam($vehicle ? ($vehicle->getLowBeam() ?: $vehicle->getHighLowBeam()) : null);
                $o->setFogLight($vehicle ? $vehicle->getFogLight() : null);

                $o->setOrderNotes($order['note']);
                $o->setAdditionalDetails(sizeof($order['note_attributes']) > 0 ? $order['note_attributes'][0]['value'] : '');

                if (isset($order['shipping_address'])) {
                    $o->setShippingName($order['shipping_address']['first_name'] . " " . $order['shipping_address']['last_name']);
                    $o->setShippingAddress1($order['shipping_address']['address1']);
                    $o->setAddress2($order['shipping_address']['address2']);
                    $o->setShippingCity($order['shipping_address']['city']);
                    $o->setShippingZip($order['shipping_address']['zip']);
                    $o->setShippingProvince($order['shipping_address']['province']);
                    $o->setShippingCountryCode($order['shipping_address']['country_code']);
                    $o->setShippingCountry($order['shipping_address']['country']);
                    $o->setShippingPhone($order['shipping_address']['phone']);
                    $o->setShippingCompany($order['shipping_address']['company']);
                }

                $o->setOrderStatus($this->getOrderStatus($order, $ln));

                if ($productSkus != null) {
                    $o->setBulbType($this->getIfNotEmpty($productSkus->getBulbType(), $o->getBulbType()));
                    $o->setBulbTypeFogLight($this->getIfNotEmpty($productSkus->getBulbTypeFogLight(), $o->getBulbTypeFogLight()));
                    $o->setHighBeam($this->getIfNotEmpty($productSkus->getHighBeam(), $o->getHighBeam()));
                    $o->setLowBeam($this->getIfNotEmpty($productSkus->getLowBeam(), $o->getLowBeam()));
                    $o->setFogLight($this->getIfNotEmpty($productSkus->getFogLight(), $o->getFogLight()));
                    $o->setHbCanBus($this->getIfNotEmpty($productSkus->getHbCanBus(), $o->getHbCanBus()));
                    $o->setLbCanBus($this->getIfNotEmpty($productSkus->getLbCanBus(), $o->getLbCanBus()));
                }

                array_push($newOrders, $o);
            }

        }
        return $newOrders;
    }

    function getIfNotEmpty($new, $original)
    {
        return $new !== null || $new !== '' ? $new : $original;
    }

    function getOrderStatus($order, $ln)
    {

        $archiveStatus = ['fulfilled', 'canceled'];
        return in_array($order['fulfillment_status'], $archiveStatus) || in_array($ln['fulfillment_status'], $archiveStatus) ?
            Order::ORDER_STATUS_ARCHIVED : Order::ORDER_STATUS_ACTIVE;
    }

    function shopifyParseDate($dateStr)
    {
        $date = new DateTime($dateStr, new DateTimeZone('America/Chicago'));
        return $date->format('Y-m-d  H:i:s');
    }

    function notRemoved($itemID, $order)
    {
        $refunds = [];
        foreach ($order['refunds'] as $refund) {
            $refunds = array_merge($refunds, array_column($refund['refund_line_items'], 'line_item_id'));
        }
        return sizeof($refunds) === 0 || !in_array($itemID, $refunds);
    }

}
