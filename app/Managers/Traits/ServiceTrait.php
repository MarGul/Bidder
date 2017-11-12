<?php

namespace App\Managers\Traits;

trait ServiceTrait
{
    /**
     * The service that the manager is working with.
     * @var App\Service
     */
    protected $service;
    /**
     * The services that the manager is working with.
     * @var Collection
     */
    protected $services;

    /**
	 * Set the service that the manager is working with.
	 * 
	 * @param  App\Service 	$service
	 * @return ServiceTrait
	 */
	public function forService($service)
	{
		if ( !$service instanceof \App\Service ) {
			$this->setError('Service must be an instance of service.', 500);
		} else {
			$this->service = $service;
		}

		return $this;
    }
    
    /**
	 * Return the services that the manager has got.
	 * @return collection
	 */
	public function services() { return $this->services; }
	/**
	 * Return the service that the manager has worked on.
	 * @return App\Service
	 */
	public function service() { return $this->service; }
}