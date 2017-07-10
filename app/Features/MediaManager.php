<?php
namespace App\Features;

use App\Media;
use Image;
use Storage;
use File;
use Carbon\Carbon;


class MediaManager {

	
	/**
	 * Temporarily store uploaded files in local storage.
	 * 
	 * @param  array 	$files
	 * @return array
	 */
	public function tempStore($files)
	{
		$paths = [];
		foreach ($files as $file) {
			$paths[] = $file->store('tmp', 'local');
		}

		return $paths;
	}

	/**
	 * Delete a local file
	 * 
	 * @param  string 	$path
	 * @return boolean
	 */
	public function deleteLocalFile($path)
	{
		return Storage::disk('local')->delete($path);
	}

	/**
	 * Store a service file
	 * 
	 * @param  string 		$path    [local tmp path]
	 * @param  App\Serivce 	$service
	 * @return boolean
	 */
	public function storeServiceFile($path, $service)
    {
         $mime = Storage::disk('local')->mimeType($path);
         $size = Storage::disk('local')->size($path);
         $options = ['mime' => $mime, 'size' => $size];

        if ( !str_contains($mime, 'image/') ) {
           	if ( !app(MediaManager::class)->processServiceFile($path, $service, $options) ) return false;
        } else {
            if ( !app(MediaManager::class)->processServiceImage($path, $service, $options) ) return false;
        }

        return $this->deleteLocalFile($path);
    }

    /**
     * Store other files except images.
     * 
     * @param  string 		$path    	[local tmp path]
     * @param  App\Service 	$service
     * @param  array 		$options
     * @return boolean
     */
    public function processServiceFile($path, $service, $options)
    {
    	$filePath = 'media/files/' . Carbon::now()->format('Ym') . '/' . File::basename(storage_path($path));

    	if ( !Storage::put($filePath, Storage::disk('local')->get($path)) ) return false;

    	return $this->storeMedia(null, $filePath, $service, $options);
    }

    /**
     * Store an image for a service. This create a thumb, reiszes the image, uploades it to cloud storage,
     * deletes the local tmp file and stores all references in the database.
     * 
     * @param  string 			$path    	[local tmp path]
     * @param  App\Service 		$service
     * @param  array 			$options
     * @return boolean
     */
    public function processServiceImage($path, $service, $options = [])
    {
    	$thumbPath = $this->createThumbAndUpload($path);
        $imagePath = $this->resizeImageAndUpload($path);

        return $this->storeMedia($thumbPath, $imagePath, $service, $options);
    }

    /**
     * Create a thumbnail of an image and upload to cloud storage. Return the storage path.
     * 
     * @param  string 	$path 	[local tmp path]
     * @return string       	[Cloud storage path]
     */
    public function createThumbAndUpload($path)
    {
        $thumb = Image::make(storage_path('app/' . $path))->resize(250, 250, function($constraint) {
            $constraint->aspectRatio();
        });

        $thumbPath = 'media/thumbs/' . Carbon::now()->format('Ym') . '/' . 'thumb_' . File::basename(storage_path($path));

        if ( !Storage::put($thumbPath, $thumb->stream()->detach()) ) return false;

        return $thumbPath;
    }

    /**
     * Resize the image if we have to and upload to cloud storage.
     * 
     * @param  string 	$path 	[local tmp path]
     * @return string       	[Cloud storage path]
     */
    public function resizeImageAndUpload($path)
    {
        $img = Image::make(storage_path('app/' . $path))->resize(1500, null, function($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $imgPath = 'media/images/' . Carbon::now()->format('Ym') . '/' . File::basename(storage_path($path));

        if ( !Storage::put($imgPath, $img->stream()->detach()) ) return false;

        return $imgPath;
    }

    /**
     * Store the service image in the database.
     * 
     * @param  string 		$thumb
     * @param  string 		$file
     * @param  App\Service  $service
     * @param  array  		$options
     * @return boolean
     */
    public function storeMedia($thumb, $file, $service, $options = [])
    {
    	$cloudUrl = env('AWS_BUCKET_LINK') . '/' . env('AWS_BUCKET') . '/';

    	$media = new Media([
    		'service_id' => $service->id,
    		'media_url' => $cloudUrl . $file,
    		'thumb_url' => !is_null($thumb) ? $cloudUrl . $thumb : null,
    		'mime_type' => $options['mime'],
    		'size' => $options['size']
    	]);

    	return $media->save();
    }

}