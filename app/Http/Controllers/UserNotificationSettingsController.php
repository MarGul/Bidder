<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\NotificationSettingsManager;


class UserNotificationSettingsController extends Controller
{
    /**
	 * Manager
	 * 
	 * @var App\Managers\NotificationSettingsManager
	 */
	private $manager;

	public function __construct(NotificationSettingsManager $manager) {
		$this->middleware('auth:api');
		$this->manager = $manager;
	}

	/**
	 * List the resource
	 * 
	 * @param  Request 	$request
	 * @return Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		// Try to get the settings.
		$this->manager->byUser($request->user())
					  ->get();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage(), 
			'data' => [
				'settings' => $this->manager->notificationSettings()
			]
		], $this->manager->successCode());
	}

	/**
	 * Update the resource in storage.
	 * 
	 * @param  Request $request
	 * @return Illuminate\Http\Response
	 */
	public function update(Request $request)
	{
		$data = $request->only([
			'bid_on_service', 'comment_on_service', 'message_in_project', 'project_details_changed',
    		'other_party_accepted', 'project_started', 'leave_review', 'competing_bid', 'comment_reply'
    	]);

		// Try to update the notification settings.
		$this->manager->byUser($request->user())
					  ->update($data);

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage()
		], $this->manager->successCode());
	}
}
