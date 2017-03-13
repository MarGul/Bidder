<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes Bidder - Version 1
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'v1'], function() {

	/* Authentication Routes */
	Route::post('test')->uses('UserController@test')->middleware('auth:api');

	/* users/{user} */
	Route::resource('users', 'UserController', [
		'only' => ['store', 'show', 'update', 'destroy']
	]);

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

});