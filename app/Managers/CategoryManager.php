<?php

namespace App\Managers;

use App\Category;

class CategoryManager extends BaseManager
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
	 * The categories that the manager has been working with.
	 * @var Collection
	 */
	protected $categories;
	/**
	 * The category checklist items that the manager has been working on.
	 * @var Collection
	 */
	protected $checklistItems;

	/**
	 * Return the categories that the manager has worked on.
	 * 
	 * @return Collection
	 */
	public function categories() { return $this->categories; }

	public function checklistItems() { return $this->checklistItems; }

	/**
	 * Get all active categories with their active subCategories.
	 * 
	 * @return boolean
	 */
	public function parents()
	{
		try {
			$this->categories = Category::with(['subCategories' => function($query) {
											$query->where($this->activeKey, true);
										}])
										->where($this->activeKey, true)
										->whereNull($this->parentKey)
										->get();
		} catch (\Exception $e) {
			$this->setError('Could not fetch the categories.', 500);
			return false;
		}

		$this->setSuccess('Listing active categories', 200);

		return true;
	}

	/**
	 * Get the checklist items for each category.
	 * 
	 * @return boolean
	 */
	public function getChecklistItems($parse = true)
	{
		try {
			$this->checklistItems = Category::with('checklistItems')
											->whereNotNull($this->parentKey)
											->where($this->activeKey, true)
											->get();

			if ( $parse ) $this->parseChecklistItems();

		} catch (\Exception $e) {
			$this->setError('Could not fetcg the checklist items.', 500);
			return false;
		}

		$this->setSuccess('Listing the category checklist items.', 200);

		return true;
	}

	/**
	 * Strip away the Category data for checklistItems and only return an array
	 * where the key is category_id and value is the collection of checklistItems.
	 * 
	 * @return array
	 */
	protected function parseChecklistItems()
	{
		$parsed = [];
		foreach ($this->checklistItems as $item) {
			$parsed[$item->id] = $item->checklistItems;
		}
		
		$this->checklistItems = $parsed;
	}

}