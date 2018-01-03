<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ProjectsCompleted extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'projects:completed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mark projects that should be completed as completed.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $manager = app(\App\Managers\ProjectManager::class);

        $manager->completeProjects();

        return $manager->hasError();
    }
}
