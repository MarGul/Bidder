<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\MediaManager2;

class TestController extends Controller
{
    
	public function store(Request $request) {
		$data = $this->validate($request, [
            'media' => 'array',
            'media.*' => 'file|mimes:jpeg,jpg,bmp,png,gif,svg,doc,odt,ppt,rtf,pdf,txt|max:8000'
		]);

		$service = \App\Service::find(1);

		$manager = app(MediaManager2::class);
		$manager->forService($service)
				->addMedia($data['media']);
	}

}
