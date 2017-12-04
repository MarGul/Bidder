<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    
	/**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'service_id', 'original_filename', 'media_url', 'thumb_url', 'mime_type', 'size'
    ];

    /**
     * When parsing this model to an array
     * 
     * @return array
     */
    public function toArray()
    {
    	return [
    		'service_id' => $this->service_id,
    		'original_filename' => $this->original_filename,
    		'media_url' => config('filesystems.disks.s3.bucket_link') . '/' . config('filesystems.disks.s3.bucket') . '/' . $this->media_url,
    		'thumb_url' => config('filesystems.disks.s3.bucket_link') . '/' . config('filesystems.disks.s3.bucket') . '/' . $this->thumb_url,
    		'mime_type' => $this->mime_type,
    		'size' => $this->size
    	];
    }

}
