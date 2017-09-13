<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use App\Features\ServiceManager;

class UserServicesController extends Controller
{
    
	/**
	 * Manager
	 * 
	 * @var App\Features\ServiceManager
	 */
	private $manager;


	public function __construct(ServiceManager $manager) {
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

	/**
	 * Display a listing of the resource.
	 * 
	 * @param  Request 	$request 
	 * @return Illuminate\Http\Response
	 */
	public function index(Request $request) 
	{
		return $this->manager->byUser($request->user());
	}

	/**
	 * Display a single resource
	 * 
	 * @param  Request $request
	 * @return Illuminate\Http\Response
	 */
	public function show(Request $request, Service $service) 
	{
		$this->authorize('my-resource', $service);

		return response()->json(['Listing a single service.', 'service' => $service]);
	}

	/**
	 * Update a resource
	 * 
	 * @param  Request $request
	 * @param  Service $service
	 * @return Illuminate\Http\Response
	 */
	public function update(Request $request, Service $service)
	{
		$this->authorize('my-resource', $service);

		$this->validate($request, [
			'title' => 'required',
            'category_id' => 'required|numeric|exists:categories,id',
            'region_id' => 'required|numeric|exists:regions,id',
            'city_id' => 'required|numeric|exists:cities,id',
            'start' => 'required|date_format:Y-m-d',
            'end' => 'required|date_format:Y-m-d|after_or_equal:today',
            'description' => 'required',
            'media' => 'array',
            'media.*' => 'file|mimes:jpeg,jpg,bmp,png,gif,svg,doc,odt,ppt,rtf,pdf,txt|max:8000'
		]);

		$data = $request->only(['title', 'category_id', 'region_id', 'city_id', 'start', 'end', 'description']);

		if ( !$this->manager->update($service, $data) ) {
			return response()->json(['message' => 'Could not update the service.'], 400);
		}

		return response()->json(['message' => 'Successfully updated your service'], 200);
	}

}
