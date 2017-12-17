<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Managers\UserManager;

class EmailVerificationController extends Controller
{
    
	/**
     *  Class to manage users.
     * 
     * @var App\Managers\UserManager
     */
	private $manager;

	public function __construct(UserManager $manager) {
		$this->middleware('auth:api')->only('send');
		$this->manager = $manager;
	}

	/**
	 * Send out the email verification
	 *
	 * @param 	Request $request
	 * @return 	Illuminate\Http\Response
	 */
	public function send(Request $request)
	{
		// Try to sen the email verification.
		$this->manager->byUser($request->user())
					  ->sendEmailVerification();

		if ( $this->manager->hasError() ) {
			return response()->json(['message' => $this->manager->errorMessage()], $this->manager->errorCode());
		}

		return response()->json(['message' => $this->manager->successMessage()], $this->manager->successCode());
	}

	/**
	 * Verify the email
	 * 
	 * @param  string 	$code
	 * @return mixed
	 */
	public function verify($code)
	{
		// Try to verify the email.
		$this->manager->verifyEmail($code);

		if ( $this->manager->hasError() ) {
			return $this->manager->errorMessage();
		}

		return redirect('email-verified');
	}

}
