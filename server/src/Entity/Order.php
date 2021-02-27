<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Entity
 * @ORM\Table(name="orders")
 */
class Order implements JsonSerializable
{

    public const ORDER_STATUS_ACTIVE = 1;
    public const ORDER_STATUS_QUEUED = 2;
    public const ORDER_STATUS_ARCHIVED = 3;


    public const NON_CARIFEX_TYPE_COLUMNS = [
        "bulbType",
        "bulbTypeFogLight"
    ];

    public const CARIFEX_TYPE_COLUMNS = [
        "highBeam",
        "lowBeam",
        "fogLight",
        "hbCanBus",
        "lbCanBus",
    ];

    public const NON_CARIFEX_MAP = [
        "Order No" => "orderNo",
        "Qty" => "quantity",
        "ProductTitle" => "productTitle",
        "Bulb Type" => "bulbType",
        "Bulb Type Fog Light" => "bulbTypeFogLight",
        "Tracking" => null,
        "Vehicle Year/Make/Model" => "additionalDetails",
        "Order Notes" => "orderNotes",
        "Shipping Name" => "shippingName",
        "Shipping Address1" => "shippingAddress1",
        "Shipping Address2" => "address2",
        "Shipping City" => "shippingCity",
        "Shipping Zip" => "shippingZip",
        "Shipping Province" => "shippingProvince",
        "Shipping Country Code" => "shippingCountryCode",
        "Shiping Country" => "shippingCountry",
        "Shipping Phone" => "shippingPhone",
        "Shipping Company" => "shippingCompany"
    ];

