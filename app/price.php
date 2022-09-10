<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class price extends Model
{
    protected $fillable = ['product_id', 'price', 'from_date', 'created_at', 'updated_at'];
}
