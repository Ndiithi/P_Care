<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Catalog extends Model
{
    protected $fillable = ['product_id', 'name', 'manufacturer', 'created_at', 'updated_at'];

}
