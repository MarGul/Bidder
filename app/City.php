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
     * Parse the cities.
     * 
     * @param  Collection $cities [Collection of App\City]
     * @return void
     */
    public static function parseCities($cities) {
        foreach ($cities as $city) {
            self::parseCity($city);
        }
    }

    /**
     * Parse one city.
     * 
     * @param  App\City $city [City to be parsed.]
     * @return void
     */
    public static function parseCity($city) {
        $city->view_services = [
            'href' => 'api/v1/cities/' . $city->slug . '/services',
            'method' => 'GET'
        ];
    }
}
