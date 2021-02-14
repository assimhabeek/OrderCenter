<?php


namespace App\Controller;


use App\Common\ProductParser;
use App\Entity\ProductSku;
use Exception;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

final class ShopifyProductController extends BaseController
{

    private $shopifyConnector;

    private $productParser;

    private $authController;

    public function __construct(ContainerInterface $container,
                                ShopifyConnector $shopifyConnector,
                                AuthController $authController,
                                ProductParser $productParser)
    {
        parent::__construct($container);
        $this->shopifyConnector = $shopifyConnector;
        $this->authController = $authController;
        $this->productParser = $productParser;
    }


    public function index(Request $request, Response $response, array $args): Response
    {
        $allProducts = [];

        do {

            $params = $this->wrapParams($request);

            if (sizeof($allProducts) != 0) {
                $params['since_id'] = max($this->getId($allProducts));
            }

            $payload = $this->shopifyConnector->shopifyCall("/admin/products.json", $params);

            $products = json_decode($payload['response'], TRUE)['products'];

            if (sizeof($products) != 0) {
                $allProducts = array_merge($allProducts, $this->productParser->parseProducts($products));
            }


        } while (sizeof($products) > 0);


        return $this->responseToJson(
            $response,
            [
                'status' => true,
                'data' => $allProducts,
                'total' => sizeof($allProducts)
            ]
        );
    }

    public function import(Request $request, Response $response, array $args): Response
    {
        $products = $request->getParsedBody();


        $responsePayload = [];


        try {

            $this->em->getConnection()->beginTransaction(); // suspend auto-commit

            foreach ($products as $p) {
                $pp = $this->hydrator->hydrate(ProductSku::class, $p);
                $pp->setId($p['id']);
                $this->em->merge($pp);
            }


            $this->em->flush();
            $this->em->getConnection()->commit();

            $responsePayload = ["status" => true, '$products' => $products, "message" => "Imported successfully"];

        } catch (Exception $exception) {
            $this->em->getConnection()->rollBack();
            $responsePayload = [
                "status" => false,
                "message" => "Failed to import",
                "log" => $exception->getMessage()
            ];
        }

        return $this->responseToJson($response, $responsePayload);
    }


    private function wrapParams($request): array
    {
        return array_merge($request->getQueryParams(),
            [
                'limit' => 250
            ]
        );
    }


    function getId($products)
    {
        return array_map(
            function (ProductSku $order) {
                return $order->getId();
            },
            $products
        );
    }


}
