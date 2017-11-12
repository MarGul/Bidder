<?php
namespace App\Features;


use App\Contract;
use App\Managers\Traits\ProjectTrait;

class ContractManager extends BaseManager
{
	use ProjectTrait;
	
	/**
	 * The contract that the manager is working with.
	 * @var App\Contract
	 */
	protected 	$contract;


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
	 * Return the added contract.
	 * 
	 * @return mixed
	 */
	public function contract() { return $this->contract; }

	/**
	 * Create a new contract.
	 * 
	 * @param  array  	$data
	 * @return boolean
	 */
	public function create($data)
	{
		if ( $this->hasError() ) return false;

		if ( $this->projectContractExists() ) return false;

		if ( $this->setData($data)->insert() ) {
			$this->projectHistoryManager->forProject($this->project->id)
										->add('updatedContract', ['user' => $this->user->username]);
		}

		return $this->hasError();
	}

	/**
	 * Update an existing contract.
	 * 
	 * @param  array 	$data
	 * @return boolean
	 */
	public function update($data)
	{
		if ( $this->hasError() ) return false;

		if ( $this->setData($data)->edit() ) {
			$this->projectHistoryManager->forProject($this->contract->project_id)
										->add('updatedContract', ['user' => $this->user->username]);
		}

		return $this->hasError();
	}

	/**
	 * Insert the contract into storage.
	 * 
	 * @return boolean
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
	 * @return boolean
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