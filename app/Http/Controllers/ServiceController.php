<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreService;
use App\Service;
use Carbon\Carbon;
use App\Features\ServiceManager;

class ServiceController extends Controller
{

    /**
     *  Class to manage services.
     * 
     * @var App\Features\ServiceManager;
     */
    protected $manager;

    public function __construct(ServiceManager $manager) {
        $this->middleware('auth:api', ['only' => ['store', 'update', 'destroy']]);

        $this->manager = $manager;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $services = $this->manager->filter(
            $request->page, 
            $request->text, 
            $request->categories, 
            $request->regions, 
            $request->cities
        );

        return response()->json([
            'message' => 'Listing all services.',
            'services' => $services
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'category_id' => 'required|numeric|exists:categories,id',
            'region_id' => 'required|numeric|exists:regions,id',
            'city_id' => 'required|numeric|exists:cities,id',
            'start' => 'required|date_format:Y-m-d|after_or_equal:today',
            'end' => 'required|date_format:Y-m-d|after_or_equal:today',
            'bidding' => 'required|numeric|in:7,14,30,60',
            'description' => 'required',
            'media' => 'array',
            'media.*' => 'file|mimes:jpeg,jpg,bmp,png,gif,svg,doc,odt,ppt,rtf,pdf,txt|max:8000'
        ]);

        // In laravel 5.5 we get this from the validate method.
        $data = $request->only(['title', 'description', 'category_id', 'region_id', 'city_id', 'start', 'end', 'bidding', 'media']);

        if ( !$this->manager->create($request->user(), $data) ) {
            return response()->json(['message' => 'Could not store the service in the database.'], 500);
        }
        
        return response()->json(['message' => 'Service was successfully created.'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        return response()->json([
            'message' => 'Showing service details.', 
            'service' => $this->manager->get($service)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Service               $service
     * @return \Illuminate\Http\Response
     */
    public function update(Service $service, Request $request)
    {
        $this->manager->update($service, $request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        $this->manager->delete($service);
    }
}
