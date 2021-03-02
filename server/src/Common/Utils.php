<?php


namespace App\Common;

use DateTime;
use DateTimeZone;

class Utils
{


    public static function getCurrentDateTime()
    {
        $date = new DateTime('now', new DateTimeZone('America/Chicago'));
        return $date->format('Y-m-d  H:i:s');
    }

    public static function getSheetName()
    {
        $date = new DateTime('now', new DateTimeZone('America/Chicago'));
        return $date->format('Y-m-d');
    }

}
