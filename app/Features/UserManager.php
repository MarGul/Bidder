<?php

namespace App\Features;

use App\User;
use Illuminate\Support\Facades\Hash;

class UserManager {

	/**
	 * Create a new user
	 * 
	 * @param  array 	$data
	 * @return App\User
	 */
	public function create($data)
	{
		$user = User::create([
			'email' => $data['email'],
			'username' => $data['username'],
			'password' => bcrypt($data['password']),
			'name' => '',
			'bio' => '',
			'avatar' => 'http://mccollinsmedia.com/wp-content/uploads/2015/04/default-avatar.jpg' // Need to change
		]);

		// Send out email confirmation email.
		// Send out welcome email with a delay.

		return $user;
	}

	/**
	 * Update the users profile.
	 * 
	 * @param  App\Http\Requests\UpdateProfile 	$request
	 * @return \Illuminate\Http\Response
	 */
	public function update($user, $request) {
		$user->name = $request->name;
		$user->username = $request->username;
		$user->bio = $request->bio;

		if ( !$user->update() ) {
			return response()->json(['message' => 'Could not update the profile'], 500);
		}

		return response()->json(['message' => 'Updated the profile', 'user' => $user], 200);
	}

	/**
	 * Update the users password.
	 * 
	 * @param  App\Http\Requests\UpdatePassword 	$request
	 * @return \Illuminate\Http\Response
	 */
	public function updatePassword($user, $old, $new) {
		// Make sure the old is the same as the users current password
		if ( !Hash::check($old, $user->password) ) {
			return response()->json(['old' => ['Det gamla lösenordet var fel.']], 403);
		}

		$user->password = bcrypt($new);

		if ( !$user->update() ) {
			return response()->json(['message' => 'Could not update your password'], 500);
		}

		return response()->json(['message' => 'Updated your password.'], 200);
	}

}