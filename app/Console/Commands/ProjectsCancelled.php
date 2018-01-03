<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ProjectsCancelled extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'projects:cancelled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mark projects as cancelled where the accept time has run out.';

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

        $manager->cancelProjects();

        return $manager->hasError();
    }
}
