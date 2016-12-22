<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service;
use Carbon\Carbon;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Eager load to not have the 1 + N query problem.
        $services = Service::with('category', 'region')->get();

        foreach ($services as $service) {
            // No need to show the category_id and region_id, it's in the relationships
            unset($service->category_id);
            unset($service->region_id);
            
            $service->view_service = [
                'href' => 'api/v1/services/' . $service->id,
                'method' => 'GET'
            ];
        }

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
            'category_id' => 'required|integer',
            'region_id' => 'integer',
            'title' => 'required|max:100',
            'description' => 'required',
            'physical' => 'required|boolean',
            'start' => 'required|date_format:YmdHie',
            'end' => 'required|date_format:YmdHie'
        ]);

        $service = new Service([
            'user_id' => 1337,
            'category_id' => (int)$request->input('category_id'),
            'region_id' => (int)$request->input('region_id'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'physical' => (boolean)$request->input('physical'),
            'start' => Carbon::createFromFormat('YmdHie', $request->input('start')),
            'end' => Carbon::createFromFormat('YmdHie', $request->input('end')),
        ]);

        if($service->save()) {
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $service = Service::find((int)$id);
        $service->view_services = [
            'href' => 'api/v1/services',
            'method' => 'GET'
        ];

        return response()->json([
            'message' => 'Viewing service data.',
            'service' => $service
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'category_id' => 'required|integer',
            'region_id' => 'integer',
            'title' => 'required|max:100',
            'description' => 'required',
            'physical' => 'required|boolean',
            'start' => 'required|date_format:YmdHie',
            'end' => 'required|date_format:YmdHie'
        ]);

        // If the service isn't found Laravel will return a 404.
        $service = Service::findOrFail((int)$id);

        $service->category_id = (int)$request->input('category_id');
        $service->region_id = (int)$request->input('region_id');
        $service->title = $request->input('title');
        $service->description = $request->input('description');
        $service->physical = (boolean)$request->input('physical');
        $service->start = Carbon::createFromFormat('YmdHie', $request->input('start'));
        $service->end = Carbon::createFromFormat('YmdHie', $request->input('end'));

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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $service = Service::findOrFail((int)$id);

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
