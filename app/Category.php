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
    	'slug', 'name', 'description', 'parent', 'checklist_description', 'active'
    ];

    /**
     * Disable timestamps on the model.
     * 
     * @var boolean
     */
    public $timestamps = false;

    /**
     * A category has many services.
     * 
     * @return Eloquent Relationship
     */
    public function services() {
    	return $this->hasMany('App\Service');
    }
    
    /**
     * A category may have many sub categories
     * 
     * @return Eloquent Relationship
     */
    public function subCategories() 
    {
        return $this->hasMany('App\Category', 'parent');
    }

    /**
     * A category may have many checklist items through a many-to-many relationship
     * 
     * @return Eloquent Relationship
     */
    public function checklistItems()
    {
        return $this->belongsToMany('App\ChecklistItem');
    }

}
