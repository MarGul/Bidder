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

    /**
     *  Get services based on one condition.
     * 
     * @param  Array $where [The key is the column that the value should be equal to.]
     * @return Collection   [Collection of parsed Service objects]
     */
    public static function getServices($where = null) {
        if ( !is_null($where) ) {
            $w = array_keys($where)[0];
            $e = $where[$w];

            $services = Service::with('region', 'category', 'comments')
                                ->where($w, $e)
                                ->get();
        } else {
            $services = Service::with('region', 'category', 'comments')->get();
        }

        $services = self::parseServices($services);

        return $services;
            
    }

    /**
     * Run the services through this private function to add hypermedia links
     * and other things that needs to be done to the service.
     * 
     * @param  Collection $services [Collection of Service objects]
     * @return Collection           [Collection of parsed Service objects]
     */
    private static function parseServices($services) {
       foreach ($services as $service) {
            $service->hypermedia = [
                'view_service' => [
                    'href' => 'api/v1/services/' . $service->id
                ],
                'view_services_by_category' => [
                    'href' => 'api/v1/categories/' . $service->category_id . '/services',
                    'method' => 'GET'
                ]
            ];

            // If it's the user's requesting service, have delete and update service hypermedia.

            // No need for category_id and region_id. They are in the relationships
            unset($service->category_id);
            unset($service->region_id);
        }

        return $services; 
    }
 }
