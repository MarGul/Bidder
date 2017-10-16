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
		'created' => ['type' => 'info', 'action' => 'Projektet skapades.']
	];

	
	/**
	 * Add a project history entry.
	 * 
	 * @param 	integer 	$projectId
	 * @param 	string 		$action
	 * @throws  Exception
	 * @return  boolean
	 */
	public function add($projectId, $action)
	{
		if ( !$this->entries[$action] ) {
			throw new Exception('Not an allowed action.');
		}

		return $this->insert($projectId, $this->entries[$action]['type'], $this->entries[$action]['action']);
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

		return $projectHistory->id ? true : false;
	}
}