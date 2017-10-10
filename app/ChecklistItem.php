<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChecklistItem extends Model
{
    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = ['category_id', 'checklist_item_id'];

    /**
     * Disable timestamps on the model.
     * 
     * @var boolean
     */
    public $timestamps = false;

    /**
     * A checklist item may belong to many categories through a many-to-many relationship
     * 
     * @return Eloquent Relationship
     */
    public function categories()
    {
    	return $this->belongsToMany('App\Category');
    }
}
