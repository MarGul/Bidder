<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectHistory extends Model
{
    /**
     * The models tablename.
     * @var string
     */
	protected $table = 'project_history';
    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = ['project_id', 'type', 'action', 'message'];


    /**
     * A project history entry belongs to a project. 
     * 
     * @return Eloquent Relationship
     */
    public function project()
    {
    	return $this->belongsTo('App\Project');
    }
}
