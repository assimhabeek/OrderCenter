<?php

namespace App\Command;

use DI\Container;
use DI\DependencyException;
use DI\NotFoundException;
use PDO;
use PDOException;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;


class InitDB extends Command
{
    private $settings;

    public function __construct(Container $container)
    {
        parent::__construct();
        try {
            $this->settings = $container->get('settings');
        } catch (DependencyException $e) {
        } catch (NotFoundException $e) {
        }
    }

    protected function configure()
    {
        $this
            // the name of the command (the part after "bin/console")
            ->setName('app:init-db')

            // the short description shown while running "php bin/console list"
            ->setDescription('Initialize database')

            // the full command description shown when running the command with
            // the "--help" option
            ->setHelp('Create database structe and add initial data');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $connectionSettings = $this->settings['doctrine']['connection'];
        $dns = 'mysql:host=' . $connectionSettings['host'] . ';dbname=' . $connectionSettings['dbname'];
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $connection = new  PDO($dns, $connectionSettings['user'], $connectionSettings['password'], $options);
        if (!$connection) {
            $output->writeLn('Can\'t connect to mysql database [' . $this->settings['doctrine']['connection']['dbname'] . ']');
            return;
        }

        $rootPath = realpath(__DIR__ . '/../..');
        $queries = explode(";", file_get_contents($rootPath . '/db.sql'), -1);

        $connection->setAttribute(PDO::ATTR_AUTOCOMMIT, 0);
        try {
            $connection->beginTransaction();

            foreach ($queries as $query) {
                $statement = $connection->prepare($query);
                $statement->execute();
            }

            $connection->commit();
            $connection->setAttribute(PDO::ATTR_AUTOCOMMIT, 1);
            $connection = null;
            $output->writeLn("Database structure created");
        } catch (PDOException $exception) {
            $output->writeLn('Can\'t create database :' . $exception->getMessage());
        }


    }
}
