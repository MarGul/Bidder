<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use Carbon\Carbon;
use App\Helpers\AuthHelp;

class ServiceController extends Controller
{

    public function __construct() {
        // Add the jwt.auth middleware to routes
        $this->middleware('jwt.auth', ['only' => [
            'store', 'update', 'destroy'
        ]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $services = Service::getServices();

        return response()->json([
            'message' => 'Listing all services.',
            'test' => $test,
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
        // Get the authenticated and authorized user.
        $user = AuthHelp::authorize();
        if ( isset($user['error']) ) return $user['response'];       

        $this->validate($request, [
            'category_id' => 'required|integer|exists:categories,id',
            'region_id' => 'integer|exists:regions,id',
            'title' => 'required|max:100',
            'description' => 'required',
            'physical' => 'required|boolean',
            'start' => 'required|date_format:YmdHie',
            'end' => 'required|date_format:YmdHie',
            'bid_start' => 'required|date_format:YmdHie',
            'bid_stop' => 'required|date_format:YmdHie'
        ]);

        $service = new Service([
            'user_id' => $user->id,
            'category_id' => (int)$request->input('category_id'),
            'region_id' => (int)$request->input('region_id'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'physical' => (boolean)$request->input('physical'),
            'start' => Carbon::createFromFormat('YmdHie', $request->input('start')),
            'end' => Carbon::createFromFormat('YmdHie', $request->input('end')),
            'bid_start' => Carbon::createFromFormat('YmdHie', $request->input('bid_start')),
            'bid_stop' => Carbon::createFromFormat('YmdHie', $request->input('bid_stop')),
            'status' => 'active'
        ]);

        if ( $service->save() ) {
            // Replace the user_id with the user object
            unset($service->user_id);
            $service->user = $user;

            $service->view_service = [
                'href' => 'api/v1/service/' . $service->id,
                'method' => 'GET'
            ];

            return response()->json([
                'message' => 'Service successfully created',
                'service' => $service
            ], 201);
        }

        return response()->json(['message' => 'Failed to create service.'], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        $service = Service::getService($service->id);

        return response()->json([
            'message' => 'Viewing service data.',
            'service' => $service
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  App\Service               $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        $user = AuthHelp::authorize($service);
        if ( isset($user['error']) ) return $user['response'];

        $this->validate($request, [
            'category_id' => 'required|integer|exists:categories,id',
            'region_id' => 'integer|exists:regions,id',
            'title' => 'required|max:100',
            'description' => 'required',
            'physical' => 'required|boolean',
            'start' => 'required|date_format:YmdHie',
            'end' => 'required|date_format:YmdHie',
            'bid_start' => 'required|date_format:YmdHie',
            'bid_stop' => 'required|date_format:YmdHie'
        ]);

        $service->category_id = (int)$request->input('category_id');
        $service->region_id = (int)$request->input('region_id');
        $service->title = $request->input('title');
        $service->description = $request->input('description');
        $service->physical = (boolean)$request->input('physical');
        $service->start = Carbon::createFromFormat('YmdHie', $request->input('start'));
        $service->end = Carbon::createFromFormat('YmdHie', $request->input('end'));
        $service->bid_start = Carbon::createFromFormat('YmdHie', $request->input('bid_start'));
        $service->bid_stop = Carbon::createFromFormat('YmdHie', $request->input('bid_stop'));

        if ( !$service->update() ) {
            return response()->json(['message' => 'Could not update resource.'], 500);
        }

        $service->view_service = [
            'href' => 'api/v1/services/' . $service->id,
            'method' => 'GET'
        ];

        return response()->json([
            'message' => 'Successfully updated service.',
            'service' => $service
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        $user = AuthHelp::authorize($service);
        if ( isset($user['error']) ) return $user['response'];

        if ( !$service->delete() ) {
            return response()->json(['message' => 'Could not delete service.'], 500);
        }

        return response()->json([
            'message' => 'Successfully deleted service.',
            'service' => $service,
            'create_service' => [
                'href' => 'api/v1/services',
                'method' => 'POST',
                'params' => ['category_id, region_id, title, description, physical', 'start', 'end']
            ]
        ], 200);
    }
}
