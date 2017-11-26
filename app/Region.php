<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    
    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'slug', 'name', 'description'
    ];

    /**
     * Disable timestamps on the model.
     *  
     * @var boolean
     */
    public $timestamps = false;

    /**
     * A region has many cities
     * 
     * @return Eloquemt Relationship
     */
    public function cities() 
    {
        return $this->hasMany('App\City');
    }

    /**
     * A region has many services
     * 
     * @return Eloquent Relationship
     */
    public function services() 
    {
    	return $this->hasMany('App\Service');
    }
    
}
