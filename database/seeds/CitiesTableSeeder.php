<?php

use Illuminate\Database\Seeder;
use App\City;
use App\Region;

class CitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            'Skåne' => [
                [
                    'slug' => 'helsingborg',
                    'name' => 'Helsingborg',
                    'description' => ''
                ],
                [
                    'slug' => 'angelholm',
                    'name' => 'Ängelholm',
                    'description' => ''
                ],
                [
                    'slug' => 'malmo',
                    'name' => 'Malmö',
                    'description' => ''
                ],
                [
                    'slug' => 'kristianstad',
                    'name' => 'Kristianstad',
                    'description' => ''
                ],
                [
                    'slug' => 'landskrona',
                    'name' => 'Landskrona',
                    'description' => ''
                ],
                [
                    'slug' => 'lund',
                    'name' => 'Lund',
                    'description' => ''
                ],
                [
                    'slug' => 'trelleborg',
                    'name' => 'Trelleborg',
                    'description' => ''
                ],
                [
                    'slug' => 'ystad',
                    'name' => 'Ystad',
                    'description' => ''
                ],
                [
                    'slug' => 'simrishamn',
                    'name' => 'Simrishamn',
                    'description' => ''
                ],
                [
                    'slug' => 'eslov',
                    'name' => 'Eslöv',
                    'description' => ''
                ],
                [
                    'slug' => 'hoor',
                    'name' => 'Höör',
                    'description' => ''
                ],
                [
                    'slug' => 'horby',
                    'name' => 'Hörby',
                    'description' => ''
                ],
                [
                    'slug' => 'hassleholm',
                    'name' => 'Hässleholm',
                    'description' => ''
                ],
                [
                    'slug' => 'osby',
                    'name' => 'Osby',
                    'description' => ''
                ],
                [
                    'slug' => 'klippan',
                    'name' => 'Klippan',
                    'description' => ''
                ],
                [
                    'slug' => 'bastad',
                    'name' => 'Båstad',
                    'description' => ''
                ]
            ],
            'Blekinge'=> [
                [
                    'slug' => 'karlskrona',
                    'name' => 'Karlskrona',
                    'description' => ''
                ],
                [
                    'slug' => 'solvesborg',
                    'name' => 'Sölvesborg',
                    'description' => ''
                ],
                [
                    'slug' => 'olofstrom',
                    'name' => 'Olofström',
                    'description' => ''
                ],
                [
                    'slug' => 'karlshamn',
                    'name' => 'Karlshamn',
                    'description' => ''
                ],
                [
                    'slug' => 'ronneby',
                    'name' => 'Ronneby',
                    'description' => ''
                ]
            ],
            'Kronoberg' => [],
            'Halland' => [],
            'Gotland' => [],
            'Kalmar' => [],
            'Jönköping' => [],
            'Älvsborg' => [],
            'Göteborg' => [],
            'Östergötland' => [],
            'Skaraborg' => [],
            'Södermanland' => [],
            'Stockholm' => [],
            'Uppsala' => [],
            'Västmanland' => [],
            'Örebro' => [],
            'Värmland' => [],
            'Dalarna' => [],
            'Gävleborg' => [],
            'Västernorrland' => [],
            'Jämtland' => [],
            'Västerbotten' => [],
            'Norrbotten' => [],
        ];

        foreach ($data as $region => $cities) {
            
            $region = Region::where('name', $region)->first();

            foreach ($cities as $index => $city) {
                City::create([
                    'slug' => $city['slug'],
                    'region_id' => $region->id,
                    'name' => $city['name'],
                    'description' => $city['description'],
                    'sort' => ($index * 10)
                ]);
            }
        }
        
    }
}
