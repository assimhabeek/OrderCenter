<?php

namespace App\Controller;

use App\Common\OrderParser;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class WebhooksController extends BaseController
{

    private $orderParser;

    private $shopifyController;


    public function __construct(ContainerInterface $container,
                                OrderParser $orderParser,
                                ShopifyController $shopifyController)
    {
        parent::__construct($container);
        $this->orderParser = $orderParser;
        $this->shopifyController = $shopifyController;
    }


    public function create(Request $request, Response $response): Response
    {
        $orders = $this->orderParser->parseOrderLines($request->getParsedBody());
        $this->shopifyController->doImport($request, $orders);
        return $response->withStatus(200);
    }

    public function update(Request $request, Response $response): Response
    {
        $orders = $this->orderParser->parseOrderLines($request->getParsedBody());
        $this->shopifyController->doImport($request, $orders);
        return $response->withStatus(200);
    }


    public function edited(Request $request, Response $response): Response
    {

        $idsToRemove = $request->getParsedBody()['order_edit']['line_items']['removals'];

        foreach ($idsToRemove as $id) {
            $this->shopifyController->deleteByLineId($id);
        }

        return $response->withStatus(200);
    }


    public function partiallyFulfilled(Request $request, Response $response): Response
    {
        $orders = $this->orderParser->parseOrderLines($request->getParsedBody());
        $this->shopifyController->doImport($request, $orders);
        return $response->withStatus(200);
    }

    public function fulfilled(Request $request, Response $response): Response
    {
        // just to double check
        $shopifyOrder = $request->getParsedBody();
        $shopifyOrder['fulfillment_status'] = 'fulfilled';
        $orders = $this->orderParser->parseOrderLines($shopifyOrder);
        $this->shopifyController->doImport($request, $orders);
        return $response->withStatus(200);
    }


    public function cancelled(Request $request, Response $response): Response
    {
        // just to double check
        $shopifyOrder = $request->getParsedBody();
        $shopifyOrder['fulfillment_status'] = 'cancelled';
        $orders = $this->orderParser->parseOrderLines($shopifyOrder);
        $this->shopifyController->doImport($request, $orders);
        return $response->withStatus(200);
    }


    public function delete(Request $request, Response $response): Response
    {
        $this->shopifyController->delete($request->getParsedBody()['id']);
        return $response->withStatus(200);
    }


}
