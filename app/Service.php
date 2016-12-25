<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    
    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'user_id', 'category_id', 'region_id', 'title', 'description', 'physical', 'start', 'end'
    ];

    /**
     * A service belongs to a category
     * 
     * @return Eloquent Relationship
     */
    public function category() {
    	return $this->belongsTo('App\Category');
    }

    /**
     * A service belongs to a region
     * 
     * @return Eloquent Relationship
     */
    public function region() {
    	return $this->belongsTo('App\Region');
    }

    /**
     * A service has many comments
     * 
     * @return Eloquent Relationship
     */
    public function comments() {
        return $this->hasMany('App\Comment');
    }
}
