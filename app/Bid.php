<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

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


    public static function getBids($where = null) {
        if ( !is_null($where) ) {
            if ( !$bids = Bid::where($where)->get() ) {
                return false;
            }
        }

        return self::parseBids($bids);
    }


    public static function createBid($service, $data) {
    	// If the service don't have status active - return a response
        if ( $service->status != 'active' ) {
            return response()->json(['message' => 'The requested service is not active.'], 401)->send();
        }

        $bid_stop = new Carbon($service->bid_stop, 'CET');
        $now = Carbon::now('CET');
        
        // If the time for bidding has past a bid can not be placed
        if ( $now > $bid_stop ) {
            return response()->json(['message' => 'The time for bidding on this service has ended.'], 401)->send();
        }

        // All is good, let's create a bid!
        $bid = new Bid;
        $bid->service_id = $service->id;
        $bid->user_id = 1337;
        $bid->description = $data['description'];
        $bid->start_service = $data['start_service'];
        $bid->end_service = $data['end_service'];
        $bid->hours_service = $data['hours_service'];
        $bid->price = $data['price'];
        $bid->status = 'pending';

        if ( $bid->save() ) {
            $bid->view_bids = [
                'href' => 'api/v1/services/' . $bid->service_id . '/bids',
                'method' => 'GET'
            ];
            return $bid;
        }

        return false;
    }

    public static function deleteBid($bid) {
        if ( !$bid->delete() ) {
            return false;
        }

        return self::parseBids([$bid])[0];
    }

    private static function parseBids($bids) {
        if ( !empty($bids) ) {
            foreach ($bids as $bid) {
                $create_bid = [
                    'href' => 'api/v1/services/' . $bid->service_id . '/bids',
                    'method' => 'POST',
                    'params' => ['description', 'start_service', 'end_service', 'hours_service', 'price']
                ];
            }

            return $bids;
        }
    }
}
