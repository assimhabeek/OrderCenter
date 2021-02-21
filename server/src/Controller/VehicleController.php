<?php


namespace App\Controller;

use App\Entity\Order;
use App\Entity\ProductSku;
use App\Entity\Vehicle;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteContext;

final class VehicleController extends BaseController
{


    public function index(Request $request, Response $response, array $args = []): Response
    {
        $filters = $this->parseFilter($request->getQueryParams()["filter"]);

        $start = $request->getQueryParams()["start"] ?? 0;
        $end = $request->getQueryParams()["end"] ?? 0;

        $sortBy = $request->getQueryParams()["sortBy"] ?? null;
        $sortDirection = $request->getQueryParams()["sortDirection"] ?? 'DESC';

        $criteria = $this->createFilterCriteria($filters);

        if ($end > $start) {
            $criteria->setFirstResult($start)->setMaxResults($end - $start);
        }

        if ($sortBy != null) {
            $criteria->orderBy([$sortBy => $sortDirection]);
        }

        $matches = $this->em->getRepository(Vehicle::class)->matching($criteria);
        $count = $matches->count();
        $vehicles = $matches->toArray();
        return $this->responseToJson($response, ['status' => true, 'data' => $vehicles, "total" => $count]);
    }


    public function create(Request $request, Response $response, array $args = []): Response
    {
        $vehicle = $this->hydrator->hydrate(Vehicle::class, $request->getParsedBody());
        $this->em->persist($vehicle);
        $this->em->flush();

        $this->updateOrders($vehicle);

        return $this->responseToJson($response, $payload = ["status" => true, "message" => 'Row added successfully']);
    }

    public function update(Request $request, Response $response, array $args = []): Response
    {
        $updateInfo = $request->getParsedBody();
        $sql = "UPDATE " . Vehicle::class . " s SET s." . $updateInfo['name'] . " = :value where s.id = :id ";
        $query = $this->em->createQuery($sql);
        $query->setParameter('value', $updateInfo['value']);
        $query->setParameter('id', $updateInfo['id']);
        $query->getResult();
        $this->em->flush();

        $this->updateOrders($this->em->find(Vehicle::class, $updateInfo['id']));
        return $this->responseToJson($response, ["status" => true, "message" => 'Row updated successfully']);
    }


    public function delete(Request $request, Response $response, array $args = []): Response
    {
        $vehicleId = RouteContext::fromRequest($request)->getRoute()->getArgument('id');
        $vehicle = $this->em->getRepository(Vehicle::class)->find($vehicleId);
        $this->em->remove($vehicle);
        $this->em->flush();
        return $this->responseToJson($response, ['status' => true, 'message' => 'Row Successfully deleted']);
    }


    public function getYears(Request $request, Response $response, array $args = []): Response
    {
        $query = $this->em->createQuery("SELECT DISTINCT v.year FROM " . Vehicle::class . " v ORDER BY v.year");
        $years = array_column($query->getResult(), 'year');
        return $this->responseToJson($response, $years);
    }


    public function getMakesByYear(Request $request, Response $response, array $args = []): Response
    {
        $year = $request->getQueryParams()['year'];
        $query = $this->em->createQuery("SELECT DISTINCT v.make FROM " . Vehicle::class . " v WHERE v.year=:year ORDER BY v.make");
        $query->setParameter('year', $year);
        $makes = array_column($query->getResult(), 'make');
        return $this->responseToJson($response, $makes);
    }

    public function getModelsByYearAndMake(Request $request, Response $response, array $args = []): Response
    {

        $year = $request->getQueryParams()['year'];
        $make = $request->getQueryParams()['make'];

        $query = $this->em->createQuery("SELECT DISTINCT v.model FROM " . Vehicle::class . " v WHERE v.year=:year and v.make=:make ORDER BY v.model ");
        $query->setParameter('year', $year);
        $query->setParameter('make', $make);
        $models = array_column($query->getResult(), 'model');

        return $this->responseToJson($response, $models);
    }

    public function updateOrders(Vehicle $vehicle)
    {

        $lowBeam = $vehicle->getLowBeam() ?: $vehicle->getHighLowBeam();
        $highBeam = $vehicle->getHighBeam() ?: $vehicle->getHighLowBeam();
        $fogLight = $vehicle->getFogLight();

        $query = "UPDATE " . Order::class . " o
                    SET  o.highBeam=:high_beam, 
                         o.lowBeam=:low_beam,  
                         o.fogLight=:fog_light 
                    WHERE o.vehicleYear =:year 
                      AND o.vehicleModel =:model 
                      AND o.vehicleMake =:make 
                      AND o.id not in ( SELECT p.id FROM " . ProductSku::class . " p 
                                       WHERE (p.bulbType is not null)
                                          or (p.bulbTypeFogLight is not null)
                                          or (p.highBeam is not null)
                                          or (p.lowBeam is not null)
                                          or (p.fogLight is not null)
                                          or (p.hbCanBus is not null)
                                          or (p.lbCanBus is not null))";

        $stmt = $this->em->createQuery($query);
        $stmt->setParameter('high_beam', $highBeam);
        $stmt->setParameter('low_beam', $lowBeam);
        $stmt->setParameter('fog_light', $fogLight);
        $stmt->setParameter('year', $vehicle->getYear());
        $stmt->setParameter('model', $vehicle->getModel());
        $stmt->setParameter('make', $vehicle->getMake());
        $stmt->getResult();
        $this->em->flush();
    }

}
