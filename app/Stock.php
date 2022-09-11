<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = ['name','product_id', 'date_purchased', 'no_of_items','expiry_date', 'created_at', 'updated_at'];

}
