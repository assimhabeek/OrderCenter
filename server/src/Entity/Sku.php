<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Entity
 * @ORM\Table(name="sku")
 */
class Sku implements JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private  $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="name", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private  $name;


    /**
     * @var string|null
     *
     * @ORM\Column(name="sku_type", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private  $skuType;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get name.
     *
     * @return string|null
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set name.
     *
     * @param string|null $name
     *
     * @return ExportHistory
     */
    public function setName($name = null)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string|null
     */
    public function getSkuType()
    {
        return $this->skuType;
    }

    /**
     * Set sku type.
     *
     * @param string|null $skuType
     *
     * @return ExportHistory
     */
    public function setSkuType($skuType = null)
    {
        $this->skuType = $skuType;

        return $this;
    }

    public function jsonSerialize()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "skuType" => $this->skuType
        ];
    }
}
