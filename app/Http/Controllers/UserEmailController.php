<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserEmailController extends Controller
{
    
    
    public function __construct() 
	{
		$this->middleware('auth:api');
	}

    /**
     * Display a listing of the resource.
     *
     * @param   Request $request
     * @return  Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return response()->json([
            'message' => 'Display the users email.',
            'data' => [
                'email' => $request->user()->email
            ]
        ], 200);    
    }

}
