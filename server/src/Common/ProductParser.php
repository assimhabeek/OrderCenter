<?php


namespace App\Common;

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
            foreach ($product['variants'] as $variant) {
                $variant['product_title'] = $product['title'];
                $variant['product_handle'] = $product['handle'];
                array_push($newProducts, $this->parseProduct($variant));

            }

        return $newProducts;
    }

    public function parseProduct($product): ProductSku
    {

        $p = new ProductSku();
        $p->setId($product['id']);
        $p->setProductId($product['product_id']);
        $title = $product['title'] === 'Default Title' ?
            $product['product_title'] :
            $product['product_title'] . ' | ' . $product['title'];

        $p->setProductTitle($title);
        return $p;
    }


}
