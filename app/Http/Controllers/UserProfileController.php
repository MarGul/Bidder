<?php

namespace App\Http\Controllers;

use App\Features\UserManager;
use App\Http\Requests\UpdateProfile;
use App\User;

class UserProfileController extends Controller
{
    /**
     *  Class to manage users.
     *
     * @param   string 		$username
     * @var App\Features\ServiceManager;
     */
	private $manager;

	public function __construct(UserManager $manager) 
	{
		$this->manager = $manager;
		$this->middleware('auth:api', ['only' => 'update']);
	}

	/**
	 * Displaying a listing of the resource
	 * 
	 * @return \Illuminate\Http\Response
	 */
	public function index($username)
	{
		if ( !$user = $this->manager->profile($username) ) {
			return response()->json(['message' => 'Could not fetch the user right now.'], 500);
		}

		return response()->json(['message' => 'Displaying user profile.', 'user' => $user], 200);
	}

	/**
	 * Update the resource
	 * 
	 * @param  App\User         $user
	 * @param  UpdateProfile 	$request
	 * @return \Illuminate\Http\Response
	 */
	public function update(User $user, UpdateProfile $request) 
	{
		return $this->manager->update($user, $request);
	}

}
