<?php
declare(strict_types=1);

use DI\ContainerBuilder;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Processor\UidProcessor;
use pmill\Doctrine\Hydrator\ArrayHydrator;
use Psr\Container\ContainerInterface;
use PsrJwt\Handler\Json;
use PsrJwt\JwtAuthMiddleware;
use Tuupola\Middleware\CorsMiddleware;

return function (ContainerBuilder $containerBuilder) {
    $containerBuilder->addDefinitions([


        'logger' => function (ContainerInterface $container) {
            $settings = $container->get('settings');

            $loggerSettings = $settings['logger'];
            $logger = new Logger($loggerSettings['name']);

            $processor = new UidProcessor();
            $logger->pushProcessor($processor);

            $handler = new StreamHandler($loggerSettings['path'], $loggerSettings['level']);
            $logger->pushHandler($handler);

            return $logger;
        },


        'em' => function (ContainerInterface $container) {
            $settings = $container->get('settings');
            $config = Setup::createAnnotationMetadataConfiguration(
                $settings['doctrine']['meta']['entity_path'],
                $settings['doctrine']['meta']['auto_generate_proxies'],
                $settings['doctrine']['meta']['proxy_dir'],
                $settings['doctrine']['meta']['cache'],
                false
            );
            return EntityManager::create($settings['doctrine']['connection'], $config);
        },
        'hydrator' => function (ContainerInterface $container) {
            $em = $container->get('em');
            return new ArrayHydrator($em);
        },

        'jwtMiddleware' => function (ContainerInterface $container) {
            $settings = $container->get('settings');
            $jwtSettings = $settings['jwtMiddleware'];
            return new JwtAuthMiddleware(new Json($jwtSettings['secret'], $jwtSettings['token_header'], $jwtSettings['fail_message']));
        },

        'corsMiddleware' => function (ContainerInterface $container) {
            $settings = $container->get('settings');
            return new  CorsMiddleware($settings['corsMiddleware']);
        },
    ]);
};

