<?php

use App\Notifications\NewBidOnMyService;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Some authentication routes are handled directly by the server. The rest 
| we redirect to the index and let our VueJS Single Page Application
| handle all of the routing.
*/


/**
 * Auth Routes
 * ===========
 */
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');
Route::post('register', 'Auth\RegisterController@register')->name('auth.register');
Route::get('email-verify/{code}', 'Auth\EmailVerificationController@verify');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.request');

/**
 * Download Routes
 * ===============
 */
Route::get('download-invoice/{hash}', 'InvoiceController@index')->name('download.invoice');
Route::get('projects/{project}/download-contract', 'ProjectDownloadContractController@index')->name('download.contract');

/**
 * Landing Pages
 * =============
 */
Route::get('skapa-tjanst-flytthjalp', 'CreateServiceLandingPage@index')->name('landingpages.create-service');

/**
 * SPA Application
 * ===============
 */
Route::any('{all}', function () {
    return view('index');
})->where(['all' => '.*']);