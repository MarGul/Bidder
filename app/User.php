<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email', 'username', 'password', 'name'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    /**
     * A user may have many services.
     * 
     * @return Eloquent Relationship
     */
    public function services() {
    	return $this->hasMany('App\Service');
    }

    /**
     * A user may have many comments.
     * 
     * @return Eloquent Relationship
     */
    public function comments() {
    	return $this->hasMany('App\Comment');
    }

    /**
     * A user may have many bids.
     * 
     * @return [type] [description]
     */
    public function bids() {
    	return $this->hasMany('App\Bid');
    }

}
