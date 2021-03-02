<?php


namespace App\Controller;

use App\Entity\ProductSku;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class ProductSkuController extends BaseController
{


    public function index(Request $request, Response $response, array $args = []): Response
    {
        $productSkus = $this->em->getRepository(ProductSku::class)->findAll();
        return $this->responseToJson($response, ['status' => true, 'data' => $productSkus]);
    }


    public function update(Request $request, Response $response, array $args = []): Response
    {

        $updateInfo = $request->getParsedBody();
        $sql = "UPDATE " . ProductSku::class . " s SET s." . $updateInfo['name'] . " = :value where s.id = :id ";
        $query = $this->em->createQuery($sql);
        $query->setParameter('value', $updateInfo['value']);
        $query->setParameter('id', $updateInfo['id']);
        $query->getResult();
        $this->em->flush();
        return $this->responseToJson($response, ["status" => true, "message" => 'Row updated successfully']);
    }


    public function getProductSkusById($id)
    {
        return $this->em->find(ProductSku::class, $id);
    }

}
