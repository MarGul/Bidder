<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\UserManager;
use App\User;

class UserAvatarController extends Controller
{
    
	/**
     *  Class to manage users.
     *  
     * @var App\Managers\UserManager;
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
		$this->authorize('my-user', $user);
		$this->validate($request, ['avatar' => 'required|image']);

		// Try to upload the new avatar
		$this->manager->byUser($user)
					  ->updateAvatar($request->file('avatar'));

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json([
            'message' => $this->manager->successMessage(),
            'data' => [
                'user' => $this->manager->user()
            ]
        ], $this->manager->successCode());
	}

}
