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
    	
    }
}
