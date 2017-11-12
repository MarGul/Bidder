<?php

namespace App\Managers\Traits;

use App\Managers\ProjectHistoryManager;

trait ProjectTrait
{
    /**
	 * The project that the manager will be working with.
	 * @var App\Project
	 */
    protected $project;
    /**
     * The projects that the manager will be working with.
     * @var Collection
     */
    protected $projects;
	/**
	 * ProjectHistoryManager instance.
	 * @var App\Managers\ProjectHistoryManager
	 */
    protected $projectHistoryManager;
	
	
	public function __construct(ProjectHistoryManager $projectHistoryManager)
	{
        $this->projectHistoryManager = $projectHistoryManager;
    }
	
	/**
	 * Set the project that the manager is working on.
	 * 
	 * @param  App\Project 	$project
	 * @return ProjectTrait
	 */
	public function forProject($project)
	{
		if ( !$project instanceof \App\Project ) {
			$this->setError('Project must be an instance of project.', 500);
		} else {
			$this->project = $project;
		}

		return $this;
	}

	/**
	 * Return the project that the manager has been working on.
	 *
	 * @return App\Project
	 */
	public function project() { return $this->project; }
	/**
	 * Return the projects that the manager has been working on.
	 *
	 * @return Collection
	 */
	public function projects() { return $this->projects; }
	/**
	 * Return the added project history records.
	 *
	 * @return array
	 */
	public function history() { return $this->projectHistoryManager->addedRecords(); }
}