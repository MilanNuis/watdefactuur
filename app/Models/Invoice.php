<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'user_id',
        'invoice_number',
        'invoice_date',
        'due_date',
        'client_first_name',
        'client_last_name',
        'client_email',
        'client_phone',
        'client_postalcode',
        'client_house_number',
        'client_city',
        'client_street',
        'client_country',
        'products',
        'subtotal',
        'btw_total',
        'total',
        'status',
    ];

    protected $casts = [
        'products' => 'array',
        'subtotal' => 'float',
        'btw_total' => 'float',
        'total' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
