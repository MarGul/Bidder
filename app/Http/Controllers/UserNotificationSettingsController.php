<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

	public function index(Request $request)
	{
		return response()->json([
			'message' => 'Listing the users notification settings.', 
			'notificationSettings' => $this->manager->forUser($request->user())
		], 200);
	}
}
