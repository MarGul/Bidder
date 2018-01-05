<?php
namespace App\Managers;


use App\Contract;
use PDF;
use App\Managers\Traits\ProjectTrait;
use Notification;
use App\Notifications\ProjectContractUpdated;

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
		if ( $this->hasError() || $this->projectContractExists() ) return false;

		if ( !$this->setData($data)->insert() )  return false;

		$this->projectHistoryManager->forProject($this->project->id)
									->add('updatedContract', ['user' => $this->user->username]);

		// Send out notification to other users that the contract has been updated.
		Notification::send($this->otherUsers(), new ProjectContractUpdated(
			$this->project, $this->contract, $this->history()
		));

		$this->setSuccess('Successfully inserted the contract into storage.', 201);

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

		if ( !$this->setData($data)->edit() ) return false;
			
		$this->projectHistoryManager->forProject($this->project->id)
									->add('updatedContract', ['user' => $this->user->username]);

		// Send out notification to other users that the contract has been updated.
		Notification::send($this->otherUsers(), new ProjectContractUpdated(
			$this->project, $this->contract, $this->history()
		));
		
		$this->setSuccess('Successfully updated the contract into storage.', 200);

		return $this->hasError();
	}

	/**
	 * Download the contract for a project.
	 * 
	 * @return PDF view
	 */
	public function download()
	{
		$data = $this->projectContractExists() ? $this->contractData() : []; 

		return PDF::loadView('pdf.contract', $data)->download("AvtalProjectId{$this->project->id}.pdf");
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
			return false;
		}
		
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
	 * Get the data from the contract in storage.
	 * 
	 * @return array
	 */
	protected function contractData()
	{
		return [
			'client_name' => $this->contract->client_name,
            'client_identity' => $this->contract->client_identity,
            'contractor_name' => $this->contract->contractor_name, 
            'contractor_identity' => $this->contract->contractor_identity, 
            'project_description' => $this->contract->project_description,
            'contractor_dissuasion' => $this->contract->contractor_dissuasion, 
            'project_start' => $this->contract->project_start, 
            'project_end' => $this->contract->project_end, 
            'project_price' => (float)$this->contract->project_price,
            'project_price_specified' => $this->contract->project_price_specified,
            'payment_full' => (boolean)$this->contract->payment_full, 
            'payment_specified' => (boolean)$this->contract->payment_specified, 
            'other' => $this->contract->other
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
			$this->contract = $this->project->contracts->first();
			return true;
		}

		return false;
	}

}