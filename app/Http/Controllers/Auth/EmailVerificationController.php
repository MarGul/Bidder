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
		$this->manager = $manager;
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
