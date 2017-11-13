<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\SubscriptionManager;
use App\Subscription;

class SubscriptionController extends Controller
{

    /**
     * Manager
     * 
     * @var App\Managers\SubscriptionManager
     */
    private $manager;

    public function __construct(SubscriptionManager $manager) 
    {
        $this->middleware('auth:api');
        $this->manager = $manager;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Try and get the subscriptions
        $this->manager->byUser($request->user())
                      ->get();
       
       // The contract could not be created.
        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'subscriptions' => $this->manager->subscriptions()
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
        $this->validate($request, [
            'category_id' => 'required|exists:categories,id'
        ]);

        $data = $request->only('category_id', 'region_id', 'city_id');

        // Try and create a subscription
        $this->manager->byUser($request->user())
                      ->create($data);

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'subscription' => $this->manager->subscription()
            ]
        ], $this->manager->successCode());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Subscription
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subscription $subscription)
    {
        $this->authorize('my-resource', $subscription);

        // Try and delete the subscription
        $this->manager->forSubscription($subscription)
                      ->delete();

         if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
        ], $this->manager->successCode());
    }
}
