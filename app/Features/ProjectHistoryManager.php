<?php

namespace App\Features;

use App\ProjectHistory;

class ProjectHistoryManager
{

	/**
	 * The different history entries.
	 * @var array
	 */
	protected $entries = [
		'created' => ['type' => 'info', 'action' => 'Projektet skapades.'],
		'updateDetails' => ['type' => 'warning', 'action' => '{user} uppdaterade projektets detaljer.']
	];

	
	/**
	 * Add a project history entry.
	 * 
	 * @param 	integer 	$projectId
	 * @param 	string 		$action
	 * @throws  Exception
	 * @return  boolean
	 */
	public function add($projectId, $action, $data = [])
	{
		if ( !$this->entries[$action] ) {
			throw new Exception('Not an allowed action.');
		}

		return $this->insert($projectId, $this->entries[$action]['type'], $this->action($action, $data));
	}

	/**
	 * Insert an history entry.
	 * 
	 * @param  integer 	$projectId
	 * @param  string 	$type
	 * @param  string 	$action
	 * @return boolean
	 */
	protected function insert($projectId, $type, $action)
	{
		$projectHistory = ProjectHistory::create([
							'project_id' => $projectId,
							'type' => $type,
							'action' => $action
						]);

		return $projectHistory->id ? $projectHistory : false;
	}

	/**
	 * Parse the action text if there are some placeholders that needs to be switched out.
	 * 
	 * @param  string 	$action
	 * @param  array 	$data
	 * @return string
	 */
	protected function action($action, $data)
	{
		if ( empty($data) ) return $this->entries[$action]['action'];

		$parsedAction = $this->entries[$action]['action'];
		foreach ($data as $key => $value) {
			$parsedAction = str_replace('{'.$key.'}', $value, $parsedAction);
		}

		return $parsedAction;
	}
}