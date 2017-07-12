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

}
