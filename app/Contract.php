<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    
	/**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'service_user', 'bid_user', 'service_user_accept', 'bid_user_accept', 'finish', 'active'
    ];

}
