<?php

namespace App\Managers;

use App\Managers\Traits\ServiceTrait;
use App\Media;
use File;
use Image;
use Storage;
use Carbon\Carbon;
use App\Jobs\UploadServiceMedia;


class MediaManager2 extends BaseManager
{
	use ServiceTrait;

	/**
	 * The base path for a file in cloud storage.
	 * @var string
	 */
	protected $fileBasePath = 'media/files/';
	/**
	 * The base path for thumbnails in cloud storage.
	 * @var string
	 */
	protected $thumbBasePath = 'media/thumbs/';
	/**
	 * The base base for images in cloud storage.
	 * @var string
	 */
	protected $imageBasePath = 'media/images/';
	/**
	 * The file under processing by the manager.
	 * @var Illuminate\Http\UploadedFile
	 */
	protected $file;
	/**
	 * The structure for files for the UploadJob when uploading to S3
	 * @var array
	 */
	protected $filesForUploadJob;
	/**
	 * The media that the manager is working with.
	 * @var App\Media
	 */
	protected $media;

	
	/**
	 * Add new media.
	 * 
	 * @param array $files
	 */
	public function addMedia(array $files)
	{
		foreach ($files as $file) {
			$this->file = $file;

			$this->insertFileToStorage();

			$this->prepareForFileUploadJob();
		}

		dispatch(new UploadServiceMedia($this->filesForUploadJob))->onQueue('media-queue');
	}

	public function deleteMedia(array $mediaIds)
	{

	}

	public function editMedia(array $added, array $deleted)
	{
		$this->addMedia($added);

		$this->deleteMedia($deleted);
	}

	/**
	 * Upload the temporarly stored file to Cloud storage.
	 * 
	 * @param  array 	$file 	[has the media_id and tmp_path as keys]
	 * @return [type]       	[description]
	 */
	public function uploadTempFile($file)
	{
		$this->media = Media::findOrFail($file['media_id']);

		// Lets set the tmp_path to be in the correct storage location
		$tmp_path = storage_path('app/' . $file['tmp_path']);
		// If it's an image we should create a thumbnail for the media and upload it.
		$thumb_url = $this->isImage() ? $this->createThumbAndUpload($tmp_path) : null;
		// If the media is an image we should resize it before we upload it.
		$media_url = $this->isImage() ? $this->resizeImageAndUpload($tmp_path) : $this->uploadFile($tmp_path);
		// Delete the temp file
		$this->deleteTempFile($tmp_path);		
		// Now update the media object with the uploaded media url's
		return $this->updateMediaInStorage($media_url, $thumb_url);
	}

	/**
	 * Insert the media into storage.
	 * 
	 * @return boolean
	 */
	protected function insertFileToStorage()
	{
		try {
			$this->media = Media::create([
				'service_id' => $this->service->id,
				'original_filename' => $this->file->getClientOriginalName(),
				'mime_type' => $this->file->getClientMimeType(),
				'size' => $this->file->getClientSize()
			]);
		} catch (\Exception $e) {
			$this->setError('Could not insert the media into storage.', 500);
			return false;
		}

		return true;
	}

	/**
	 * Update the media in storage with the new cloud storage paths.
	 * 
	 * @param  string 	$media_url
	 * @param  string 	$thumb_url
	 * @return boolean
	 */
	protected function updateMediaInStorage($media_url, $thumb_url)
	{
		// If there has been any errors we shouldn't bother to update the storage.
		if ( $this->hasError() ) throw new \Exception($this->errorMessage());

		try {
			$this->media->update([
				'media_url' => $media_url,
				'thumb_url' => $thumb_url
			]);
		} catch (\Exception $e) {
			$this->setError('Could not update the media in storage for media_id: ' . $this->media->id . '. Exception ' . $e, 500);
			return false;
		}

		return true;
	}

	/**
	 * Upload a file to cloud storage. Everything that is not an image.
	 * 
	 * @param  string 	$tmp_path
	 * @return string 				[Cloud storage path]
	 */
	protected function uploadFile($tmp_path)
	{
		try {
			$filePath = $this->fileBasePath . Carbon::now()->format('Ym') . '/' . File::basename($tmp_path);

			Storage::put($filePath, fopen($tmp_path, 'r+'));
		} catch (\Exception $e) {
			$this->setError('Could not upload file to cloud storage for media_id: ' . $this->media->id . '. Exception: ' . $e, 500);
			return null;
		}

		return $filePath;
	}

	/**
	 * Create a thumbnail from an image and upload it to Cloud storage.
	 * 
	 * @param  string 	$tmp_path
	 * @return string 				[Cloud storage path]
	 */
	protected function createThumbAndUpload($tmp_path)
	{
		try {
			$thumb = Image::make($tmp_path)->resize(250, 250, function($constraint) {
	            $constraint->aspectRatio();
	        });

	        $thumbPath = $this->thumbBasePath . Carbon::now()->format('Ym') . '/' . 'thumb_' . File::basename($tmp_path);

			Storage::put($thumbPath, $thumb->stream()->detach());
		} catch (\Exception $e) {
			$this->setError('Could not create and upload thumbnail for media_id: ' . $this->media->id . '. Exception: ' . $e, 500);
			return null;
		}

        return $thumbPath;
	}

	/**
     * Resize the image and upload to cloud storage.
     * 
     * @param  string 	$tmp_path
     * @return string       		[Cloud storage path]
     */
    protected function resizeImageAndUpload($tmp_path)
    {
        try {
        	$img = Image::make($tmp_path)->resize(1500, null, function($constraint) {
	            $constraint->aspectRatio();
	            $constraint->upsize();
	        });

	        $imgPath = $this->imageBasePath . Carbon::now()->format('Ym') . '/' . File::basename($tmp_path);

			Storage::put($imgPath, $img->stream()->detach());
        } catch (\Exception $e) {
        	$this->setError('Could not resize and upload the image for media_id: ' . $this->media->id . '. Exception: ' . $e, 500);
        	return null;
        }

        return $imgPath;
    }

	/**
	 * Delete a file in temporary storage.
	 *
	 * @param 	string $path
	 * @return 	void
	 */
	protected function deleteTempFile($path)
	{
		unlink($path);
	}
	
	/**
	 * Prepare the media that has been inserted for the UploadJob.
	 * Media files is getting uploaded to Cloud storage in a seperate job.
	 * 
	 * @return void
	 */
	protected function prepareForFileUploadJob()
	{
		$this->filesForUploadJob[] = [
			'media_id' => $this->media->id,
			'tmp_path' => $this->file->store('tmp', 'local')
		];
	}

    /**
     * Is the media that the manager is processing an image?
     * 
     * @return boolean
     */
    protected function isImage()
    {
    	return str_contains($this->media->mime_type, 'image');
    }
}