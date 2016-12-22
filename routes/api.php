<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes Bidder - Version 1
|--------------------------------------------------------------------------
*/

Route::group(['prefix' => 'v1'], function() {

	Route::resource('regions', 'RegionController', [
		'only' => ['index', 'show']
	]);

	Route::resource('categories', 'CategoryController', [
		'only' => ['index', 'show']
	]);

	Route::resource('services', 'ServiceController', [
		'except' => ['create', 'edit']
	]);

});