<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Storage;

class DeleteOldProfilePicture implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The full address to the old picture
     * 
     * @var string
     */
    protected $old;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($old)
    {
        $this->old = $old;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $old = str_replace(env('AWS_BUCKET_LINK') . '/' . env('AWS_BUCKET') . '/', '', $this->old);

        return Storage::delete($old);
    }

    /**
     * The job failed to process.
     *
     * @param  Exception  $exception
     * @return void
     */
    public function failed(Exception $exception)
    {
        // Log that an job has failed.
    }
}
