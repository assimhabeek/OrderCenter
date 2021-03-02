<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Entity
 * @ORM\Table(name="product_sku")
 */
class ProductSku implements JsonSerializable
{

    /**
     * @ORM\Id
     * @ORM\Column(type="bigint", nullable=false, unique=true, name="id")
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;


    /**
     * @var string|null
     *
     * @ORM\Column(name="product_id", type="string", length=400, nullable=true, options={"fixed"=true})
     */
    private $productId;

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
     * Get id.
     *
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }


    /**
     * set id.
     *
     */
    public function setId($id)
    {

       $this->id = $id;

       return $this;
    }


    /**
     * @return string|null
     */
    public function getProductId()
    {
        return $this->productId;
    }

    /**
     * @param string|null $productId
     * @return Order
     */
    public function setProductId($productId)
    {
        $this->productId = $productId;

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
        $this->bulbType = $bulbType;
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
        $this->bulbTypeFogLight = $bulbTypeFogLight;

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
        $this->lowBeam = $lowBeam;
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
        $this->fogLight = $fogLight;
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
        $this->hbCanBus = $hbCanBus;
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
        $this->lbCanBus = $lbCanBus;
        return $this;

    }


    public function jsonSerialize(): array
    {
        return [
            "id" => $this->id,
            "productId" => $this->productId,
            "productTitle" => $this->productTitle,
            "bulbType" => $this->bulbType,
            "bulbTypeFogLight" => $this->bulbTypeFogLight,
            "highBeam" => $this->highBeam,
            "lowBeam" => $this->lowBeam,
            "fogLight" => $this->fogLight,
            "hbCanBus" => $this->hbCanBus,
            "lbCanBus" => $this->lbCanBus,
        ];
    }

}
