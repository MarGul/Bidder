<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use App\Events\NewService;

class TestController extends Controller
{
    
	public function index()
	{
		$service = Service::find(1);
		event(new NewService($service));
	}

}
