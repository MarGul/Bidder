<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use App\Managers\ServiceManager;

class UserServicesController extends Controller
{
    
	/**
	 * Manager
	 * 
	 * @var App\Manager\ServiceManager
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
		$this->manager->byUser($request->user())
					  ->get();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'services' => $this->manager->services()
			]
		], $this->manager->successCode());
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

		$this->manager->forService($service)
					  ->show();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}
		
		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'service' => $this->manager->service()
			]
		], $this->manager->successCode());
	}

	/**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		$data =  $this->validate($request, [
            'title' => 'required',
            'category_id' => 'required|numeric|exists:categories,id',
            'region_id' => 'required|numeric|exists:regions,id',
            'city_id' => 'required|numeric|exists:cities,id',
            'start' => 'required|date_format:Y-m-d|after_or_equal:today',
            'end' => 'required|date_format:Y-m-d|after_or_equal:today',
            'bidding' => 'required|numeric|in:7,14,30,60',
            'description' => 'required',
            'media' => 'array',
            'media.*' => 'file|mimes:jpeg,jpg,bmp,png,gif,doc,xls,odt,ppt,rtf,pdf,txt,docx,xlsx|max:8000'
        ]);

        // Try and insert the service
        $this->manager->byUser($request->user())
        			  ->create($data);

        if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'service' => $this->manager->service()
			]
		], $this->manager->successCode());
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

		// If the service isn't active. You can't update it.
		if ( !$service->active ) abort(403, 'Unauthorized action.');

		$data = $this->validate($request, [
			'title' => 'required',
            'category_id' => 'required|numeric|exists:categories,id',
            'region_id' => 'required|numeric|exists:regions,id',
            'city_id' => 'required|numeric|exists:cities,id',
            'start' => 'required|date_format:Y-m-d',
            'end' => 'required|date_format:Y-m-d',
            'description' => 'required',
            'media' => 'array',
            'media.*' => 'file|mimes:jpeg,jpg,bmp,png,gif,doc,xls,odt,ppt,rtf,pdf,txt,docx,xlsx|max:8000',
            'deletedMedia' => 'array'
		]);

		// Try and update the service
		$this->manager->forService($service)
					  ->update($data);

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(),
			'data' => [
				'service' => $this->manager->service()
			]
		], $this->manager->successCode());
	}

	/**
     * Remove the specified resource from storage.
     *
     * @param  App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        $this->authorize('my-resource', $service);

        // Try to delete the service.
        $this->manager->forService($service)
        			  ->delete();

        if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage()
		], $this->manager->successCode());
    }

}
