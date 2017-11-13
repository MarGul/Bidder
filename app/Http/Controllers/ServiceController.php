<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreService;
use App\Service;
use Carbon\Carbon;
use App\Managers\ServiceManager;

class ServiceController extends Controller
{

    /**
     *  Class to manage services.
     * 
     * @var App\Managers\ServiceManager;
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
       // Try and fetch the services
       $this->manager->filter(
            $request->page,
            $request->text,
            $request->categories,
            $request->regions,
            $request->cities
       );

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
     * Display the specified resource.
     *
     * @param  App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        // Try and find the service
        $this->manager->forService($service)
                      ->find();

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
}
