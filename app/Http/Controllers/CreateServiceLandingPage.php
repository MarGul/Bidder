<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CreateServiceLandingPage extends Controller
{
    
    public function index(Request $request)
    {
        return view('landingpages.create-service');
    }

}
