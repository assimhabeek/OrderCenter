<?php


namespace App\Common\VehicleMatch;


class MatchHelper
{

    static public function calculateSimilarity(string $string1, string $string2): int
    {
        $string1 = strtolower($string1);
        $string2 = strtolower($string2);
        $percent = 0;

        if (trim($string1) === trim($string2)) {
            $percent = 100;
        } else if (str_contains($string1, $string2) || str_contains($string2, $string1)) {
            $percent = 95;
        } else {
            similar_text($string1, $string2, $percent);
        }
        return $percent;
    }

}
