<?php

namespace App\Features;

use App\User;

class UserManager {

	/**
	 * Update the user
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

}