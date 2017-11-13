<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Managers\UserManager;
use App\User;

class UserPasswordController extends Controller
{
    
	/**
     *  Class to manage users.
     * 
     * @var App\Managers\UserManager
     */
	private $manager;

	public function __construct(UserManager $manager) {
		$this->manager = $manager;
		$this->middleware('auth:api');
	}

	/**
	 * Update the resource.
	 * 
	 * @param  App\User         $user
	 * @param  Request 			$request
	 * @return \Illuminate\Http\Response
	 */
	public function update(User $user, Request $request) {
		$this->validate($request,[
			'old' => 'required',
            'new' => 'required|min:7|regex:/^(?=.*[a-zA-Z])(?=.*\d).+$/',
            'again' => 'required|same:new'
		]);

		$this->authorize('my-user', $user);

		// Try to update the password.
		$this->manager->byUser($user)
					  ->updatePassword($request->only(['old', 'new']));

		if ( $this->manager->hasError() ) {
			return response()->json($this->manager->errorMessage(), $this->manager->errorCode());
		}

		return response()->json([
			'message' => $this->manager->successMessage()
		], $this->manager->successCode());
	}

}
