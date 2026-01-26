<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'user_id',
        'btw',
        'price_without_btw',
        'price_with_btw',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
