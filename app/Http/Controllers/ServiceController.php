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
        $services = Service::with('comments', 'bids', 'region', 'city', 'category')->get();

        Service::parseServices($services);

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
    public function store(StoreService $request)
    {
        if ( !$this->manager->create($request->user(), $request) ) {
            return response()->json(['message' => 'Could not store the service in the database.'], 500);
        }
        
        return response()->json(['message' => 'Service was successfully created.', 'service' => $service], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        return $this->manager->get($service);
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
