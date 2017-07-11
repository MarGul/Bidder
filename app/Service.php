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
    	'user_id', 'category_id', 'region_id', 'city_id', 'title', 'description', 'physical', 'start', 'end',
        'bid_start', 'bid_stop', 'bid_accepted', 'active'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['user_id'];

    /**
     * A service belongs to a user.
     * 
     * @return Eloquent Relationship
     */
    public function user() 
    {
        return $this->belongsTo('App\User');
    }

    /**
     * A service belongs to a category.
     * 
     * @return Eloquent Relationship
     */
    public function category() 
    {
    	return $this->belongsTo('App\Category');
    }

    /**
     * A service belongs to a region.
     * 
     * @return Eloquent Relationship
     */
    public function region() 
    {
    	return $this->belongsTo('App\Region');
    }

    /**
     * A service belongs to a city.
     * 
     * @return Eloquent Relationship
     */
    public function city() 
    {
        return $this->belongsTo('App\City');
    }

    /**
     * A service may have many media
     * 
     * @return Eloquent Relationship
     */
    public function media()
    {
        return $this->hasMany('App\Media');
    }

    /**
     * A service has many comments.
     * 
     * @return Eloquent Relationship
     */
    public function comments() 
    {
        return $this->hasMany('App\Comment');
    }

    /**
     * The count of comments for the service
     * 
     * @return Eloquent Relationship
     */
    public function comment_count()
    {
        return $this->hasOne('App\Comment')->selectRaw('service_id, count(*) as count')->groupBy('service_id');
    }

    /**
     * A service has many bids.
     * 
     * @return Eloquent Relationship
     */
    public function bids() 
    {
        return $this->hasMany('App\Bid');
    }

    /**
     * The count of bids for the service
     * 
     * @return Eloquent Relationship
     */
    public function bid_count()
    {
        return $this->hasOne('App\Bid')->selectRaw('service_id, count(*) as count')->groupBy('service_id');
    }

 }
