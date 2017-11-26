<?php

namespace App\Managers;

use App\Region;


class RegionManager extends BaseManager
{

    /**
     * The regions that the manager has been working with.
     *
     * @var Collection
     */
    protected $regions;

    
    /**
     * Return the regions that the manager has been working with.
     *
     * @return void
     */
    public function regions() { return $this->regions; }
    
    /**
     * Fetch all the active regions.
     *
     * @return void
     */
    public function active()
    {
        try {
            $this->regions = Region::where('active', true)->get();
        } catch ( \Exception $e ) {
            $this->setError('Could not fetch the active regions.', 500);
            return $this;
        }

        $this->setSuccess('Displaying a listing of all active regions.', 200);

        return $this;
    }

    /**
     * Load in the active cities for the regions.
     *
     * @return void
     */
    public function withCities()
    {
        if ( $this->hasError() ) return false;

        try {
            $this->regions->load(['cities' => function($query) {
                $query->where('active', true);
                $query->orderBy('sort', 'asc');
            }]);
        } catch ( \Exception $e ) {
            $this->setError('Could not fetch the active regions.', 500);
            return false;
        }

        return true;
    }
}