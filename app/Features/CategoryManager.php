<?php

namespace App\Features;

use App\Category;

class CategoryManager
{

	/**
	 * Database column key for active.
	 * @var string
	 */
	protected $activeKey = 'active';
	/**
	 * Database column key for parent.
	 * @var string
	 */
	protected $parentKey = 'parent';

	/**
	 * Get all active categories with their active subCategories.
	 * 
	 * @return collection
	 */
	public function getActive()
	{
		$categories = Category::with(['subCategories' => function($query) {
									$query->where($this->activeKey, true);
								}])
								->where($this->activeKey, true)
								->whereNull($this->parentKey)
								->get();

		return $categories;
	}

	/**
	 * Get the checklist items for each category.
	 * 
	 * @return array
	 */
	public function checklistItems()
	{
		$checklistItems = Category::with('checklistItems')
									->whereNotNull($this->parentKey)
									->where($this->activeKey, true)
									->get();

		return $this->parseChecklistItems($checklistItems);
	}

	/**
	 * Strip away the Category data for checklistItems and only return an array
	 * where the key is category_id and value is the collection of checklistItems.
	 * 
	 * @param  collection 	$checklistItems
	 * @return array
	 */
	protected function parseChecklistItems($checklistItems)
	{
		$parsed = [];
		foreach ($checklistItems as $item) {
			$parsed[$item->id] = $item->checklistItems;
		}
		return $parsed;
	}

}