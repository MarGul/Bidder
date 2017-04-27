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
     * @var App\Features\ServiceManager;
     */
	private $manager;

	public function __construct(UserManager $manager) {
		$this->manager = $manager;
		$this->middleware('auth:api', ['only' => 'update']);
	}

	/**
	 * Update the resource
	 * 
	 * @param  App\User         $user
	 * @param  UpdateProfile 	$request
	 * @return \Illuminate\Http\Response
	 */
	public function update(User $user, UpdateProfile $request) {
		return $this->manager->update($user, $request);
	}

}
