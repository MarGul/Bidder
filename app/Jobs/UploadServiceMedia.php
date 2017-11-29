<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Managers\MediaManager2;

class UploadServiceMedia implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    /**
     * Data structure for the media and it's corresponding temp file
     * @var array
     */
    protected $files;
    /**
     * The Media manager
     *
     * @var MediaManager2
     */
    protected $manager;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($files)
    {
        $this->files = $files;
        $this->manager = app(MediaManager2::class);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->files as $file) {
            $this->manager->uploadTempFile($file);
        }
        
        return true;
    }

}
