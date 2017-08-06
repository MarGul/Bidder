<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Features\NotificationSettingsManager;

class UserNotificationSettingsController extends Controller
{
    /**
	 * Manager
	 * 
	 * @var App\Features\NotificationSettingsManager
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
		return response()->json([
			'message' => 'Listing the users notification settings.', 
			'notificationSettings' => $this->manager->forUser($request->user())
		], 200);
	}

	public function update(User $user, Request $request)
	{
		$this->authorize('my-resource', $user);

		$data = $request->only([
			'bid_on_service', 'comment_on_service', 'message_in_project', 'project_details_changed',
    		'other_party_accepted', 'project_started', 'leave_review', 'competing_bid', 'comment_reply']);

		if ( !$this->manager->update($request->user(), $data) ) {
			return response()->json(['message' => 'Could not update the notification settings.'], 400);
		}

		return response()->json(['message' => 'Notification settings successfully updated.'], 200);
	}
}
