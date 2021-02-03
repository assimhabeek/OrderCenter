<?php


namespace App\Common\VehicleMatch;


class YearMatcher implements MatcherInterface
{

    const EXPECTED_SEPARATORS = [","];

    private $customerInput;
    private $customerInputSegments;
    private $makeModelSegments;
    private $yearIndex;
    private $separator;
    private $year;

    public function __construct($customerInput)
    {
        $this->customerInput = $customerInput;
    }

    /**
     * @return
     */
    public function getCustomerInputSegments()
    {
        return $this->customerInputSegments;
    }

    /**
     * @param  $customerInputSegments
     */
    public function setCustomerInputSegments($customerInputSegments)
    {
        $this->customerInputSegments = $customerInputSegments;
    }

    /**
     * @return
     */
    public function getYearIndex()
    {
        return $this->yearIndex;
    }

    /**
     * @param  $yearIndex
     */
    public function setYearIndex($yearIndex)
    {
        $this->yearIndex = $yearIndex;
    }

    /**
     * @return
     */
    public function getSeparator()
    {
        return $this->separator;
    }


    /**
     * @param  $separator
     */
    public function setSeparator($separator)
    {
        $this->separator = $separator;
    }

    /**
     * @return |null
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * @param |null $year
     */
    public function setYear($year)
    {
        $this->year = $year;
    }


    /**
     * @return
     */
    public function getMakeModelSegments()
    {
        return $this->makeModelSegments;
    }

    /**
     * @param  $makeModelSegments
     */
    public function setMakeModelSegments($makeModelSegments)
    {
        $this->makeModelSegments = $makeModelSegments;
    }

    public function match(): void
    {
        $this->separator = $this->findSeparator($this->customerInput) ?: " ";
        $this->customerInputSegments = $this->explodeCustomerInput($this->separator, $this->customerInput);
        $this->yearIndex = $this->extractYearIndex($this->customerInputSegments);

        $hasValidYear = $this->valid();

        $this->year = $hasValidYear ? $this->fixYearFormat($this->customerInputSegments[$this->yearIndex]) : null;
        $this->makeModelSegments = $hasValidYear ? $this->removeYear($this->customerInputSegments, $this->yearIndex) : array();
    }


    private function findSeparator($customerInput)
    {

        foreach (self::EXPECTED_SEPARATORS as $sp) {
            if (substr_count($customerInput, $sp) == 2) return $sp;
        }

        return null;
    }

    private function explodeCustomerInput($separator, $customerInput)
    {
        return explode($separator, $customerInput);
    }

    private function extractYearIndex($customerInputSegments)
    {
        $pattern = "/^(((19)?[0-9][0-9])|((20)?[0-9][0-9]))$/i";
        $matchedIntegersIndexes = array_keys(preg_grep($pattern, $customerInputSegments));
        return array_shift($matchedIntegersIndexes);
    }


    public function valid(): bool
    {
        return $this->yearIndex > -1;
    }

    public function separatorUsed()
    {
        return $this->separator;
    }

    private function fixYearFormat($year)
    {
        return strlen(trim($year)) < 4 ? (((int)$year) < 88 ? "20" . $year : "19" . $year) : $year;
    }

    private function removeYear($customerInputSegments, $yearIndex)
    {
        unset($customerInputSegments[$yearIndex]);
        return array_values($customerInputSegments);
    }


}
