<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Image;

class TestController extends Controller
{
    
	public function index()
	{
		$img = Image::make('test.png')->resize(300,200);
	}

}
