#!/usr/bin/env php
<?php

use DI\ContainerBuilder;
use Doctrine\Common\Cache\ArrayCache;
use Doctrine\Common\ClassLoader;
use Doctrine\ORM\Configuration;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping\Driver\DatabaseDriver;
use Doctrine\ORM\Tools\DisconnectedClassMetadataFactory;

function rrmdir($src)
{
    $dir = opendir($src);
    while (false !== ($file = readdir($dir))) {
        if (($file != '.') && ($file != '..')) {
            $full = $src . '/' . $file;
            if (is_dir($full)) {
                rrmdir($full);
            } else {
                unlink($full);
            }
        }
    }
    closedir($dir);
    rmdir($src);
}

// Set the absolute path to the root directory.
$rootPath = realpath(__DIR__ . '/..');

require $rootPath . '/vendor/autoload.php';

$containerBuilder = new ContainerBuilder();
$settings = require $rootPath . '/conf/settings.php';
$settings($containerBuilder);
$container = $containerBuilder->build();
$settings = $container->get('settings');

$classLoader = new ClassLoader('Entities', $settings['doctrine']['meta']['entity_path'][0]);
$classLoader->register();
$classLoader = new ClassLoader('Proxies', $settings['doctrine']['meta']['proxy_dir']);
$classLoader->register();

// config
$config = new Configuration();
$config->setMetadataDriverImpl($config->newDefaultAnnotationDriver($settings['temporary_path'] . '/tmp_entity'));
$config->setMetadataCacheImpl(new ArrayCache);
$config->setProxyDir($settings['doctrine']['meta']['proxy_dir']);
$config->setProxyNamespace('Proxies');
$em = EntityManager::create($settings['doctrine']['connection'], $config);
// custom datatypes (not mapped for reverse engineering)
$em->getConnection()->getDatabasePlatform()->registerDoctrineTypeMapping('set', 'string');
$em->getConnection()->getDatabasePlatform()->registerDoctrineTypeMapping('enum', 'string');
// fetch metadata
$driver = new DatabaseDriver(
    $em->getConnection()->getSchemaManager()
);
$driver->setNamespace('\\App\\Entity\\');
$em->getConfiguration()->setMetadataDriverImpl($driver);
$cmf = new DisconnectedClassMetadataFactory($em);
$cmf->setEntityManager($em);
$classes = $driver->getAllClassNames();
$metadata = $cmf->getAllMetadata();
$generator = new Doctrine\ORM\Tools\EntityGenerator();
$generator->setUpdateEntityIfExists(true);
$generator->setGenerateStubMethods(true);
$generator->setGenerateAnnotations(true);
$generator->generate($metadata, $settings['temporary_path'] . '/tmp_entity');

// Move files in the good directory
$files = glob($settings['temporary_path'] . '/tmp_entity/App/Entity/*.{php}', GLOB_BRACE);
foreach ($files as $fullpath) {
    $file = basename($fullpath);
    $src = file_get_contents($fullpath);
    if (preg_match('#^namespace\s+(.+?);$#sm', $src)) {
        continue;
    }
    $php = preg_replace("/<\?php/", "<?php\nnamespace App\\Entity;", $src);
    file_put_contents($rootPath . '/src/Entity/' . $file, $php);
}

rrmdir($settings['temporary_path'] . '/tmp_entity');
print '-------------------------------------------' . PHP_EOL;
print ' Done! Generated entities to `src/Entity`  ' . PHP_EOL;
print '-------------------------------------------' . PHP_EOL;
