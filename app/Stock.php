<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = ['name','product_id', 'date_purchased', 'batch_no','no_of_items','expiry_date', 'created_at', 'updated_at'];

}
