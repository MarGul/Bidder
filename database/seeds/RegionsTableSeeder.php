<?php

use Illuminate\Database\Seeder;
use App\Region;

class RegionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $regions = [
            ['name' => 'Skåne', 'slug' => 'skane', 'description' => '', 'active' => true],
            ['name' => 'Blekinge', 'slug' => 'blekinge', 'description' => ''],
            ['name' => 'Kronoberg', 'slug' => 'kronoberg', 'description' => ''],
            ['name' => 'Halland', 'slug' => 'halland', 'description' => ''],
            ['name' => 'Gotland', 'slug' => 'gotland', 'description' => ''],
            ['name' => 'Kalmar', 'slug' => 'kalmar', 'description' => ''],
            ['name' => 'Jönköping', 'slug' => 'jonkoping', 'description' => ''],
            ['name' => 'Älvsborg', 'slug' => 'alvsborg', 'description' => ''],
            ['name' => 'Göteborg', 'slug' => 'goteborg', 'description' => ''],
            ['name' => 'Östergötland', 'slug' => 'ostergotland', 'description' => ''],
            ['name' => 'Skaraborg', 'slug' => 'skaraborg', 'description' => ''],
            ['name' => 'Södermanland', 'slug' => 'sodermanland', 'description' => ''],
            ['name' => 'Stockholm', 'slug' => 'stockholm', 'description' => ''],
            ['name' => 'Uppsala', 'slug' => 'uppsala', 'description' => ''],
            ['name' => 'Västmanland', 'slug' => 'vastmanland', 'description' => ''],
            ['name' => 'Örebro', 'slug' => 'orebro', 'description' => ''],
            ['name' => 'Värmland', 'slug' => 'varmland', 'description' => ''],
            ['name' => 'Dalarna', 'slug' => 'dalarna', 'description' => ''],
            ['name' => 'Gävleborg', 'slug' => 'gavleborg', 'description' => ''],
            ['name' => 'Västernorrland', 'slug' => 'vasternorrland', 'description' => ''],
            ['name' => 'Jämtland', 'slug' => 'jamtland', 'description' => ''],
            ['name' => 'Västerbotten', 'slug' => 'vasterbotten', 'description' => ''],
            ['name' => 'Norrbotten', 'slug' => 'norrbotten', 'description' => ''],
        ];

        foreach ($regions as $region) {
            Region::create($region);
        }
    }
}
