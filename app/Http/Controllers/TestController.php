<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Events\NewService;

class TestController extends Controller
{
    
	public function index()
	{
		$user = User::find(1);
		$user->load('notification_settings');
		dd($user);
	}

}
