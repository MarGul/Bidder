<?php

namespace App\Managers;

use App\User;
use Illuminate\Support\Facades\Hash;
use App\Notifications\EmailVerification;
use App\Jobs\DeleteOldProfilePicture;
use App\Jobs\ResizeProfilePicture;
use Notification;
use Image;
use Storage;


class UserManager extends BaseManager
{
	/**
	 * The user that the manager is working with.
	 * @var App\User
	 */
	protected $user;


	/**
	 * Return the user that the manager has been working on.
	 * 
	 * @return App\User
	 */
	public function user() { return $this->user; }

	/**
	 * Get the profile for a user
	 * 
	 * @param  string 	$username
	 * @return boolean
	 */
	public function profile($username)
	{
		try {
			$this->user = User::with('rating', 'reviews.reviewer')
							  ->where('username', $username)
							  ->firstOrFail();
		} catch (\Exception $e) {
			$this->setError('Could not fetch the users profile.', 500);
			return false;
		}

		$this->setSuccess('Displaying a users profile.', 200);

		return true;
	}

	/**
	 * Create a new user
	 * 
	 * @param  array 	$data
	 * @return App\User
	 */
	public function create($data)
	{		
		$this->setData($data);

		$this->user = User::create([
			'email' => $this->data('email'),
			'username' => $this->data('username'),
			'password' => bcrypt($this->data('password')),
			'company' => $this->data('company'),
			'name' => '',
			'bio' => '',
			'email_verification_code' => str_random(35)
		]);

		// Send out email for confirming the users email adress
		Notification::send($this->user, new EmailVerification($this->user));

		return $this->user;
	}

	/**
	 * Send out a users email verification.
	 *
	 * @return void
	 */
	public function sendEmailVerification()
	{
		if ( $this->hasError() ) return false;

		try {
			if ( is_null($this->user->email_verification_code) ) {
				$this->user->update(['email_verification_code' => str_random(35)]);
			}
		} catch ( \Exception $e ) {
			$this->setError('Could not set a new email verification code.', 500);
			return false;
		}
		
		Notification::send($this->user, new EmailVerification($this->user));

		$this->setSuccess('Successfully sent the users email verification', 200);

		return true;
	}

	/**
	 * Verify a users email address
	 * 
	 * @param  string 	$code
	 * @return boolean
	 */
	public function verifyEmail($code)
	{
		$this->user = User::where('email_verification_code', $code)->first();

		if ( !$this->user ) {
			$this->setError('Not a correct email verification code.', 403);
			return false;
		}

		try {
			$this->user->update([
				'email_verified' => true,
				'email_verification_code' => null
			]);
		} catch ( \Exception $e ) {
			$this->setError('Could not verify your email.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Update the users profile.
	 * 
	 * @param  array 	$data
	 * @return boolean
	 */
	public function update($data) 
	{
		if ( $this->hasError() ) return false;

		if ( !$this->setData($data)->edit() ) return false;

		$this->setSuccess('Successfully updated the users profile.', 200);

		return true;
	}

	/**
	 * Update the resouce in storage.
	 * 
	 * @return boolean
	 */
	protected function edit()
	{
		try {
			$this->user->update([
				'name' => $this->data('name'),
				'username' => $this->data('username'),
				'bio' => $this->data('bio')
			]);
		} catch (\Exception $e) {
			$this->setError('Could not update the users profile.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Update a users avatar.
	 * 
	 * @param  Illuminate\Http\UploadedFile 	$avatar
	 * @return boolean
	 */
	public function updateAvatar($avatar)
	{
		if ( $this->hasError() ) return false;

		$img = Image::make($avatar)->resize(500, null, function($constraint) {
			$constraint->aspectRatio();
		});

		$path = 'avatars/' . $avatar->hashName();

		if ( !Storage::put($path, $img->stream()->detach()) ) return false;

		// Delete the old profile picture in a job
		if ( $this->user->avatar ) {
			dispatch(new DeleteOldProfilePicture($this->user->avatar))->onQueue('media-queue');
		}

		try {
			$this->user->update([
				'avatar' => config('filesystems.disks.s3.bucket_link') . '/' . config('filesystems.disks.s3.bucket') . '/' . $path
			]);
		} catch ( \Exception $e ) {
			$this->setError('Could not update the users avatar.', 500);
			return false;
		}

		$this->setSuccess('Successfully updated the users avatar.', 200);

		return true;
	}

	/**
	 * Update the users password.
	 * 
	 * @param  array 	$data
	 * @return boolean
	 */
	public function updatePassword($data) 
	{
		if ( $this->hasError() ) return false;
		
		if ( !$this->setData($data)->oldPasswordMatch() ) return false;
		
		if ( !$this->editPassword() ) return false;

		$this->setSuccess('Successfully updated the password in storage.', 200);

		return true;
	}

	/**
	 * Update the resource in storage.
	 *
	 * @return boolean
	 */
	protected function editPassword()
	{
		try {
			$this->user->update([
				'password' => bcrypt($this->data('new'))
			]);
		} catch ( \Exception $e ) {
			$this->setError(['message' => 'Could not update the password in storage.'], 500);
			return false;
		}

		return true;
	}

	/**
	 * Is the old password entered correct?
	 *
	 * @return boolean
	 */
	protected function oldPasswordMatch()
	{
		if ( !Hash::check($this->data('old'), $this->user->password) ) {
			$this->setError(['old' => ['Det gamla lösenordet var ej korrekt.']] ,403);
			return false;
		}

		return true;
	}
}