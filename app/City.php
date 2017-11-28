<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'region_id', 'slug', 'name', 'description', 'sort'
    ];

    /**
     * Disable timestamps on the model.
     *  
     * @var boolean
     */
    public $timestamps = false;

    /**
     * A city belongs to a region.
     * 
     * @return Eloquent Relationship
     */
    public function region() {
        return $this->belongsTo('App\Region');
    }

    /**
     * A city may have many services.
     * 
     * @return Eloquent Relationship
     */
    public function services() {
        return $this->hasMany('App\Service');
    }
}
