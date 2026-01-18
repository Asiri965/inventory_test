<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryTransaction extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'item_id',
        'type',
        'quantity',
        'note',
        'meta',
        'created_at'
    ];

    protected $casts = [
        'quantity' => 'decimal:3',
        'meta' => 'array',
        'created_at' => 'datetime',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
