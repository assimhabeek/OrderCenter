<?php


namespace App\Middleware;

use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Response;


class ShopifyWebhooksMiddleware implements MiddlewareInterface
{

    private $settings;

    public function __construct(ContainerInterface $container)
    {
        $this->settings = $container->get('settings');
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {

        $calculated_hmac = base64_encode(hash_hmac('sha256', $request->getBody(), $this->settings['SHARED_SECRET'], true));
        $response = new Response();
        if (hash_equals($request->getHeaderLine("HTTP_X_SHOPIFY_HMAC_SHA256"), $calculated_hmac)) {
            $response = $handler->handle($request);
        } else {
            $response->getBody()->write(json_encode(['message' => 'This is a shopify webhook']));
            $response->withStatus(401);
        }
        return $response;
    }
}

