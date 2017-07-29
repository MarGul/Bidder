<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bid;
use App\Events\NewBid;

class TestController extends Controller
{
    
	public function index()
	{
		$bid = Bid::find(3);
		event(new NewBid($bid));
	}

}
