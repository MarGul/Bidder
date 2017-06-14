<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    
	public function index()
	{
		$service = \App\Service::find(1);

		dispatch(new \App\Jobs\SendSubscriptionEmails($service));
	}

}
