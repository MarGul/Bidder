<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use App\Bid;

class BidsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bids = [
        	[
        		'service_id' => 1,
        		'user_id' => 2,
        		'description' => 'Ett bud',
        		'start' => Carbon::now('Europe/Stockholm')->addDays(5),
        		'end' => Carbon::now('Europe/Stockholm')->addDays(15),
        		'hours' => 12.0,
        		'price' => 1234.50,
        		'accepted' => false
        	],
        	[
        		'service_id' => 1,
        		'user_id' => 3,
        		'description' => 'Ett till bud',
        		'start' => Carbon::now('Europe/Stockholm')->addDays(7),
        		'end' => Carbon::now('Europe/Stockholm')->addDays(20),
        		'hours' => 16.0,
        		'price' => 1434.50,
        		'accepted' => false
        	]
        ];

        foreach ($bids as $bid) {
        	Bid::create($bid);
        }
    }
}
