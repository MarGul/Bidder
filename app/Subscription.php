<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    
	/**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = ['user_id', 'category_id', 'region_id', 'city_id'];

}
