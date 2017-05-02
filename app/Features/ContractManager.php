<?php

namespace App\Features;

use App\Contract;

class ContractManager {

	/**
	 * Create a contract
	 * 
	 * @param  array $data 	[The data for the contract]
	 * @return boolean
	 */
	public function create($data) {
		$contract = new Contract($data);

		return ($contract->save()) ? true : false;
	}

}