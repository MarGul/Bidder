<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Features\UserManager;
use App\User;

class UserAvatarController extends Controller
{
    
	/**
     *  Class to manage users.
     *  
     * @var App\Features\UserManager;
     */
	private $manager;


	public function __construct(UserManager $manager) 
	{
		$this->manager = $manager;
		$this->middleware('auth:api', ['only' => 'store']);
	}

	/**
	 * Store a new avatar in storage.
	 * 
	 * @param  Request $request
	 * @return Illuminate\Http\Response
	 */
	public function store(User $user, Request $request)
	{
		$this->authorize('my-resource', $user);
		$this->validate($request, ['avatar' => 'required|image']);

		if ( !$request->file('avatar')->isValid() || !$user = $this->manager->updateProfilePicture($user, $request->file('avatar')) ) {
			return response()->json(['message' => 'Could not upload the avatar.'], 500);
		}

		return response()->json(['message' => 'Successfully uploaded the avatar.', 'user' => $user], 200);
	}

}
