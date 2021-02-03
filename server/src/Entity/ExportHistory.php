<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;

/**
 * @ORM\Entity
 * @ORM\Table(name="export_history")
 */
class ExportHistory implements JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(name="start_date", type="string",  nullable=true, options={"fixed"=true})
     */
    private $startDate;


    /**
     * @var string|null
     *
     * @ORM\Column(name="end_date", type="string", length=40, nullable=true, options={"fixed"=true})
     */
    private $endDate;


    /**
     * @var string|null
     *
     * @ORM\Column(name="file_name", type="string", length=100, nullable=true, options={"fixed"=true})
     */
    private $fileName;

    /**
     * @var string|null
     *
     * @ORM\Column(name="file_url", type="string", length=800, nullable=true, options={"fixed"=true})
     */
    private $fileUrl;


    /**
     * @var string|null
     *
     * @ORM\Column(name="type", type="string", length=100, nullable=true, options={"fixed"=true})
     */
    private $type;


    /**
     * @ORM\ManyToOne(targetEntity="User", fetch="EAGER")
     * @ORM\JoinColumn(name="exported_by", referencedColumnName="id")
     */
    private $exportedBy;


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
     * Get name.
     *
     * @return string|null
     */
    public function getStartDate()
    {
        return $this->startDate;
    }

    /**
     * Set name.
     *
     * @param string|null $startDate
     *
     * @return ExportHistory
     */
    public function setStartDate($startDate = null): ExportHistory
    {
        $this->startDate = $startDate;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string|null
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * Set sku type.
     *
     * @param string|null $endDate
     *
     * @return ExportHistory
     */
    public function setEndDate($endDate = null): ExportHistory
    {
        $this->endDate = $endDate;

        return $this;
    }


    /**
     * @return string|null
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * @param string|null $fileName
     * @return ExportHistory
     */
    public function setFileName($fileName): ExportHistory
    {
        $this->fileName = $fileName;
        return $this;
    }


    /**
     * @return string|null
     */
    public function getFileUrl()
    {
        return $this->fileUrl;
    }

    /**
     * @param string|null $fileUrl
     * @return ExportHistory
     */
    public function setFileUrl($fileUrl): ExportHistory
    {
        $this->fileUrl = $fileUrl;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string|null $type
     * @return ExportHistory
     */
    public function setType($type): ExportHistory
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getExportedBy()
    {
        return $this->exportedBy;
    }

    /**
     * @param mixed $exportedBy
     */
    public function setExportedBy($exportedBy): ExportHistory
    {
        $this->exportedBy = $exportedBy;
        return $this;
    }


    public function jsonSerialize(): array
    {
        return [
            "id" => $this->id,
            "startDate" => $this->startDate,
            "endDate" => $this->endDate,
            "fileUrl" => $this->fileUrl,
            "fileName" => $this->fileName,
            "type" => $this->type,
            "exportedBy" => $this->exportedBy->getName()
        ];
    }

}
