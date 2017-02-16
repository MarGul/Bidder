<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    
    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
    	'name', 'description', 'parent', 'icon'
    ];

    /**
     * A category has many services.
     * 
     * @return Eloquent Relationship
     */
    public function services() {
    	return $this->hasMany('App\Service');
    }
    
    /**
     * A category may have many sub_categories
     * 
     * @return Eloquent Relationship
     */
    public function sub_categories() {
        return $this->hasMany('App\Category', 'parent');
    }

    /**
     * Parse the categories to add hypermedia links.
     * 
     * @param  Collection $categories [Collection of ]
     * @return void
     */
    public static function parseCategories($categories) {
        foreach ($categories as $category) {
            $category->view_category = [
                'href' => 'api/v1/categories/' . $category->id,
                'method' => 'GET'
            ];

            foreach ($category->sub_categories as $subcategory) {
                $subcategory->view_category = [
                    'href' => 'api/v1/categories/' . $subcategory->id,
                    'method' => 'GET'
                ];
            }
        }
    }

}
