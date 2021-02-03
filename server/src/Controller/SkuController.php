<?php


namespace App\Controller;

use App\Entity\Sku;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteContext;

final class SkuController extends BaseController
{


    public function index(Request $request, Response $response, array $args = []): Response
    {
        $skus = $this->em->getRepository(Sku::class)->findAll();
        return $this->responseToJson($response, ['status' => true, 'data' => $skus]);
    }


    public function create(Request $request, Response $response, array $args = []): Response
    {
        $sku = $this->hydrator->hydrate(Sku::class, $request->getParsedBody());
        $this->em->persist($sku);
        $this->em->flush();
        return $this->responseToJson($response, $payload = ["status" => true, "message" => 'Row added successfully']);
    }

    public function update(Request $request, Response $response, array $args = []): Response
    {

        $updateInfo = $request->getParsedBody();
        $sql = "UPDATE " . Sku::class . " s SET s." . $updateInfo['name'] . " = :value where s.id = :id ";
        $query = $this->em->createQuery($sql);
        $query->setParameter('value', $updateInfo['value']);
        $query->setParameter('id', $updateInfo['id']);
        $query->getResult();
        $this->em->flush();
        return $this->responseToJson($response, ["status" => true, "message" => 'Row updated successfully']);
    }


    public function delete(Request $request, Response $response, array $args = []): Response
    {
        $skuId = RouteContext::fromRequest($request)->getRoute()->getArgument('id');
        $sku = $this->em->getRepository(Sku::class)->find($skuId);
        $this->em->remove($sku);
        $this->em->flush();
        return $this->responseToJson($response, ['status' => true, 'message' => 'Row Successfully deleted']);
    }


}
