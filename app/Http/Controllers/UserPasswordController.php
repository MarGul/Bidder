<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdatePassword;
use App\Features\UserManager;
use App\User;

class UserPasswordController extends Controller
{
    
	/**
     *  Class to manage users.
     * 
     * @var App\Features\UserManager
     */
	private $manager;

	public function __construct(UserManager $manager) {
		$this->manager = $manager;
		$this->middleware('auth:api', ['only' => 'update']);
	}

	/**
	 * Update the resource.
	 * 
	 * @param  App\User         $user
	 * @param  UpdatePassword 	$request
	 * @return \Illuminate\Http\Response
	 */
	public function update(User $user, UpdatePassword $request) {
		return $this->manager->updatePassword($user, $request->old, $request->new);
	}

}
