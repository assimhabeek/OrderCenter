<?php

namespace App\Controller;

use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Expr\Comparison;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;

abstract class BaseController
{
    protected $logger;
    protected $em;  // Entities Manager
    protected $hydrator;
    protected $setting;

    public function __construct(ContainerInterface $container)
    {
        $this->logger = $container->get('logger');
        $this->em = $container->get('em');
        $this->hydrator = $container->get('hydrator');
        $this->setting = $container->get('settings');
    }

    public function responseToJson(ResponseInterface $response, array $payload): ResponseInterface
    {
        $response->getBody()->write(json_encode($payload));
        return $response;
    }

    protected function createFilterCriteria(array $filters = []): Criteria
    {
        $criteria = new Criteria();
        foreach ($filters as $filter) $criteria->andWhere($this->defaultExpression($filter));
        return $criteria;
    }

    protected function defaultExpression($filter): Comparison
    {
        return is_numeric($filter->value) ?
            Criteria::expr()->eq($filter->name, $filter->value) :
            Criteria::expr()->contains($filter->name, $filter->value);
    }


    protected function parseFilter($filter)
    {
        return isset($filter) && sizeof(json_decode($filter)) > 0 ? json_decode($filter) : [];
    }

}
