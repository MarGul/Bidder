<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes Bidder - Version 1
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'v1'], function() {

	Route::post('send-email-verification')->uses('Auth\EmailVerificationController@send');
	/* Get a user profile */
	Route::get('users/{username}')->uses('UserProfileController@index');
	/* Handle services */
	Route::resource('services', 'ServiceController', ['only' => ['index', 'show']]);
	/* Handle a services comments */
	Route::resource('services.comments', 'ServiceCommentController', ['except' => ['create', 'edit', 'show']]);
	/* Handle a services bids */
	Route::resource('services.bids', 'ServiceBidController', ['only' => ['index', 'store']]);
	/* Accept a bid */
	Route::post('bids/{bid}/accept')->uses('BidAcceptController@create');
	/* A users services */
	Route::resource('user/services', 'UserServicesController', ['except' => ['create']]);
	

	/** 
	 * Handle Categories
	 */
	Route::get('categories')->uses('CategoryController@index');
	Route::get('checklist-items')->uses('ChecklistItemsController@index');

	/**
	 * Handle Regions
	 */
	Route::get('regions')->uses('RegionController@index');

	/**
	 * Handle users
	 */
	Route::get('users/{user}/email')->uses('UserEmailController@index');
	Route::patch('users/{user}/profile')->uses('UserProfileController@update');
	Route::post('users/{user}/avatar')->uses('UserAvatarController@store');
	Route::put('users/{user}/password')->uses('UserPasswordController@update');

	/**
	 * Handle the users notifications
	 */
	Route::get('user/notifications')->uses('UserNotificationsController@index');
	Route::patch('user/notifications/{notification}/mark-as-read')->uses('UserNotificationsController@update');
	Route::patch('user/notifications/mark-all-read')->uses('UserNotificationsController@destoy');

	/**
	 * Handle the users notification settings
	 */
	Route::get('user/notification-settings')->uses('UserNotificationSettingsController@index');
	Route::patch('user/notification-settings')->uses('UserNotificationSettingsController@update');
	
	/**
	 * Handle the users bids
	 */
	Route::get('user/bids')->uses('UserBidsController@index');
	Route::get('user/bids/{bid}')->uses('UserBidsController@show');
	Route::delete('user/bids/{bid}')->uses('UserBidsController@destroy');
	
	/**
	 * Handle Projects
	 */
	Route::get('user/projects')->uses('UserProjectsController@index');
	Route::get('user/projects/{project}')->uses('UserProjectsController@show');
	Route::post('projects/{project}/messages')->uses('ProjectMessagesController@store');
	Route::patch('projects/{project}/details')->uses('ProjectDetailsController@update');
	Route::put('projects/{project}/title')->uses('ProjectTitleController@update');
	Route::put('projects/{project}/use-contract')->uses('ProjectUseContractController@update');
	Route::delete('projects/{project}/use-contract')->uses('ProjectUseContractController@destroy');
	Route::put('projects/{project}/accept')->uses('ProjectAcceptController@update');
	Route::put('projects/{project}/cancel')->uses('ProjectCancelController@update');
	Route::put('projects/{project}/complete')->uses('ProjectCompleteController@update');
	
	/**
	 * Handle Reviews
	 */
	Route::post('reviews')->uses('ReviewsController@store');
	
	/**
	 * Handle contracts
	 */
	Route::post('contracts')->uses('ContractsController@store');
	Route::patch('contracts/{contract}')->uses('ContractsController@update');
	Route::put('contracts/{contract}/accept')->uses('ContractsAcceptController@update');
	
	/**
	 * Handle subscriptions
	 */
	Route::get('subscriptions')->uses('SubscriptionsController@index');
	Route::post('subscriptions')->uses('SubscriptionsController@store');
	Route::delete('subscriptions/{subscription}')->uses('SubscriptionsController@destroy');
	
	/**
	 * Handle invoices and payments
	 */
	Route::get('invoices')->uses('UserInvoicesController@index');
	Route::post('payments/stripe')->uses('PaymentStripeController@store');
	Route::post('payments/invoice')->uses('PaymentInvoiceController@store');

	
});