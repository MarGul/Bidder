<?php

namespace App\Managers\Traits;

trait BidTrait
{
    /**
     * The bid that the manager is working with.
     * @var App\Bid
     */
    protected $bid;
    /**
     * The bids that the manager is working with.
     * @var Collection
     */
    protected $bids;
    
    /**
	 * Set the bid that the manager is working with.
	 * 
	 * @param  App\Bid 	$bid
	 * @return BidTrait
	 */
	public function forBid($bid)
	{
		if ( !$bid instanceof \App\Bid ) {
			$this->setError('Bid must be an instance of bid.', 500);
		} else {
			$this->bid = $bid;
		}

		return $this;
	}

	/**
	 * Return the bid that the manager has been working on.
	 * 
	 * @return App\Bid
	 */
	public function bid() { return $this->bid; }
	
	/**
	 * Return the bids that the manager has been working on.
	 * 
	 * @return Collection
	 */
	public function bids() { return $this->bids; }
}