<?php
namespace App\Features;


use App\Contract;

class ContractManager
{
	/**
	 * Manager for handling the history records for a project.
	 * @var App\Features\ProjectHistoryManager
	 */
	protected 	$projectHistoryManager;
	/**
	 * Has the manager experienced any errors?
	 * @var boolean
	 */
	protected 	$error;
	/**
	 * The error response message.
	 * @var string
	 */
	public 		$errorMessage;
	/**
	 * The error status code.
	 * @var integer
	 */
	public 		$errorCode;
	/**
	 * The success response message.
	 * @var string
	 */
	public 		$successMessage;
	/**
	 * The success response code.
	 * @var integer
	 */
	public 		$successCode;
	/**
	 * The project that the manger is working with.
	 * @var App\Project
	 */
	protected 	$project;
	/**
	 * The user that the manager is working with.
	 * @var App\User
	 */
	protected 	$user;
	/**
	 * The contract that the manager is working with.
	 * @var App\Contract
	 */
	protected 	$contract;

	

	public function __construct(ProjectHistoryManager $projectHistoryManager)
	{
		$this->projectHistoryManager = $projectHistoryManager;
		$this->error = false;
	}

	/**
	 * Set the user that the manager should work with.
	 * 
	 * @param  App\User 	$user
	 * @return ContractManager
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
	 * Set the project that the manager should work with.
	 * 
	 * @param  App\Project 	$project
	 * @return ContractManager
	 */
	public function forProject($project)
	{
		if ( !$project instanceof \App\Project ) {
			$this->setError('Did not pass in a project instance.', 500);
		} else {
			$this->project = $project;
		}

		return $this;
	}

	public function forContract($contract)
	{
		if ( !$contract instanceof \App\Contract ) {
			$this->setError('Did not pass in a contract instance.', 500);
		} else {
			$this->contract = $contract;
		}

		return $this;
	}

	/**
	 * Does the manager have any errors?
	 * 
	 * @return boolean
	 */
	public function hasError()
	{
		return $this->error;
	}

	/**
	 * Get the added project history records.
	 * 
	 * @return array
	 */
	public function history()
	{
		return $this->projectHistoryManager->addedRecords();
	}

	/**
	 * Return the added contract.
	 * 
	 * @return mixed
	 */
	public function contract()
	{
		return $this->contract;
	}

	/**
	 * Create a new contract.
	 * 
	 * @param  array  	$data
	 * @return boolean
	 */
	public function create($data)
	{
		if ( $this->error ) return false;

		if ( $this->projectContractExists() ) return false;

		if ( $this->setData($data)->insert() ) {
			$this->projectHistoryManager->forProject($this->project->id)
										->add('updatedContract', ['user' => $this->user->username]);
		}

		return $this->error;
	}

	/**
	 * Update an existing contract.
	 * 
	 * @param  array 	$data
	 * @return boolean
	 */
	public function update($data)
	{
		if ( $this->error ) return false;

		if ( $this->setData($data)->edit() ) {
			$this->projectHistoryManager->forProject($this->contract->project_id)
										->add('updatedContract', ['user' => $this->user->username]);
		}

		return $this->error;
	}

	/**
	 * Insert the contract into storage.
	 * 
	 * @return void
	 */
	protected function insert()
	{
		try {
			$this->contract = Contract::create(array_merge(
				['project_id' => $this->project->id],
				$this->dataToArray()
			));	
		} catch (\Exception $e) {
			$this->setError('Could not insert the contract to storage.', 500);
			return false;;
		}

		$this->setSuccess('Successfully inserted the contract into storage.', 201);
		return true;
	}

	/**
	 * Update the contract into storage.
	 * 
	 * @return void
	 */
	protected function edit()
	{
		try {
			$this->contract->update($this->dataToArray());	
		} catch (\Exception $e) {
			$this->setError('Could not edit the contract to storage.', 500);
			return false;;
		}

		$this->setSuccess('Successfully updated the contract into storage.', 200);
		return true;
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
	 * Return the original data as an array ready for database.
	 * 
	 * @return array
	 */
	protected function dataToArray()
	{
		return [
			'client_name' => $this->originalData['client_name'],
            'client_identity' => $this->originalData['client_identity'],
            'contractor_name' => $this->originalData['contractor_name'], 
            'contractor_identity' => $this->originalData['contractor_identity'], 
            'project_description' => $this->originalData['project_description'],
            'contractor_dissuasion' => $this->originalData['contractor_dissuasion'], 
            'project_start' => $this->originalData['project_start'], 
            'project_end' => $this->originalData['project_end'], 
            'project_price' => (float)$this->originalData['project_price'],
            'project_price_specified' => $this->originalData['project_price_specified'],
            'payment_full' => (boolean)$this->originalData['payment_full'], 
            'payment_specified' => (boolean)$this->originalData['payment_specified'], 
            'other' => $this->originalData['other']
		];
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
	 * Does the project already have a contract?
	 * 
	 * @return boolean
	 */
	protected function projectContractExists()
	{
		$this->project->load('contracts');

		if ( $this->project->contracts->isNotEmpty() ) {
			$this->setError('Contract already exists.', 400);
			return true;
		}

		return false;
	}

}