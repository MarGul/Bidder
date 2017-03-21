<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;


class User extends Authenticatable
{
	use HasApiTokens, Notifiable;
    
	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email', 'displayname', 'password', 'name'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'email', 'remember_token', 'created_at', 'updated_at'
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
