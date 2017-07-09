<?php
namespace App\Features;


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

}