<?php
declare(strict_types=1);

use App\Controller\AuthController;
use App\Controller\ExportHistoryController;
use App\Controller\OrderController;
use App\Controller\OrderExportController;
use App\Controller\OrderUploadController;
use App\Controller\ShopifyConnector;
use App\Controller\ShopifyController;
use App\Controller\SkuController;
use App\Controller\UserController;
use App\Controller\VehicleController;
use App\Controller\WebhooksController;
use App\Middleware\AdminMiddleware;
use App\Middleware\AuthMiddleware as AuthMiddleware;
use Slim\App;
use Slim\Routing\RouteCollectorProxy as Group;

return function (App $app) {

    $app->get('/year', VehicleController::class . ':getYears');
    $app->get('/make', VehicleController::class . ':getMakesByYear');
    $app->get('/model', VehicleController::class . ':getModelsByYearAndMake');
    $app->post('/login', AuthController::class . ':login');
    $app->get('/isLoggedIn', AuthController::class . ':isLoggedIn');

    $app->get('/install', ShopifyConnector::class . ':install');
    $app->get('/generateToken', ShopifyConnector::class . ':generateToken');



    $app->group("", function (Group $shopifyGroup) {
        $shopifyGroup->post('/shopify/orders/create', WebhooksController::class . ':create');
        $shopifyGroup->post('/shopify/orders/updated', WebhooksController::class . ':update');
        $shopifyGroup->post('/shopify/orders/edited', WebhooksController::class . ':edited');
        $shopifyGroup->post('/shopify/orders/fulfilled', WebhooksController::class . ':fulfilled');
        $shopifyGroup->post('/shopify/orders/partially_fulfilled', WebhooksController::class . ':partiallyFulfilled');
        $shopifyGroup->post('/shopify/orders/cancelled', WebhooksController::class . ':canceled');
        $shopifyGroup->post('/shopify/orders/delete', WebhooksController::class . ':fulfilled');
    })->add(AdminMiddleware::class);

    $app->group('', function (Group $authGroup) {

        $authGroup->group('/orders', function (Group $group) {
            $group->get('', OrderController::class . ':index');
            $group->post('', OrderController::class . ':create');
            $group->put('', OrderController::class . ':update');
            $group->delete('/{id}', OrderController::class . ':delete');
            $group->put('/queueAll', OrderController::class . ':queueAll');
            $group->get('/export/preview', OrderExportController::class . ':exportPreview');
            $group->post('/export', OrderExportController::class . ':export');
        });


        $authGroup->group('/skus', function (Group $group) {
            $group->get('', SkuController::class . ':index');
            $group->post('', SkuController::class . ':create');
            $group->put('', SkuController::class . ':update');
            $group->delete('/{id}', SkuController::class . ':delete');
        });

        $authGroup->group('/history', function (Group $group) {
            $group->get('', ExportHistoryController::class . ':index');
            $group->post('', ExportHistoryController::class . ':create');
            $group->put('', ExportHistoryController::class . ':update');
            $group->delete('/{id}', ExportHistoryController::class . ':delete');
            $group->get('/files', ExportHistoryController::class . ':download');

        });


        $authGroup->group('', function (Group $adminGroup) {

            $adminGroup->group('/vehicles', function (Group $group) {
                $group->get('', VehicleController::class . ':index');
                $group->post('', VehicleController::class . ':create');
                $group->put('', VehicleController::class . ':update');
                $group->delete('/{id}', VehicleController::class . ':delete');
            });

            $adminGroup->group('/users', function (Group $group) {
                $group->get('', UserController::class . ':index');
                $group->post('', UserController::class . ':create');
                $group->put('', UserController::class . ':update');
                $group->delete('/{id}', UserController::class . ':delete');
            });

            $adminGroup->get('/shopify-orders', ShopifyController::class . ':index');
            $adminGroup->post('/orders-all', ShopifyController::class . ':import');
            $adminGroup->post('/upload', OrderUploadController::class . ':upload');


        })->add(AdminMiddleware::class);

    })->add(AuthMiddleware::class);


};
