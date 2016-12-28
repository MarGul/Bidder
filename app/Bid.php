<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    
	/**
	 * A bid belongs to a service
	 * 
	 * @return Eloquent Relationship
	 */
    public function service() {
    	return $this->belongsTo('App\Service');
    }

    public static function createBid($service_id, $data) {
    	// Check to see if you can find the service.
    	
    	// Make sure that the time hasn't gone out. Need to add that to service.
    	// Right now I only have when the applicant wants to get his service completed.
    	// I also need the star and end time for the actual listing.
    	
    	// Create the bid 
    }
}
