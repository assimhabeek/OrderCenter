<?php

declare(strict_types=1);

namespace App\Middleware;

use App\Controller\AuthController;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Response;

class AdminMiddleware implements MiddlewareInterface
{
    private $authController;

    public function __construct(ContainerInterface $container,
                                AuthController $authController)
    {
        $this->authController = $authController;
    }


    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $isAdmin = $this->authController->isAdmin($request);

        if ($isAdmin) {
            return $handler->handle($request);
        }
        $response = new Response();
        $response->getBody()->write(json_encode(['status' => false, 'message' => 'Only admin have access']));
        return $response;
    }

}
