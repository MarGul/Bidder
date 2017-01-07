<?php

namespace App\Helpers;

use JWTAuth;


class AuthHelp {

	/**
	 * Function to parse the token to a user. If the resource param
	 * is present we will authorize the parsed user with the resource.
	 * 
	 * @param  EloquentModel $resource [A resource to authorize the user against.]
	 * @return App\User                [the authenticated and authorized user object.]
	 */
	public static function authorize($resource = null) {
	    try {

	        if (! $user = JWTAuth::parseToken()->authenticate()) {
	            return [
	            	'error' => true, 
	            	'response' => response()->json(['message' => 'User not found.'], 404)
	            ];
	        }

	        if ( !is_null($resource) ) {
	        	if ( $resource->user_id != $user->id ) {
	        		return [
	        			'error' => true, 
	        			'response' => response()->json(['message' => 'Not authorized for resource.'], 403)
	        		];
	        	}
	        }

	        return $user;

	    } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

	        return [
	        	'error' => true,
	        	'response' => response()->json(['message' =>'token_expired'], $e->getStatusCode())
	        ];

	    } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

	        return [
	        	'error' => true,
	        	'response' => response()->json(['message' => 'token_invalid'], $e->getStatusCode())
	        ];

	    } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

	        return [
	        	'error' => true,
	        	'response' => response()->json(['message' => 'token_absent'], $e->getStatusCode())
	        ];

	    }
	}

}