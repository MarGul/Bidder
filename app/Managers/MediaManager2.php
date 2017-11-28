<?php

namespace App\Managers;

use App\Managers\Traits\ServiceTrait;


class MediaManager2 extends BaseManager
{
	use ServiceTrait;


	public function addMedia(array $media)
	{

	}

	public function deleteMedia(array $mediaIds)
	{

	}

	public function editMedia(array $added, array $deleted)
	{
		$this->addMedia($added);

		$this->deleteMedia($deleted);
	}
}