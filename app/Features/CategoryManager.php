<?php

namespace App\Features;

use App\Category;

class CategoryManager
{

	/**
	 * Get the checklist items for each category.
	 * 
	 * @return array
	 */
	public function checklistItems()
	{
		$checklistItems = Category::with('checklistItems')
									->whereNotNull('parent')
									->where('active', true)
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