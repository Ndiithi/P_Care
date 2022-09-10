<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class stock extends Model
{
    // protected $casts = [
    //     'updated_at' => 'datetime:Y-m-d',
    // ];

    protected $fillable = ['name','product_id', 'date_purchased', 'expiry_date', 'created_at', 'updated_at'];
}
