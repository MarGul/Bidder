<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Bid extends Model
{
    
	/**
	 * A bid belongs to a service.
	 * 
	 * @return Eloquent Relationship
	 */
    public function service() {
    	return $this->belongsTo('App\Service');
    }

    /**
     * A bid belongs to a user.
     * 
     * @return Eloquent Relationship
     */
    public function user() {
        return $this->belongsTo('App\User');
    }

    /**
     * Get bids based on conditions.
     * 
     * @param  Array  $where [Condition for bids]
     * @return Collection    [Collection of App\Bid objects]
     */
    public static function getBids($where = null) {
        if ( !is_null($where) ) {
            if ( !$bids = Bid::where($where)->get() ) {
                return false;
            }
        }

        return self::parseBids($bids);
    }

    /**
     * Create a bid
     * 
     * @param  App\Service        $service [The service to place a bid on]
     * @param  Array              $data    [Array of data for the bid]
     * @return Response|Boolean            [True on success, otherwise false. Or a direct response on error]
     */
    public static function createBid($service, $data) {
    	// If the service don't have status active - return a response.
        if ( $service->status != 'active' ) {
            return [
                'error' => true,
                'response' => response()->json(['message' => 'The requested service is not active.'], 401)
            ];
        }

        $bid_stop = new Carbon($service->bid_stop, 'CET');
        $now = Carbon::now('CET');
        
        // If the time for bidding has past, a bid can not be placed.
        if ( $now > $bid_stop ) {
            return [
                'error' => true,
                'response' => response()->json(['message' => 'The time for bidding on this service has ended.'], 403)
            ];
        }

        // All is good, let's create a bid!
        $bid = new Bid;
        $bid->service_id = $service->id;
        $bid->user_id = $data['user_id'];
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

        return [
            'error' => true,
            'response' => response()->json(['Could not create bid.'], 500)
        ];
    }

    /**
     * Update a bid
     * 
     * @param  App\Service $service [The service that the bid is on]
     * @param  App\Bid     $bid     [The bid object]
     * @param  Array       $data    [Array of data to update the bid with]
     * @return Response|Boolean     [True on success, otherwise false. Or a direct response on error]
     */
    public static function updateBid($service, $bid, $data) {
        $bid_stop = new Carbon($service->bid_stop, 'CET');
        $now = Carbon::now('CET');
        
        // If the time for bidding has past, a bid can not be updated.
        if ( $now > $bid_stop ) {
            return [
                'error' => true,
                'response' => response()->json(['message' => 'The time for bidding on this service has ended.'], 403)
            ];
        }

        // All is good, let's update the bid!
        $bid->description = $data['description'];
        $bid->start_service = $data['start_service'];
        $bid->end_service = $data['end_service'];
        $bid->hours_service = $data['hours_service'];
        $bid->price = $data['price'];

        if ( $bid->update() ) {
            $bid->view_bids = [
                'href' => 'api/v1/services/' . $bid->service_id . '/bids',
                'method' => 'GET'
            ];
            return $bid;
        }

        return [
            'error' => true,
            'response' => response()->json(['message' => 'Could not update the bid.'], 500)
        ];
    }

    /**
     * Delete a bid
     * 
     * @param  Service\Bid $bid [The bid to delete]
     * @return App\Bid|Boolean  [The deleted bid or false on error]
     */
    public static function deleteBid($bid) {
        if ( !$bid->delete() ) {
            return false;
        }

        return self::parseBids([$bid])[0];
    }

    /**
     * Parse retrieved bids. Add hypermedia to the bids.
     * 
     * @param  Collection $bids [Collection of App\Bid objects]
     * @return Collection       [Collection of parsed App\Bid objects]
     */
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
