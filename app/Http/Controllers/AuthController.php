<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

class AuthController extends Controller
{
    /**
     * The default Client for grant_type password.
     * @var Object
     */
	private $client;

	/**
	 * Get the client for our grant_type password.
	 */
	public function __construct() {
		// This controller should be throttled to protect against bruteforce.
		// Because we can't guarantee that the request comes from a trusted 
		// party maybe add some domain validation here?
		$this->client = DB::table('oauth_clients')->where('id', 2)->first();
	}

	/**
	 * Authenticate a user
	 * Take in the email and the password and redirect to oauth/token.
	 * We do this so that we don't expose the client_id and client_secret in
	 * or frontend SPA.
	 * 
	 * @param  Request $request [The incomming request]
	 * @return Redirect         [Redirect to oauth/token]
	 */
	public function authenticate(Request $request) {
		$this->validate($request, [
			'email' => 'required|email',
			'password' => 'required'
		]);

		$request->request->add([
			'username' => $request->email,
			'password' => $request->password,
			'grant_type' => 'password',
			'client_id' => $this->client->id,
			'client_secret' => $this->client->secret,
			'scope' => '*'
		]);

		$proxy = Request::create(
			'oauth/token',
			'POST'
		);

		return Route::dispatch($proxy);
	}

}
