<?php
namespace App\Managers;

use App\Media;
use Image;
use Storage;
use File;
use Carbon\Carbon;


class MediaManager extends BaseManager
{

	
	/**
	 * Temporarily store uploaded files in local storage.
	 * 
	 * @param  array 	$files
	 * @return array
	 */
	public function tempStore($files)
	{
		$data = [];
		foreach ($files as $file) {
			$data[] = [
                'originalName' => $file->getClientOriginalName(),
                'path' => $file->store('tmp', 'local')
            ];
		}

		return $data;
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
	 * @param  array 		$file    [original filename and local tmp path]
	 * @param  App\Serivce 	$service
	 * @return boolean
	 */
	public function storeServiceFile($file, $service)
    {
         $mime = Storage::disk('local')->mimeType($file['path']);
         $size = Storage::disk('local')->size($file['path']);
         $options = ['mime' => $mime, 'size' => $size];

        if ( !str_contains($mime, 'image/') ) {
           	if ( !$this->processServiceFile($file, $service, $options) ) return false;
        } else {
            if ( !$this->processServiceImage($file, $service, $options) ) return false;
        }

        return $this->deleteLocalFile($file['path']);
    }

    /**
     * Store other files except images.
     * 
     * @param  array 		$file    	[local tmp path]
     * @param  App\Service 	$service
     * @param  array 		$options
     * @return boolean
     */
    public function processServiceFile($file, $service, $options)
    {
    	$filePath = 'media/files/' . Carbon::now()->format('Ym') . '/' . File::basename(storage_path($file['path']));

    	if ( !Storage::put($filePath, Storage::disk('local')->get($file['path'])) ) return false;

    	return $this->storeMedia($file, null, $filePath, $service, $options);
    }

    /**
     * Store an image for a service. This create a thumb, reiszes the image, uploades it to cloud storage,
     * deletes the local tmp file and stores all references in the database.
     * 
     * @param  array 			$file    	[original filename and local tmp path]
     * @param  App\Service 		$service
     * @param  array 			$options
     * @return boolean
     */
    public function processServiceImage($file, $service, $options = [])
    {
    	$thumbPath = $this->createThumbAndUpload($file);
        $imagePath = $this->resizeImageAndUpload($file);

        return $this->storeMedia($file, $thumbPath, $imagePath, $service, $options);
    }

    /**
     * Create a thumbnail of an image and upload to cloud storage. Return the storage path.
     * 
     * @param  array 	$file 	[original filename and local tmp path]
     * @return string       	[Cloud storage path]
     */
    public function createThumbAndUpload($file)
    {
        $thumb = Image::make(storage_path('app/' . $file['path']))->resize(250, 250, function($constraint) {
            $constraint->aspectRatio();
        });

        $thumbPath = 'media/thumbs/' . Carbon::now()->format('Ym') . '/' . 'thumb_' . File::basename(storage_path($file['path']));

        if ( !Storage::put($thumbPath, $thumb->stream()->detach()) ) return false;

        return $thumbPath;
    }

    /**
     * Resize the image if we have to and upload to cloud storage.
     * 
     * @param  array 	$path 	[original filename and local tmp path]
     * @return string       	[Cloud storage path]
     */
    public function resizeImageAndUpload($file)
    {
        $img = Image::make(storage_path('app/' . $file['path']))->resize(1500, null, function($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $imgPath = 'media/images/' . Carbon::now()->format('Ym') . '/' . File::basename(storage_path($file['path']));

        if ( !Storage::put($imgPath, $img->stream()->detach()) ) return false;

        return $imgPath;
    }

    /**
     * Store the service image in the database.
     *
     * @param  array        $file       [original filename and local tmp path]
     * @param  string 		$thumb
     * @param  string 		$file
     * @param  App\Service  $service
     * @param  array  		$options
     * @return boolean
     */
    public function storeMedia($file, $thumbPath, $filePath, $service, $options = [])
    {
    	$cloudUrl = config('amazon.bucket_link') . '/' . config('amazon.bucket') . '/';

    	$media = new Media([
    		'service_id' => $service->id,
    		'original_filename' => $file['originalName'],
            'media_url' => $cloudUrl . $filePath,
    		'thumb_url' => !is_null($thumbPath) ? $cloudUrl . $thumbPath : null,
    		'mime_type' => $options['mime'],
    		'size' => $options['size']
    	]);

    	return $media->save();
    }

}