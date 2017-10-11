<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Project extends Model
{
    
	/**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'service_id', 'bid_id', 'service_price', 'service_start', 'service_end', 'service_hours'
    ];

    /**
     * Each project has one service.
     * 
     * @return Eloquent Relationship
     */
    public function service()
    {
        return $this->belongsTo('App\Service');
    }

    /**
     * Each project has one bid.
     * 
     * @return Eloquent Relationship
     */
    public function bid()
    {
        return $this->belongsTo('App\Bid');
    }

    /**
     * A project has many users.
     * 
     * @return Eloquent Relationship
     */
    public function users()
    {
        return $this->belongsToMany('App\User')->withPivot('role', 'title');
    }

    /**
     * A project has one invoice.
     * 
     * @return Eloquent Relationship
     */
    public function invoice()
    {
        return $this->hasOne('App\Invoice');
    }

}
