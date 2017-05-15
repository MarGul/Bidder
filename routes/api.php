<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes Bidder - Version 1
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'v1'], function() {

	/* Handle users */
	Route::resource('users', 'UserController', ['only' => ['store', 'show', 'update', 'destroy']]);
	/* Update a users profile */
	Route::patch('users/{user}/profile', 'UserProfileController@update');
	/* Update a users password */
	Route::put('users/{user}/password', 'UserPasswordController@update');
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
	/* Update a projects title */
	Route::put('projects/{project}/title')->uses('ProjectTitleController@update');

});