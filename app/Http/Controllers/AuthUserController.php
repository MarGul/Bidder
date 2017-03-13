<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthUserController extends Controller
{
    
	/**
	 * Method to get the current authenticated user
	 * 
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request) {
		return response()->json(['message' => 'Display authenticated user.', 'user' => $request->user()]);
	}

}
