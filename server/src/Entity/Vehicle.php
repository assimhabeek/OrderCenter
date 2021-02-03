<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Entity
 * @ORM\Table(name="vehicle")
 */
class Vehicle implements JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private  $id;

    /**
     * @var integer|null
     *
     * @ORM\Column(name="year", type="integer", nullable=true, options={"fixed"=true})
     */
    private $year;


    /**
     * @var string|null
     *
     * @ORM\Column(name="make", type="string", length=100, nullable=true, options={"fixed"=true})
     */
    private $make;


    /**
     * @var string|null
     *
     * @ORM\Column(name="model", type="string", length=100, nullable=true, options={"fixed"=true})
     */
    private $model;

    /**
     * @var string|null
     *
     * @ORM\Column(name="high_low_beam", type="string", length=100, nullable=true, options={"fixed"=true})
     */
    private $highLowBeam;

    /**
     * @var string|null
     *
     * @ORM\Column(name="high_beam", type="string", length=100, nullable=true, options={"fixed"=true})
     */
    private $highBeam;

    /**
     * @var string|null
     *
     * @ORM\Column(name="low_beam", type="string", length=100, nullable=true, options={"fixed"=true})
     */
    private $lowBeam;

    /**
     * @var string|null
     *
     * @ORM\Column(name="fog_light", type="string", length=100, nullable=true, options={"fixed"=true})
     */
    private $fogLight;


    /**
     * Get id.
     *
     * @return 
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
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set name.
     *
     * @param string|null $year
     *
     * @return Vehicle
     */
    public function setYear($year = null)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string|null
     */
    public function getMake()
    {
        return $this->make;
    }

    /**
     * Set make.
     *
     * @param string|null $make
     *
     * @return Vehicle
     */
    public function setMake($make = null)
    {
        $this->make = $make;

        return $this;
    }

    /**
     * Get Model
     *
     * @return string|null
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * Set model.
     *
     * @param string|null $model
     *
     * @return Vehicle
     */
    public function setModel($model = null)
    {
        $this->model = $model;

        return $this;
    }

    /**
     * Get High Low Beam
     *
     * @return string|null
     */
    public function getHighLowBeam()
    {
        return $this->highLowBeam;
    }

    /**
     * Set High Low Beam
     *
     * @param string|null $highLowBeam
     *
     * @return Vehicle
     */
    public function setHighLowBeam($highLowBeam = null)
    {
        $this->highLowBeam = $highLowBeam;

        return $this;
    }

    /**
     * Get High Beam
     *
     * @return string|null
     */
    public function getHighBeam()
    {
        return $this->highBeam;
    }

    /**
     * Set High Beam
     *
     * @param string|null $highBeam
     *
     * @return Vehicle
     */
    public function setHighBeam($highBeam)
    {
        $this->highBeam = $highBeam;

        return $this;
    }

    /**
     * Get Low Beam
     *
     * @return string|null
     */
    public function getLowBeam()
    {
        return $this->lowBeam;
    }

    /**
     * Set Low Beam
     *
     * @param string|null $lowBeam
     *
     * @return Vehicle
     */
    public function setLowBeam($lowBeam)
    {
        $this->lowBeam = $lowBeam;

        return $this;
    }

    /**
     * Get FogLight
     *
     * @return string|null
     */
    public function getFogLight()
    {
        return $this->fogLight;
    }

    /**
     * Set FogLight
     *
     * @param string|null $fogLight
     *
     * @return Vehicle
     */
    public function setFogLight($fogLight)
    {
        $this->fogLight = $fogLight;

        return $this;
    }


    public function jsonSerialize()
    {
        return [
            "id" => $this->id,
            "year" => $this->year,
            "make" => $this->make,
            "model" => $this->model,
            "lowBeam" => $this->lowBeam,
            "highBeam" => $this->highBeam,
            "highLowBeam" => $this->highLowBeam,
            "fogLight" => $this->fogLight
        ];
    }
}
