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
}
