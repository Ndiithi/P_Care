<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sale extends Model
{
    protected $fillable = ['product_id', 'date_purchased', 'quantity', 'created_at', 'updated_at'];
}
