<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes Bidder - Version 1
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'v1'], function() {

	Route::get('users/{username}')->uses('UserProfileController@index');
	/* Update a users profile */
	Route::patch('users/{user}/profile')->uses('UserProfileController@update');
	/* Update a users avatar */
	Route::post('users/{user}/avatar')->uses('UserAvatarController@store');
	/* Update a users password */
	Route::put('users/{user}/password')->uses('UserPasswordController@update');
	/* Handle regions */
	Route::resource('regions', 'RegionController', ['only' => ['index', 'show']]);
	/* Handle categories */
	Route::resource('categories', 'CategoryController', ['only' => ['index', 'show']]);
	/* Handle services */
	Route::resource('services', 'ServiceController', ['except' => ['create', 'edit']]);
	/* Handle a services comments */
	Route::resource('services.comments', 'ServiceCommentController', ['except' => ['create', 'edit', 'show']]);
	/* Handle a services bids */
	Route::resource('services.bids', 'ServiceBidController', ['except' => ['create', 'edit']]);
	/* Accept a bid */
	Route::post('services/{service}/bids/{bid}/accept')->uses('ServiceBidAcceptController@create');
	/* Get a users services */
	Route::get('user/services')->uses('UserServicesController@index');
	/* Get a users bids */
	Route::get('user/bids')->uses('UserBidsController@index');
	/* Get a users projects */
	Route::resource('user.projects', 'UserProjectsController', ['only' => ['index']]);
	/* Create and show messages for a project */
	Route::resource('projects.messages', 'ProjectMessagesController', ['only' => ['index', 'store']]);
	/* Update a projects details */
	Route::patch('projects/{project}')->uses('ProjectController@update');
	/* Update a projects title */
	Route::put('projects/{project}/title')->uses('ProjectTitleController@update');
	/* Accept the start of a project */
	Route::post('projects/{project}/accept')->uses('ProjectAcceptController@store');
	/* Cancel a project */
	Route::post('projects/{project}/cancel')->uses('ProjectCancelController@store');
	/* Start a project */
	Route::put('projects/{project}/start')->uses('ProjectStartController@update');
	/* Complete a project */
	Route::put('projects/{project}/complete')->uses('ProjectCompleteController@update');
	/* Submit a review for a user */
	Route::post('users/{id}/review')->uses('UserReviewsController@store');
	/* Handle subscriptions */
	Route::resource('subscriptions', 'SubscriptionController', ['only' => ['index', 'store', 'destroy']]);

});