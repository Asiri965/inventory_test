<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['name', 'unit', 'quantity'];

    protected $casts = [
        'quantity' => 'decimal:3',
    ];

    public function transactions()
    {
        return $this->hasMany(InventoryTransaction::class);
    }
}
