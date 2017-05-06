<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes Bidder - Version 1
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'v1'], function() {

	/* users/{user} */
	Route::resource('users', 'UserController', [
		'only' => ['store', 'show', 'update', 'destroy']
	]);

	/* users/{user}/profile */
	Route::patch('users/{user}/profile', 'UserProfileController@update');

	/* users/{user}/password */
	Route::put('users/{user}/password', 'UserPasswordController@update');

	/* regions/{region} */
	Route::resource('regions', 'RegionController', [
		'only' => ['index', 'show']
	]);

	/* regions/{region}/services */
	Route::resource('regions.services', 'RegionServiceController', [
		'only' => ['index']
	]);

	/* categories/{category} */
	Route::resource('categories', 'CategoryController', [
		'only' => ['index', 'show']
	]);

	/* categories/{category}/services */
	Route::resource('categories.services', 'CategoryServiceController', [
		'only' => ['index']
	]);

	/* services/{service} */
	Route::resource('services', 'ServiceController', [
		'except' => ['create', 'edit']
	]);

	/* services/{service}/comments/{comment} */
	Route::resource('services.comments', 'ServiceCommentController', [
		'except' => ['create', 'edit', 'show']
	]);

	/* services/{service}/bids/{bid} */
	Route::resource('services.bids', 'ServiceBidController', [
		'except' => ['create', 'edit']
	]);

	/* Accept a bid */
	Route::post('services/{service}/bids/{bid}/accept')->uses('ServiceBidAcceptController@create');

	/* user/services */
	Route::get('user/services')->uses('UserServicesController@index');

	/* user/bids */
	Route::get('user/bids')->uses('UserBidsController@index');

	Route::resource('user.projects', 'UserProjectsController', ['only' => ['index']]);

});