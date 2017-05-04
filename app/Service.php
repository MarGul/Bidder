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
    protected $hidden = [
        'user_id', 'category_id', 'region_id', 'city_id'
    ];

    /**
     * A service belongs to a user.
     * 
     * @return Eloquent Relationship
     */
    public function user() {
        return $this->belongsTo('App\User');
    }

    /**
     * A service belongs to a category.
     * 
     * @return Eloquent Relationship
     */
    public function category() {
    	return $this->belongsTo('App\Category');
    }

    /**
     * A service belongs to a region.
     * 
     * @return Eloquent Relationship
     */
    public function region() {
    	return $this->belongsTo('App\Region');
    }

    /**
     * A service belongs to a city.
     * 
     * @return Eloquent Relationship
     */
    public function city() {
        return $this->belongsTo('App\City');
    }

    /**
     * A service has many comments.
     * 
     * @return Eloquent Relationship
     */
    public function comments() {
        return $this->hasMany('App\Comment');
    }

    /**
     * A service has many bids.
     * 
     * @return Eloquent Relationship
     */
    public function bids() {
        return $this->hasMany('App\Bid');
    }

    /**
     * Run the services through this private function to add hypermedia links
     * and other things that needs to be done to the service.
     * 
     * @param  Collection $services [Collection of App\Service objects]
     * @return Collection           [Collection of parsed App\Service objects]
     */
    public static function parseServices($services) {
       foreach ($services as $service) {
            self::parseService($service);
        }
    }

    public static function parseService($service) {
        $service->hypermedia = [
            'view_service' => [
                'href' => 'api/v1/services/' . $service->id
            ],
            'view_category_services' => [
                'href' => 'api/v1/categories/' . $service->category->slug . '/services',
                'method' => 'GET'
            ]
        ];

        // If it's the user's requesting service, have delete and update service hypermedia.

        // No need for category_id, region_id, city_id and user_id. They are in the relationships
        unset($service->category_id);
        unset($service->region_id);
        unset($service->city_id);
        unset($service->user_id);
    }
 }
