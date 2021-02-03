<?php


namespace App\Common;

use App\Entity\Order;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Expr\Comparison;
use Doctrine\Common\Collections\Expr\CompositeExpression;
use Doctrine\Common\Collections\Expr\Expression;

class OrderCompletion
{


    public function completionExpression($filter): CompositeExpression
    {
        $expressions = [
            'completed' => $this->isCompleted(),
            'uncompleted' => $this->isNotCompleted(),
            'carifex completed' => $this->carifexCompleted(),
            'carifex uncompleted' => $this->carifexNotCompleted(),
            'non carifex completed' => $this->nonCarifexCompleted(),
            'non carifex uncompleted' => $this->nonCarifexNotCompleted()
        ];
        return $expressions[$filter->value];
    }

    public function isCompleted(): CompositeExpression
    {
        return new CompositeExpression(
            CompositeExpression::TYPE_OR,
            [
                $this->nonCarifexCompleted(),
                $this->carifexCompleted()
            ]
        );

    }

    public function isNotCompleted(): CompositeExpression
    {
        return new CompositeExpression(
            CompositeExpression::TYPE_OR,
            [
                $this->nonCarifexNotCompleted(),
                $this->carifexNotCompleted()
            ]
        );
    }

    public function carifexCompleted(): CompositeExpression
    {
        return $this->notNullColumns(Order::CARIFEX_TYPE_COLUMNS);
    }

    public function nonCarifexCompleted(): CompositeExpression
    {
        return $this->notNullColumns(Order::NON_CARIFEX_TYPE_COLUMNS);
    }

    private function carifexNotCompleted(): CompositeExpression
    {
        return new CompositeExpression(
            CompositeExpression::TYPE_AND,
            [
                $this->hasNullColumns(Order::CARIFEX_TYPE_COLUMNS),
                $this->allNullColumns(Order::NON_CARIFEX_TYPE_COLUMNS)
            ]
        );
    }

    private function nonCarifexNotCompleted(): CompositeExpression
    {
        return new CompositeExpression(
            CompositeExpression::TYPE_AND,
            [
                $this->hasNullColumns(Order::NON_CARIFEX_TYPE_COLUMNS),
                $this->allNullColumns(Order::CARIFEX_TYPE_COLUMNS)
            ]
        );
    }


    private function notNullColumns($cols): CompositeExpression
    {
        $expressions = [];
        foreach ($cols as $col) array_push($expressions, $this->notNullColumn($col));
        return new CompositeExpression(CompositeExpression::TYPE_AND, $expressions);
    }

    private function hasNullColumns($cols): CompositeExpression
    {
        $expressions = [];
        foreach ($cols as $col) array_push($expressions, $this->nullColumn($col));
        return new CompositeExpression(CompositeExpression::TYPE_OR, $expressions);
    }

    private function allNullColumns($cols): Expression
    {
        $expressions = [];
        foreach ($cols as $col) array_push($expressions, $this->nullColumn($col));
        return new CompositeExpression(CompositeExpression::TYPE_AND, $expressions);
    }

    private function notNullColumn($col): Comparison
    {
        return Criteria::expr()->neq($col, null);
    }

    private function nullColumn($col): Comparison
    {
        return Criteria::expr()->isNull($col);
    }

}
