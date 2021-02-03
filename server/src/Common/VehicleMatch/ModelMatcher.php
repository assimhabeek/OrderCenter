<?php


namespace App\Common\VehicleMatch;


class ModelMatcher implements MatcherInterface
{


    const DEFAULT_DATABASE_MODEL_WORD_SEPARATOR = " ";
    const MINIMUM_SCORE = 75; // 75/100
    private $inputModel;
    private $possibleMatches;
    private $bestMatch;

    public function __construct(array $makeModelSegments, \stdClass $bestMatch, array $possibleMatches)
    {
        $this->bestMatch = $bestMatch;
        $this->bestMatch->modelScore = 0;

        $this->inputModel = $this->getInputModel($makeModelSegments);
        $this->possibleMatches = $possibleMatches;
    }


    public function valid(): bool
    {
        return ($this->bestMatch->modelScore + $this->bestMatch->makeScore) / 2 > self::MINIMUM_SCORE;
    }

    public function match(): void
    {

        foreach ($this->possibleMatches as $possibleMatch) {
            $dbModel = $possibleMatch->getModel();
            $result = $this->createResult($possibleMatch, $this->score($dbModel));
            $this->updateBestMatch($result);
        }

    }

    private function getInputModel($makeModelSegments): string
    {
        return join(
            self::DEFAULT_DATABASE_MODEL_WORD_SEPARATOR,
            array_slice($makeModelSegments, $this->bestMatch->makeLength - 1)
        );
    }

    private function createResult($vehicle, $modelScore): \stdClass
    {
        $result = new \stdClass;
        $result->vehicle = $vehicle;
        $result->modelScore = $modelScore;
        return $result;
    }


    private function score($dbModel): int
    {
        return MatchHelper::calculateSimilarity($dbModel, $this->inputModel);
    }

    private function updateBestMatch($result): void
    {
        if ($result->modelScore > $this->bestMatch->modelScore) {
            $this->bestMatch->modelScore = $result->modelScore;
            $this->bestMatch->vehicle = $result->vehicle;
        }
    }

    /**
     * @return mixed
     */
    public function getBestMatchedVehicle()
    {
        return $this->bestMatch->vehicle;
    }

    public function getBestScore(){
       return ($this->bestMatch->modelScore + $this->bestMatch->makeScore ) / 2;
    }
}
