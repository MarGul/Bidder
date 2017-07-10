<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use App\Features\MediaManager;

class TestController extends Controller
{
    
	public function index()
	{
		$path = 'tmp/zbuAnNRW1o7Kzi8ItjrP79UG0NZykmKumoqGlbAz.jpeg';
		$service = Service::find(1);

		dd(app(MediaManager::class)->storeServiceFile($path, $service));
	}

}
