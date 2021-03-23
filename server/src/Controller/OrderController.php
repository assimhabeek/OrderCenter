<?php


namespace App\Controller;

use App\Common\OrderCompletion;
use App\Common\Utils;
use App\Entity\Order;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Expr\CompositeExpression;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteContext;

final class OrderController extends BaseController
{
    private $authController;
    private $orderCompletion;


    public function __construct(ContainerInterface $container,
                                AuthController $authController,
                                OrderCompletion $orderCompletion)
    {
        parent::__construct($container);
        $this->authController = $authController;
        $this->orderCompletion = $orderCompletion;
    }


    public function index(Request $request, Response $response): Response
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


        $matches = $this->em->getRepository(Order::class)->matching($criteria);
        $count = $matches->count();
        $orders = $matches->toArray();
        return $this->responseToJson($response, ['status' => true, 'data' => $orders, "total" => $count]);
    }


    public function create(Request $request, Response $response): Response
    {
        $order = $this->hydrator->hydrate(Order::class, $request->getParsedBody());


        $order->setOrderDate(Utils::getCurrentDateTime());
        $order->setLastModification(Utils::getCurrentDateTime());
        $order->setOrderStatus(Order::ORDER_STATUS_ACTIVE);
        $order->setModifiedBy($this->authController->getCurrentUser($request));

        $this->em->persist($order);
        $this->em->flush();
        return $this->responseToJson($response, $payload = ["status" => true, "message" => 'Row added successfully']);
    }

    public function update(Request $request, Response $response): Response
    {
        $updateInfo = $request->getParsedBody();

        $sql = $updateInfo['name'] === 'orderStatus' ?
            "UPDATE " . Order::class . " s SET s.modifiedBy = :userId , s." . $updateInfo['name'] . " = :value  where s.id = :id " :
            "UPDATE " . Order::class . " s SET s.modifiedBy = :userId , s." . $updateInfo['name'] . " = :value ,
             s.lastModification = '" . Utils::getCurrentDateTime() . "' where s.id = :id ";

        $query = $this->em->createQuery($sql);
        $query->setParameter('value', trim($updateInfo['value']) !== '' ? $updateInfo['value'] : null);
        $query->setParameter('userId', $this->authController->getCurrentUser($request)->getId());
        $query->setParameter('id', $updateInfo['id']);
        $query->getResult();
        $this->em->flush();
        return $this->responseToJson($response, ["status" => true, "message" => 'Row updated successfully']);
    }


    public function delete(Request $request, Response $response): Response
    {
        $orderId = RouteContext::fromRequest($request)->getRoute()->getArgument('id');
        $order = $this->em->getRepository(Order::class)->find($orderId);
        $this->em->remove($order);
        $this->em->flush();
        return $this->responseToJson($response, ['status' => true, 'message' => 'Row Successfully deleted']);
    }


    protected function createFilterCriteria(array $filters = []): Criteria
    {
        $criteria = new Criteria();


        foreach ($filters as $filter) {

            if ($filter->name === 'completed')
                $expression = $this->orderCompletion->completionExpression($filter);

            elseif ($this->dateRangeFilter($filter))
                $expression = $this->queryByRangeExpression($filter);

            else
                $expression = $this->defaultExpression($filter);


            $criteria->andWhere($expression);
        }

        return $criteria;
    }

    private function dateRangeFilter($filter)
    {
        return $filter->name === 'startDate' || $filter->name === 'endDate';
    }

    private function queryByRangeExpression($filter)
    {
        return $filter->name === 'startDate' ?
            Criteria::expr()->gte('orderDate', $filter->value) :
            Criteria::expr()->lte('orderDate', $filter->value);
    }


    public function queueAll(Request $request, Response $response): Response
    {
        $updateInfo = $request->getParsedBody();

        $sql = "UPDATE " . Order::class . " s SET s.modifiedBy = :userId , s.orderStatus = :value  where s.id = :id ";
        $query = $this->em->createQuery($sql);

        $query->setParameter('value', $updateInfo['value']);
        $query->setParameter('userId', $this->authController->getCurrentUser($request)->getId());


        try {
            $this->em->getConnection()->beginTransaction(); // suspend auto-commit

            foreach ($updateInfo['data'] as $id) {
                $query->setParameter('id', $id);
                $query->getResult();
            }

            $this->em->flush();
            $this->em->getConnection()->commit();
            $responsePayload = ["status" => true, "message" => 'Queue updated successfully'];
        } catch (Exception $exception) {
            $this->em->getConnection()->rollBack();
            $responsePayload = ["status" => false, "message" => "Failed to update queue"];
        }


        return $this->responseToJson($response, $responsePayload);
    }


    public function getDuplication($orderNos): array
    {
        $notTrackedExpression = new CompositeExpression(
            CompositeExpression::TYPE_OR,
            [
                Criteria::expr()->isNull('shopifyId'),
                Criteria::expr()->isNull('itemLineId')
            ]
        );

        $alreadyExistExpression = Criteria::expr()->in('orderNo', $orderNos);

        $criteria = new Criteria(
            new CompositeExpression(
                CompositeExpression::TYPE_AND,
                [
                    $notTrackedExpression,
                    $alreadyExistExpression
                ]
            )
        );

        return $this->em->getRepository(Order::class)->matching($criteria)->toArray();
    }

}
