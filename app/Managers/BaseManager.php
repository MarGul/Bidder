<?php
namespace App\Managers;


abstract class BaseManager
{
	/**
	 * Has the manager experienced any errors?
	 * @var boolean
	 */
	protected $error;
	/**
	 * The error response message.
	 * @var string
	 */
	protected $errorMessage;
	/**
	 * The error status code.
	 * @var integer
	 */
	protected $errorCode;
	/**
	 * The success response message.
	 * @var string
	 */
	protected $successMessage;
	/**
	 * The success response code.
	 * @var integer
	 */
	protected $successCode;
	/**
	 * The user that the manager is working with.
	 * @var App\User
	 */
	protected $user;
	/**
	 * The data that the manager is working with.
	 * @var array
	 */
	protected $originalData;

	/**
	 * Set the user that the manager should work with.
	 * 
	 * @param  App\User 	$user
	 * @return BaseManager
	 */
	public function byUser($user)
	{
		if ( !$user instanceof \App\User ) {
			$this->setError('Did not pass in a user instance.', 500);
		} else {
			$this->user = $user;
		}

		return $this;
	}

	/**
	 * Set the data that the manager is working with.
	 * 
	 * @param array 	$data
	 */
	protected function setData($data)
	{
		$this->originalData = $data;
		return $this;
	}

	/**
	 * Set the manager error state.
	 * 
	 * @param string 	$message
	 * @param integer 	$code
	 */
	protected function setError($message, $code)
	{
		$this->error = true;
		$this->errorMessage = $message;
		$this->errorCode = $code;
	}

	/**
	 * Set the manager success state.
	 * 
	 * @param string 	$message
	 * @param integer 	$code
	 */
	protected function setSuccess($message, $code)
	{
		$this->successMessage = $message;
		$this->successCode = $code;
	}

	/**
	 * The user that the manager has been working with
	 *
	 * @return void
	 */
	public function user() { return $this->user; }
	/**
	 * Does the manager have any errors?
	 * 
	 * @return boolean
	 */
	public function hasError() { return $this->error; }
	/**
	 * Get the error message for the manager.
	 * 
	 * @return string
	 */
	public function errorMessage() { return $this->errorMessage; }
	/**
	 * Get the error code for the manager.
	 * 
	 * @return integer
	 */
	public function errorCode() { return $this->errorCode; }
	/**
	 * Get the success message for the manager.
	 * 
	 * @return string
	 */
	public function successMessage() { return $this->successMessage; }
	/**
	 * Get the success code for the manager.
	 * 
	 * @return integer
	 */
	public function successCode() { return $this->successCode; }
	/**
	 * Get a data entry from the original data.
	 * @return mixed
	 */
	protected function data($key = null) { 
		if ( !is_null($key) ) {
			return $this->dataExists($key) ? $this->originalData[$key] : null;
		}

		return $this->originalData; 
	}
	/**
	 * Does a key exists in our data array?
	 * @param  string 	$key
	 * @return boolean
	 */
	protected function dataExists($key)
	{
		return isset($this->originalData[$key]);
	}
}