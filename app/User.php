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
    public function services() 
    {
    	return $this->hasMany('App\Service');
    }

    /**
     * A user may have many comments.
     * 
     * @return Eloquent Relationship
     */
    public function comments() 
    {
    	return $this->hasMany('App\Comment');
    }

    /**
     * A user may have many bids.
     * 
     * @return Eloquent Relationship
     */
    public function bids() 
    {
    	return $this->hasMany('App\Bid');
    }

    /**
     * Relationship to get the review count and average.
     * 
     * @return Eloquent Relationship
     */
    public function reviews()
    {
        return $this->hasOne('App\Review', 'reviewed')
                    ->selectRaw('reviewed, count(*) as count, avg(would_recommend) as avg')
                    ->where('submitted', true)
                    ->groupBy('reviewed');
    }

}
