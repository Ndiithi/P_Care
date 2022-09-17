<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = ['product_id', 'quantity', 'date_purchased', 'batch_no', 'created_at', 'updated_at'];
}
