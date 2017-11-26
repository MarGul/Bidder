<?php

use Illuminate\Database\Seeder;
use App\Service;
use Carbon\Carbon;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $services = [
            [
                'user_id' => 1,
                'category_id' => 5,
                'region_id' => 1,
                'city_id' => 1,
                'title' => 'This is the first test service that I need help with',
                'description' => 'This is the first test service that I need help with description',
                'start' => Carbon::now(new DateTimeZone('Europe/Stockholm')),
                'end' => Carbon::now(new DateTimeZone('Europe/Stockholm'))->addWeeks(4),
                'bid_start' => Carbon::now(new DateTimeZone('Europe/Stockholm')),
                'bid_stop' => Carbon::now(new DateTimeZone('Europe/Stockholm'))->addWeeks(2),
                'active' => true
            ],
            [
                'user_id' => 2,
                'category_id' => 3,
                'region_id' => 1,
                'city_id' => 1,
                'title' => 'This is the second test service that I need help with',
                'description' => 'This is the second test service that I need help with description',
                'start' => Carbon::now(new DateTimeZone('Europe/Stockholm')),
                'end' => Carbon::now(new DateTimeZone('Europe/Stockholm'))->addWeeks(4),
                'bid_start' => Carbon::now(new DateTimeZone('Europe/Stockholm')),
                'bid_stop' => Carbon::now(new DateTimeZone('Europe/Stockholm'))->addWeeks(2),
                'active' => true
            ],
            [
                'user_id' => 2,
                'category_id' => 10,
                'region_id' => 1,
                'city_id' => 1,
                'title' => 'This is the third test service that I need help with',
                'description' => 'This is the third test service that I need help with description',
                'start' => Carbon::now(new DateTimeZone('Europe/Stockholm')),
                'end' => Carbon::now(new DateTimeZone('Europe/Stockholm'))->addWeeks(4),
                'bid_start' => Carbon::now(new DateTimeZone('Europe/Stockholm')),
                'bid_stop' => Carbon::now(new DateTimeZone('Europe/Stockholm'))->addWeeks(2),
                'active' => true
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
