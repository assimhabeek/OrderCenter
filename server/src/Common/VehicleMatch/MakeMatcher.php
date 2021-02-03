<?php


namespace App\Common\VehicleMatch;


class MakeMatcher implements MatcherInterface
{

    const MAKE_DEFAULT_INDEX = 0;
    const MAKE_MAX_ALLOWED_SEGMENTS = 2;

    // 1 for make and 1 for model
    const SEGMENTS_EXPECTED_SIZE = 2;

    const DEFAULT_DATABASE_MAKE_WORD_SEPARATOR = " ";

    private $possibleMatches;
    private $makeModelSegments;
    private $separatorUsed;
    private $bestMatch;

    public function __construct(array $possibleMatches, array $makeModelSegments, bool $separatorUsed)
    {

        $this->possibleMatches = $possibleMatches;
        $this->makeModelSegments = $makeModelSegments;
        $this->separatorUsed = $separatorUsed;

        $this->initBestMatch();
    }

    private function initBestMatch()
    {
        $this->bestMatch = new \stdClass();
        $this->bestMatch->makeScore = 0;
        $this->bestMatch->makeLength = 0;

    }

    public function valid(): bool
    {
        return $this->bestMatch->makeScore > 0;
    }

    public function match(): void
    {

        foreach ($this->possibleMatches as $vehicle) {

            $dbMake = $vehicle->getMake();
            $shouldHaveOne = $this->makeShouldHaveOneSegment();
            $couldHaveMany = $this->makeCouldHaveMoreSegments();

            $makeScore = $shouldHaveOne ? $this->oneSegmentScore($dbMake) :
                ($couldHaveMany ? $this->getMaxScore($dbMake) : 0);

            $makeLength = $shouldHaveOne ? 1 :
                ($couldHaveMany ? $this->getLength($dbMake) : 0);


            $result = $this->createResult($dbMake, $makeScore, $makeLength);
            $this->updateBestMatch($result);

        }

        if ($this->valid()) {
            $this->updateResults();
        }

    }

    private function createResult($make, $makeScore, $makeLength): \stdClass
    {
        $result = new \stdClass;
        $result->make = $make;
        $result->makeScore = $makeScore;
        $result->makeLength = $makeLength;
        return $result;
    }


    private function makeShouldHaveOneSegment(): bool
    {
        return $this->separatorUsed || sizeof($this->makeModelSegments) == self::SEGMENTS_EXPECTED_SIZE;
    }

    private function makeCouldHaveMoreSegments(): bool
    {
        return sizeof($this->makeModelSegments) > self::SEGMENTS_EXPECTED_SIZE;
    }

    private function oneSegmentScore($dbMake): int
    {
        $inputMake = $this->makeModelSegments[self::MAKE_DEFAULT_INDEX];
        return MatchHelper::calculateSimilarity($dbMake, $inputMake);
    }


    private function manySegmentsScore($dbMake): int
    {
        $inputMake = join(self::DEFAULT_DATABASE_MAKE_WORD_SEPARATOR,
            array_slice($this->makeModelSegments,
                self::MAKE_DEFAULT_INDEX,
                self::MAKE_MAX_ALLOWED_SEGMENTS)
        );
        return MatchHelper::calculateSimilarity($dbMake, $inputMake);
    }

    private function getMaxScore($dbMake): int
    {
        return max($this->oneSegmentScore($dbMake), $this->manySegmentsScore($dbMake));
    }

    private function getLength($dbMake): int
    {
        return $this->oneSegmentScore($dbMake) > $this->manySegmentsScore($dbMake) ? 1 : self::MAKE_MAX_ALLOWED_SEGMENTS;
    }

    private function updateBestMatch($result): void
    {
        if ($result->makeScore > $this->bestMatch->makeScore)
            $this->bestMatch = $result;
    }

    private function updateResults()
    {
        $newResults = [];

        foreach ($this->possibleMatches as $p) {
            if ($p->getMake() === $this->bestMatch->make)
                array_push($newResults, $p);
        }

        $this->possibleMatches = $newResults;
    }

    /**
     * @return \stdClass
     */
    public function getBestMatch(): \stdClass
    {
        return $this->bestMatch;
    }

    /**
     * @return array
     */
    public function getPossibleMatches(): array
    {
        return $this->possibleMatches;
    }

    /**
     * @return array
     */
    public function getMakeModelSegments(): array
    {
        return $this->makeModelSegments;
    }
}
