<?php

namespace App\Common\VehicleMatch;

use App\Entity\Vehicle;
use Psr\Container\ContainerInterface;

class VehicleMatcher
{
    protected $em;


    public function __construct(ContainerInterface $container)
    {
        $this->em = $container->get('em');
    }


    /**
     * Matches an input string to a vehicle in the database
     *
     * @param string $customerInput
     * @return ModelMatcher
     */
    public function matchVehicle(?string $customerInput): ?ModelMatcher
    {
        if ($customerInput === null) {
            return null;
        }
        $yearMatcher = $this->getYearMatcher($customerInput);
        $makeMatcher = $yearMatcher ? $this->getMakeMatcher($yearMatcher) : null;
        return $this->getModelMatcher($makeMatcher);
    }


    private function getYearMatcher($customerInput): ?YearMatcher
    {
        $yearMatcher = new YearMatcher($customerInput);
        $yearMatcher->match();
        return $yearMatcher->valid() ? $yearMatcher : null;
    }

    private function getMakeMatcher($yearMatcher): ?MakeMatcher
    {
        $possibleMatches = $this->loadPossibleMatches($yearMatcher->getYear());

        $makeMatcher = new MakeMatcher(
            $possibleMatches,
            $yearMatcher->getMakeModelSegments(),
            $yearMatcher->separatorUsed()
        );

        $makeMatcher->match();

        return $makeMatcher->valid() ? $makeMatcher : null;
    }

    private function getModelMatcher($makeMatcher): ?ModelMatcher
    {
        if ($makeMatcher === null) {
            return null;
        }

        $modelMatcher = new ModelMatcher(
            $makeMatcher->getMakeModelSegments(),
            $makeMatcher->getBestMatch(),
            $makeMatcher->getPossibleMatches()
        );

        $modelMatcher->match();

        return $modelMatcher->valid() ? $modelMatcher : null;
    }

    private function loadPossibleMatches(int $year)
    {
        return $this->em->getRepository(Vehicle::class)->findByYear($year);
    }

}
