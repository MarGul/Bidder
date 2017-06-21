<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Features\UserManager;

class EmailVerificationController extends Controller
{
    
	/**
     *  Class to manage users.
     * 
     * @var App\Features\UserManager
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
		if ( $this->manager->verifyEmail($code) ) {
			return redirect('email-verified');
		}

		return "Your email could not be verified";
	}

}
