<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\NotificationManager;

class UserNotificationsController extends Controller
{
    
    /**
     * Manager
     * 
     * @var App\Managers\NotificationManager
     */
    private $manager;

    
    public function __construct(NotificationManager $manager) {
        $this->middleware('auth:api');
        $this->manager = $manager;
    }

    /**
	 * Display the resource
	 * 
	 * @param  Request 	$Request
	 * @return Illuminate\Http\Response
	 */
    public function index(Request $request) {
        $page = $request->page ?? 1;

        // Try to fetch the users notifications.
        $this->manager->byUser($request->user())
                      ->get($page);

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'notifications' => $this->manager->notifications()
            ]
        ], $this->manager->successCode());
    }
    
    /**
     * Mark of the users notifications as read.
     *
     * @param   Request $request
     * @return  Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // Try to mark the notification as read.
        $this->manager->byUser($request->user())
                      ->markAsRead($request->notification);

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage()
        ], $this->manager->successCode());
    }

    /**
     * Mark all of the users notifications as read.
     *
     * @param   Request $request
     * @return  Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        // Try to mark the users notifications as read.
        $this->manager->byUser($request->user())
                      ->markAllAsRead();

        if ( $this->manager->hasError() ) {
            return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
        }

        return response()->json([
            'message' => $this->manager->successMessage()
        ], $this->manager->successCode());
    }

}
