<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Project extends Model
{
    
	/**
	 * Append the custom attribute title when going toArray
	 * 
	 * @var array
	 */
	protected $appends = ['title'];

	/**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'service_user', 'bid_user', 'service_user_accept', 'bid_user_accept', 'accept_end',
        'service_user_title', 'bid_user_title', 'finish', 'price', 'completed'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'service_user_title', 'bid_user_title'
    ];

    /**
     * Only show a title in the response. It will depend on what role the user has in the project.
     * 
     * @return string
     */
    public function getTitleAttribute()
    {
    	return Auth::user()->id === $this->service_user ? $this->service_user_title : $this->bid_user_title;
    }

    /**
     * Each project has one bid user.
     * 
     * @return Eloquent relationship
     */
    public function bidUser()
    {
        return $this->hasOne('App\User', 'id', 'bid_user');
    }

    /**
     * Each project has one service user.
     * 
     * @return Eloquent relationship
     */
    public function serviceUser()
    {
        return $this->hasOne('App\User', 'id', 'service_user');
    }

}
