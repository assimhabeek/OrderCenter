<?php


namespace App\Common;

use App\Entity\Order;
use App\Entity\ProductSku;

class ProductParser
{

    public function __construct()
    {
    }


    public function parseProducts($products)
    {
        $newProducts = [];

        foreach ($products as $product)
            array_push($newProducts, $this->parseProduct($product));

        return $newProducts;
    }

    public function parseProduct($product): ProductSku
    {

        $p = new ProductSku();
        $p->setId($product['id']);
        $p->setProductName($product['handle']);
        $p->setProductTitle($product['title']);
        return $p;
    }


}
