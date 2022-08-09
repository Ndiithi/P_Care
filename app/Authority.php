<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Authority extends Model
{
    protected $hidden = ['created_at', 'updated_at'];

    public function roles()
    {
        return $this->belongsToMany('App\Role');
    }
}
