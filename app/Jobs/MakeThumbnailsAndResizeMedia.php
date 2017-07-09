<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class MakeThumbnailsAndResizeMedia implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    
    /**
     * The temp filepaths of files to process.
     * 
     * @var array
     */
    protected $filesPaths;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($filePaths)
    {
        $this->filePaths = $filePaths;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
    }
}
