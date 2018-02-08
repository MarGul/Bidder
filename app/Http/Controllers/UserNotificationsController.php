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

}
