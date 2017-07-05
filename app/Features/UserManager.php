<?php

namespace App\Features;

use App\User;
use Illuminate\Support\Facades\Hash;
use App\Notifications\EmailVerification;
use App\Jobs\DeleteOldProfilePicture;
use App\Jobs\ResizeProfilePicture;
use Notification;
use Image;
use Storage;


class UserManager {

	/**
	 * When a user is created this is the default avatar being used. 
	 * Also when a user is updating his avatar this one should not be deleted in the job.
	 * 
	 * @var string
	 */
	protected $defaultAvatarUrl = 'http://mccollinsmedia.com/wp-content/uploads/2015/04/default-avatar.jpg';

	/**
	 * Get the profile for a user
	 * 
	 * @param  string 	$username
	 * @return App\User;
	 */
	public function profile($username)
	{
		$user = User::with('rating', 'reviews.reviewer')
					->where('username', $username)
					->firstOrFail();

		return $user;
	}

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
			'avatar' => $this->defaultAvatarUrl,
			'email_verification_code' => str_random(35)
		]);

		// Send out email for confirming the users email adress
		Notification::send($user, new EmailVerification($user));

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
	 * Update a users avatar.
	 * 
	 * @param  App\User 						$user
	 * @param  Illuminate\Http\UploadedFile 	$avatar
	 * @return boolean
	 */
	public function updateProfilePicture($user, $avatar)
	{
		$img = Image::make($avatar)->resize(400, null, function($constraint) {
			$constraint->aspectRatio();
		});

		$path = 'avatars/' . $avatar->hashName();

		if ( !Storage::put($path, $img->stream()->detach()) ) return false;

		// Delete the old profile picture in a job
		if ( $user->avatar && ($user->avatar !== $this->defaultAvatarUrl) ) {
			dispatch(new DeleteOldProfilePicture($user->avatar));
		}

		$user->avatar = env('AWS_BUCKET_LINK') . '/' . env('AWS_BUCKET') . '/' . $path;
		
		if ( !$user->save() ) return false;

		return $user;
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

	/**
	 * Verify a users email address
	 * 
	 * @param  string 	$code
	 * @return boolean
	 */
	public function verifyEmail($code)
	{
		$user = User::where('email_verification_code', $code)->first();

		if ( !$user ) return false;

		$user->email_verified = true;
		$user->email_verification_code = null;

		return $user->save();
	}

}