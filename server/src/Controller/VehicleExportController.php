<?php


namespace App\Controller;

use App\Entity\Vehicle;
use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;
use Box\Spout\Writer\Common\Creator\Style\StyleBuilder;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Expr\CompositeExpression;
use Doctrine\Common\Collections\Expr\Expression;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Psr7\Stream;

final class VehicleExportController extends BaseController
{


    public function __construct(ContainerInterface $container)
    {
        parent::__construct($container);
    }


    public function export(Request $request, Response $response): Response
    {

        $filters = $this->parseFilter($request->getQueryParams()["filter"]);


        $criteria = $this->createFilterCriteria($filters);

        $fileName = 'listing.xlsx';
        $exportedPath = $this->setting['exportPath'] . $fileName;

        if (file_exists($exportedPath)) {
            unlink($exportedPath);
        }

        $vehicles = sizeof($filters) > 0 ? $this->em->getRepository(Vehicle::class)->matching($criteria)->toArray() : [];

        $writer = $this->createWriterFromTemplate($exportedPath, $fileName);

        foreach ($vehicles as $vehicle)
            $writer->addRow($this->createRowFromVehicle($vehicle, $this->getPartNumber($filters)));

        $writer->close();

        return $this->downloadFile($response, $exportedPath, $fileName);
    }

    protected function createFilterCriteria(array $filters = []): Criteria
    {
        $innerExp = [];
        foreach ($filters as $filter) array_push($innerExp, $this->searchExpression($filter));

        $expression = [new CompositeExpression(CompositeExpression::TYPE_AND, $innerExp)];

        $filter = new \stdClass();
        $filter->name = 'highLowBeam';
        $filter->value = $filters[0]->value;
        if (sizeof($filters) === 2 and $filters[0]->value == $filters[1]->value) array_push($expression, $this->searchExpression($filter));

        return new Criteria(new CompositeExpression(CompositeExpression::TYPE_OR, $expression));
    }

    protected function searchExpression($filter): Expression
    {
        return Criteria::expr()->eq($filter->name, $filter->value);
    }


    public function downloadFile($response, string $filePath, string $fileName): Response
    {
        if ($filePath == null || !file_exists($filePath)) {
            return $this->responseToJson($response, ["status" => false, "message" => "File Not Found"])->withStatus(404);
        }

        $openedFile = fopen($filePath, 'rb');
        $stream = new Stream($openedFile);

        return $response->withBody($stream)
            ->withHeader('Content-Disposition', 'attachment;')
            ->withHeader('Content-Type', mime_content_type($filePath))
            ->withHeader('Content-Length', filesize($filePath))
            ->withHeader('Access-Control-Expose-Headers', 'X-File-Name')
            ->withHeader('X-File-Name', $fileName);
    }


    private function createWriterFromTemplate($exportedPath, $fileName)
    {
        $templatePath = $this->setting['listingTemplatePath'];
        $reader = ReaderEntityFactory::createReaderFromFile($templatePath);
        $reader->open($templatePath);
        $reader->setShouldFormatDates(true);

        $writer = WriterEntityFactory::createWriterFromFile($exportedPath);
        $writer->openToFile($exportedPath);

        foreach ($reader->getSheetIterator() as $sheetIndex => $sheet) {
            if ($sheetIndex !== 1) $writer->addNewSheetAndMakeItCurrent();
            foreach ($sheet->getRowIterator() as $rowIndex => $row) {
                if ($rowIndex === 2) {
                    $row->setStyle((new StyleBuilder())->setFontBold()->build());
                }
                $writer->addRow($row);
            };
        }
        $reader->close();


        return $writer;
    }

    private function createRowFromVehicle(Vehicle $vehicle, $partNumber)
    {
        $data = [
            $partNumber,
            'Fuel Pump',
            $vehicle->getMake(),
            $vehicle->getModel(),
            $vehicle->getYear(),
            $vehicle->getYear()
        ];
        return WriterEntityFactory::createRowFromArray($data);
    }

    private function getPartNumber($filter)
    {
        return join('/', str_replace('CAR_HL_', '', array_column($filter, 'value')));
    }
}
