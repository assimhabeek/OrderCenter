<?php
declare(strict_types=1);

use DI\ContainerBuilder;
use Monolog\Logger;

return function (ContainerBuilder $containerBuilder) {
    $rootPath = realpath(__DIR__ . '/..');

    // Load .env values
    $dotenv = Dotenv\Dotenv::createUnsafeImmutable($rootPath);
    $dotenv->load();

    // Global Settings Object
    $containerBuilder->addDefinitions([
        'settings' => [
            'displayErrorDetails' => true,
            // Base path
            'base_path' => '/api/public',

            'exportPath' => $rootPath . '/var/exportedFile/',
            // Is debug mode
            'debug' => (getenv('APPLICATION_ENV') != 'production'),

            // 'Temprorary directory
            'temporary_path' => $rootPath . '/var/tmp',

            // Route cache
            'route_cache' => $rootPath . '/var/cache/routes',

            // doctrine settings
            'doctrine' => [
                'meta' => [
                    'entity_path' => [$rootPath . '/src/Entity'],
                    'auto_generate_proxies' => true,
                    'proxy_dir' => $rootPath . '/var/cache/proxies',
                    'cache' => null,
                ],
                'connection' => [
                    'driver' => 'pdo_mysql',
                    'user' => getenv('DB_USERNAME'),
                    'dbname' => getenv('DB_NAME'),
                    'password' => getenv('DB_PASSWORD'),
                    'host' => getenv('DB_HOST'),
                ]
            ],

            'JWT_SECRET' => getenv('JWT_SECRET'),
            'AUTH_TOKEN_HEADER' => getenv('AUTH_TOKEN_HEADER'),
            // authorisation middleware

            'SHOPIFY_SHOP' => getenv('SHOP_NAME'),
            'SHOP_SECRET' => getenv('SHOP_SECRET'),
            'CURRENT_SITE_ROOT' => getenv('CURRENT_SITE_ROOT'),
            // authorisation middleware
            'jwtMiddleware' =>
                [
                    'secret' => getenv('JWT_SECRET'),
                    'token_header' => getenv('AUTH_TOKEN_HEADER'),
                    'fail_message' => ['message' => 'Authorisation Failed']
                ],

            'corsMiddleware' => [
                "origin" => ["*"],
                "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
                "headers.allow" => ["Authorization", "If-Match", "If-Unmodified-Since", "Content-Type", "X-File-Name"],
                "headers.expose" => ["Etag", "X-File-Name"],
                "credentials" => true,
                "cache" => 86400
            ],


            // monolog settings
            'logger' => [
                'name' => 'app',
                'path' => getenv('docker') ? 'php://stdout' : $rootPath . '/var/log/app.log',
                'level' => (getenv('APPLICATION_ENV') != 'production') ? Logger::DEBUG : Logger::INFO,
            ]
        ],
    ]);

    if (getenv('APPLICATION_ENV') == 'production') { // Should be set to true in production
        $containerBuilder->enableCompilation($rootPath . '/var/cache');
    }
};