    public const CARIFEX_FILE_MAP = [
        "ReferenceNumber" => "orderNo",
        "PurchaseOrderNumber" => "",
        "ShipCarrier" => "",
        "ShipService" => "",
        "ShipBilling" => "ShipBilling",

        "ShipAccount" => "ShipBilling",
        "ShipDate" => "",
        "CancelDate" => "",
        "Notes" => "",
        "ShipToName" => "shippingName",

        "ShipToCompany" => "shippingCompany",
        "ShipToAddress1" => "shippingAddress1",
        "ShipToAddress2" => "address2",
        "ShipToCity" => "shippingCity",
        "ShipToState" => "shippingProvince",

        "ShipToZip" => "shippingZip",
        "ShipToCountry" => "shippingCountry",
        "ShipToPhone" => "shippingPhone",
        "ShipToFax" => "",
        "ShipToEmail" => "",

        "ShipToCustomerID" => "",
        "ShipToDeptNumber" => "",
        "RetailerID" => "",
        "SKU" => "",
        "Quantity" => "quantity",

        "UseCOD" => "",
        "UseInsurance" => "",
        "Saved Elements" => "",
        "Order Item Saved Elements" => "productTitle",
        "Carrier Notes" => ""
    ];


    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="order_no", type="string",  nullable=true, options={"fixed"=true})
     */
    private $orderNo;


    /**
     * @var integer|null
     *
     * @ORM\Column(name="quantity", type="integer", nullable=true, options={"fixed"=true})
     */
    private $quantity;


    /**
     * @var string|null
     *
     * @ORM\Column(name="product_name", type="string", length=400, nullable=true, options={"fixed"=true})
     */
    private $productName;

    /**
     * @var string|null
     *
     * @ORM\Column(name="product_title", type="string", length=400, nullable=true, options={"fixed"=true})
     */
    private $productTitle;


    /**
     * @var string|null
     *
     * @ORM\Column(name="bulb_type", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private $bulbType;


    /**
     * @var string|null
     *
     * @ORM\Column(name="bulb_type_fog_light", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private $bulbTypeFogLight;


    /**
     * @var string|null
     *
     * @ORM\Column(name="high_beam", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private $highBeam;


    /**
     * @var string|null
     *
     * @ORM\Column(name="low_beam", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private $lowBeam;


    /**
     * @var string|null
     *
     * @ORM\Column(name="fog_light", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private $fogLight;

    /**
     * @var string|null
     *
     * @ORM\Column(name="hb_can_bus", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private $hbCanBus;


    /**
     * @var string|null
     *
     * @ORM\Column(name="lb_can_bus", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private $lbCanBus;


    /**
     * @var integer|null
     *
     * @ORM\Column(name="vehicle_year", type="integer" , nullable=true, options={"fixed"=true})
     */
    private $vehicleYear;


    /**
     * @var string|null
     *
     * @ORM\Column(name="order_notes", type="string", length=200, nullable=true, options={"fixed"=true})
     */
    private $orderNotes;


    /**
     * @var string|null
     *
     * @ORM\Column(name="additional_details", type="string", length=400, nullable=true, options={"fixed"=true})
     */
    private $additionalDetails;


    /**
     * @var string|null
     *
     * @ORM\Column(name="shipping_name", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $shippingName;


    /**
     * @var string|null
     *
     * @ORM\Column(name="shipping_address1", type="string", length=200, nullable=true, options={"fixed"=true})
     */
    private $shippingAddress1;


    /**
     * @var string|null
     *
     * @ORM\Column(name="address2", type="string", length=200, nullable=true, options={"fixed"=true})
     */
    private $address2;


    /**
     * @var string|null
     *
     * @ORM\Column(name="shipping_city", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $shippingCity;

    /**
     * @var string|null
     *
     * @ORM\Column(name="shipping_zip", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $shippingZip;

    /**
     * @var string|null
     *
     * @ORM\Column(name="shipping_province", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $shippingProvince;

    /**
     * @var string|null
     *
     * @ORM\Column(name="shipping_country_code", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $shippingCountryCode;

    /**
     * @var string|null
     *
     * @ORM\Column(name="shipping_country", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $shippingCountry;


    /**
     * @var string|null
     *
     * @ORM\Column(name="shipping_phone", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $shippingPhone;


    /**
     * @var string|null
     *
     * @ORM\Column(name="shipping_company", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $shippingCompany;


    /**
     * @var string|null
     *
     * @ORM\Column(name="last_modification", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $lastModification;


    /**
     * @var string|null
     *
     * @ORM\Column(name="order_date", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $orderDate;


    /**
     * @ORM\ManyToOne(targetEntity="User", fetch="EAGER")
     * @ORM\JoinColumn(name="modified_by", referencedColumnName="id")
     */
    private $modifiedBy;


    /**
     * @var integer|null
     *
     * @ORM\Column(name="item_line_id", type="integer", nullable=true, options={"fixed"=true})
     */
    private $itemLineId;


    /**
     * @var integer|null
     *
     * @ORM\Column(name="shopify_id", type="integer", nullable=true, options={"fixed"=true})
     */
    private $shopifyId;


    /**
     * @var integer
     *
     * @ORM\Column(name="order_status", type="integer", nullable=false, options={"fixed"=true})
     */
    private $orderStatus;


    /**
     * @ORM\ManyToOne(targetEntity="ExportHistory", fetch="EAGER")
     * @ORM\JoinColumn(name="export_file", referencedColumnName="id")
     */
    private $exportFile;


    /**
     * @var string|null
     *
     * @ORM\Column(name="vehicle_make", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $vehicleMake;


    /**
     * @var string|null
     *
     * @ORM\Column(name="vehicle_model", type="string", length=60, nullable=true, options={"fixed"=true})
     */
    private $vehicleModel;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }


    /**
     * @return string|null
     */
    public function getProductName()
    {
        return $this->productName;
    }

    /**
     * @param string|null $productName
     * @return Order
     */
    public function setProductName($productName)
    {
        $this->productName = $productName;
        return $this;
    }


    /**
     * @return string|null
     */
    public function getProductTitle()
    {
        return $this->productTitle;
    }

    /**
     * @param string|null $productTitle
     * @return Order
     */
    public function setProductTitle($productTitle)
    {
        $this->productTitle = $productTitle;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getBulbType()
    {
        return $this->bulbType;
    }

    /**
     * @param string|null $bulbType
     * @return Order
     */
    public function setBulbType($bulbType)
    {
        $this->bulbType = trim($bulbType) === '' ? null : $bulbType;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getModifiedBy()
    {
        return $this->modifiedBy;
    }

    /**
     * @param mixed $modifiedBy
     */
    public function setModifiedBy($modifiedBy)
    {
        $this->modifiedBy = $modifiedBy;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getOrderNo()
    {
        return $this->orderNo;
    }

    /**
     * @param string|null $orderNo
     */
    public function setOrderNo($orderNo)
    {
        $this->orderNo = $orderNo;
        return $this;

    }

    /**
     * @return int|null
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * @param int|null $quantity
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;

        return $this;

    }

    /**
     * @return string|null
     */
    public function getBulbTypeFogLight()
    {
        return $this->bulbTypeFogLight;
    }

    /**
     * @param string|null $bulbTypeFogLight
     */
    public function setBulbTypeFogLight($bulbTypeFogLight)
    {
        $this->bulbTypeFogLight = trim($bulbTypeFogLight) === '' ? null : $bulbTypeFogLight;;

        return $this;

    }

    /**
     * @return string|null
     */
    public function getHighBeam()
    {
        return $this->highBeam;
    }

    /**
     * @param string|null $highBeam
     */
    public function setHighBeam($highBeam)
    {
        $this->highBeam = $highBeam;

        return $this;

    }

    /**
     * @return string|null
     */
    public function getLowBeam()
    {
        return $this->lowBeam;
    }

    /**
     * @param string|null $lowBeam
     */
    public function setLowBeam($lowBeam)
    {
        $this->lowBeam = trim($lowBeam) === '' ? null : $lowBeam;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getFogLight()
    {
        return $this->fogLight;
    }

    /**
     * @param string|null $fogLight
     */
    public function setFogLight($fogLight)
    {
        $this->fogLight = trim($fogLight) === '' ? null : $fogLight;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getHbCanBus()
    {
        return $this->hbCanBus;
    }

    /**
     * @param string|null $hbCanBus
     */
    public function setHbCanBus($hbCanBus)
    {
        $this->hbCanBus = trim($hbCanBus) === '' ? null : $hbCanBus;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getLbCanBus()
    {
        return $this->lbCanBus;
    }

    /**
     * @param string|null $lbCanBus
     */
    public function setLbCanBus($lbCanBus)
    {
        $this->lbCanBus = trim($lbCanBus) === '' ? null : $lbCanBus;
        return $this;

    }

    /**
     * @return int|null
     */
    public function getVehicleYear()
    {
        return $this->vehicleYear;
    }

    /**
     * @param int|null $vehicleYear
     */
    public function setVehicleYear($vehicleYear)
    {
        $this->vehicleYear = $vehicleYear;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getOrderNotes()
    {
        return $this->orderNotes;
    }

    /**
     * @param string|null $orderNotes
     */
    public function setOrderNotes($orderNotes)
    {
        $this->orderNotes = $orderNotes;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getAdditionalDetails()
    {
        return $this->additionalDetails;
    }

    /**
     * @param string|null $additionalDetails
     */
    public function setAdditionalDetails($additionalDetails)
    {
        $this->additionalDetails = $additionalDetails;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getShippingName()
    {
        return $this->shippingName;
    }

    /**
     * @param string|null $shippingName
     */
    public function setShippingName($shippingName)
    {
        $this->shippingName = $shippingName;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getShippingAddress1()
    {
        return $this->shippingAddress1;
    }

    /**
     * @param string|null $shippingAddress1
     */
    public function setShippingAddress1($shippingAddress1)
    {
        $this->shippingAddress1 = $shippingAddress1;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getAddress2()
    {
        return $this->address2;
    }

    /**
     * @param string|null $address2
     */
    public function setAddress2($address2)
    {
        $this->address2 = $address2;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getShippingCity()
    {
        return $this->shippingCity;
    }

    /**
     * @param string|null $shippingCity
     */
    public function setShippingCity($shippingCity)
    {
        $this->shippingCity = $shippingCity;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getShippingZip()
    {
        return $this->shippingZip;
    }

    /**
     * @param string|null $shippingZip
     */
    public function setShippingZip($shippingZip)
    {
        $this->shippingZip = $shippingZip;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getShippingProvince()
    {
        return $this->shippingProvince;
    }

    /**
     * @param string|null $shippingProvince
     */
    public function setShippingProvince($shippingProvince)
    {
        $this->shippingProvince = $shippingProvince;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getShippingCountryCode()
    {
        return $this->shippingCountryCode;
    }

    /**
     * @param string|null $shippingCountryCode
     */
    public function setShippingCountryCode($shippingCountryCode)
    {
        $this->shippingCountryCode = $shippingCountryCode;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getShippingCountry()
    {
        return $this->shippingCountry;
    }

    /**
     * @param string|null $shippingCountry
     */
    public function setShippingCountry($shippingCountry)
    {
        $this->shippingCountry = $shippingCountry;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getShippingPhone()
    {
        return $this->shippingPhone;
    }

    /**
     * @param string|null $shippingPhone
     */
    public function setShippingPhone($shippingPhone)
    {
        $this->shippingPhone = $shippingPhone;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getShippingCompany()
    {
        return $this->shippingCompany;
    }

    /**
     * @param string|null $shippingCompany
     */
    public function setShippingCompany($shippingCompany)
    {
        $this->shippingCompany = $shippingCompany;

        return $this;

    }

    /**
     * @return string|null
     */
    public function getLastModification()
    {
        return $this->lastModification;
    }

    /**
     * @param string|null $lastModification
     */
    public function setLastModification($lastModification)
    {
        $this->lastModification = $lastModification;
        return $this;

    }

    /**
     * @return int|null
     */
    public function getItemLineId()
    {
        return $this->itemLineId;
    }

    /**
     * @param int|null $itemLineId
     */
    public function setItemLineId($itemLineId)
    {
        $this->itemLineId = $itemLineId;
        return $this;

    }

    /**
     * @return int|null
     */
    public function getShopifyId()
    {
        return $this->shopifyId;
    }

    /**
     * @param int|null $shopifyId
     */
    public function setShopifyId($shopifyId)
    {
        $this->shopifyId = $shopifyId;
        return $this;

    }

    /**
     * @return int
     */
    public function getOrderStatus()
    {
        return $this->orderStatus;
    }

    /**
     * @param int $orderStatus
     */
    public function setOrderStatus($orderStatus)
    {
        $this->orderStatus = $orderStatus;
        return $this;

    }

    /**
     * @return mixed
     */
    public function getExportFile()
    {
        return $this->exportFile;
    }

    /**
     * @param mixed $exportFile
     */
    public function setExportFile($exportFile)
    {
        $this->exportFile = $exportFile;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getVehicleMake()
    {
        return $this->vehicleMake;
    }

    /**
     * @param string|null $vehicleMake
     */
    public function setVehicleMake($vehicleMake)
    {
        $this->vehicleMake = $vehicleMake;
        return $this;

    }

    /**
     * @return string|null
     */
    public function getVehicleModel()
    {
        return $this->vehicleModel;
    }

    /**
     * @param string|null $vehicleModel
     */
    public function setVehicleModel($vehicleModel)
    {
        $this->vehicleModel = $vehicleModel;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getOrderDate()
    {
        return $this->orderDate;
    }

    /**
     * @param string|null $orderDate
     */
    public function setOrderDate($orderDate)
    {
        $this->orderDate = $orderDate;

        return $this;
    }


    public function jsonSerialize(): array
    {
        return [
            "id" => $this->id,
            "orderNo" => $this->orderNo,
            "quantity" => $this->quantity,
            "productName" => $this->productName,
            "productTitle" => $this->productTitle,
            "bulbType" => $this->bulbType,
            "bulbTypeFogLight" => $this->bulbTypeFogLight,
            "highBeam" => $this->highBeam,
            "lowBeam" => $this->lowBeam,
            "fogLight" => $this->fogLight,
            "hbCanBus" => $this->hbCanBus,
            "lbCanBus" => $this->lbCanBus,
            "vehicleYear" => $this->vehicleYear,
            "orderNotes" => $this->orderNotes,
            "additionalDetails" => $this->additionalDetails,
            "shippingName" => $this->shippingName,
            "shippingAddress1" => $this->shippingAddress1,
            "address2" => $this->address2,
            "shippingCity" => $this->shippingCity,
            "shippingZip" => $this->shippingZip,
            "shippingProvince" => $this->shippingProvince,
            "shippingCountryCode" => $this->shippingCountryCode,
            "shippingCountry" => $this->shippingCountry,
            "shippingPhone" => $this->shippingPhone,
            "shippingCompany" => $this->shippingCompany,
            "lastModification" => $this->lastModification,
            "orderDate" => $this->orderDate,
            "modifiedBy" => $this->modifiedBy ? $this->modifiedBy->getName() : "",
            "itemLineId" => $this->itemLineId,
            "shopifyId" => $this->shopifyId,
            "orderStatus" => $this->orderStatus,
            "exportFile" => $this->exportFile,
            "vehicleMake" => $this->vehicleMake,
            "vehicleModel" => $this->vehicleModel,
            'vehicle' => $this->vehicle ?? '',
            'matchScore' => $this->matchScore ?? ''
        ];
    }


}
