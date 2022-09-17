<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = ['product_id', 'date_purchased', 'batch_no','no_of_items','expiry_date', 'created_at', 'updated_at'];

}
