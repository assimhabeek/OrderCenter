<?php
declare(strict_types=1);

use Slim\App;

return function (App $app) {

    $container = $app->getContainer();

    $app->add($container->get('corsMiddleware'));

};
