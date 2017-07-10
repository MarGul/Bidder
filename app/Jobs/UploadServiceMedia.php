<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Service;
use App\Features\MediaManager;
use Storage;

class UploadServiceMedia implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    
    /**
     * The temp filepaths of files to process.
     * 
     * @var array
     */
    protected $filePaths;

    /**
     * The service that the media belongs to.
     * 
     * @var App\Service;
     */
    protected $service;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($filePaths, Service $service)
    {
        $this->filePaths = $filePaths;
        $this->service = $service;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->filePaths as $path) {
            if ( Storage::disk('local')->exists($path) ) {
                if ( !app(MediaManager::class)->storeServiceFile($path, $this->service) ) return false;
            }
        }
        
        return true;
    }

}
