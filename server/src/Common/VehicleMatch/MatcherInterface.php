<?php


namespace App\Common\VehicleMatch;


interface MatcherInterface
{

    public function match(): void;
    public function valid(): bool;

}
