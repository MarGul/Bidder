<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Project;
use Carbon\Carbon;
use App\Features\ProjectManager;

class CompleteProjects extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'projects:complete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Find projects that are finished and mark them as completed and perform the logic with completing a project.';

    /**
     * The project manager
     * 
     * @var ProjectManager
     */
    protected $manager;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(ProjectManager $manager)
    {
        parent::__construct();

        $this->manager = $manager;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $projects = Project::where([ ['started', true], ['completed', false], ['finish' , '<', Carbon::now('Europe/Stockholm')] ])->get();

        if ( $projects->isEmpty() ) {
            $this->line('No projects to complete');
        } else {
            $projects->each(function($project) {
                if ( $this->manager->complete($project) ) {
                    $this->info('Completed project with id: ' . $project->id);
                } else {
                    $this->error('Could not complete project with id: ' . $project->id);
                }
            });
        }
    }
}
