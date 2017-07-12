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
    protected $files;

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
    public function __construct($files, Service $service)
    {
        $this->files = $files;
        $this->service = $service;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->files as $file) {
            if ( Storage::disk('local')->exists($file['path']) ) {
                if ( !app(MediaManager::class)->storeServiceFile($file, $this->service) ) return false;
            }
        }
        
        return true;
    }

}
