<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bid;
use App\Features\NotificationSettingsManager;

class TestController extends Controller
{
    
	public function index()
	{
		$bid = Bid::find(1);

		app(NotificationSettingsManager::class)->forCompetingBid($bid);

	}

}
