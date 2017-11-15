<?php

namespace App\Http\Controllers;

use App\Managers\UserManager;
use Illuminate\Http\Request;
use App\User;

class UserProfileController extends Controller
{
    /**
     *  Class to manage users.
     *  
     * @var App\Managers\ServiceManager;
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
		// Try to get the user.
		$this->manager->profile($username);

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

	/**
	 * Update the resource in storage
	 * 
	 * @param  App\User         $user
	 * @param  Request 			$request
	 * @return \Illuminate\Http\Response
	 */
	public function update(User $user, Request $request) 
	{
		$this->validate($request, [
			'name' => 'required',
			'username' => 'required|unique:users,username,'.$user->id,
			'bio' => ''
		]);

		$this->authorize('my-user', $user);

		$data = $request->only(['name', 'username', 'bio']);

		$this->manager->byUser($user)
					  ->update($data);

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
