<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class AuthController extends Controller
{
    
	/**
	 * Authenticate a user and give them a token
	 * 
	 * @param  Request $request [The incomming request]
	 * @return Response         [401 if invalid credentials or 200 with the token]
	 */
	public function signin(Request $request) {
		$this->validate($request, [
			'email' => 'required|email',
			'password' => 'required'
		]);

		$credentials = $request->only('email', 'password');

		try {
    		if ( !$token = JWTAuth::attempt($credentials) ) {
    			return response()->json(['message' => 'Invalid credentials'], 401);
    		}
    	} catch (JWTException $e) {
    		return response()->json(['message' => 'Could not create token, please try again.'], 500);
    	}

    	return response()->json(['token' => $token], 200);
	}

}
