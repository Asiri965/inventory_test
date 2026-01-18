<?php

namespace App\Enums;

enum TransactionType: string
{
    case Add = 'add';
    case Deduct = 'deduct';
}
