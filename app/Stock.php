<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = ['name','product_id', 'batch_no','no_of_items', 'created_at', 'updated_at'];

}
