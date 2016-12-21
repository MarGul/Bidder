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
        DB::table('regions')->insert(['name' => 'Skåne']);
        DB::table('regions')->insert(['name' => 'Blekinge']);
        DB::table('regions')->insert(['name' => 'Kronoberg']);
        DB::table('regions')->insert(['name' => 'Halland']);
        DB::table('regions')->insert(['name' => 'Gotland']);
        DB::table('regions')->insert(['name' => 'Kalmar']);
        DB::table('regions')->insert(['name' => 'Jönköping']);
        DB::table('regions')->insert(['name' => 'Älvsborg']);
        DB::table('regions')->insert(['name' => 'Göteborg']);
        DB::table('regions')->insert(['name' => 'Östergötland']);
        DB::table('regions')->insert(['name' => 'Skaraborg']);
        DB::table('regions')->insert(['name' => 'Södermanland']);
        DB::table('regions')->insert(['name' => 'Stockholm']);
        DB::table('regions')->insert(['name' => 'Uppsala']);
        DB::table('regions')->insert(['name' => 'Västmanland']);
        DB::table('regions')->insert(['name' => 'Örebro']);
        DB::table('regions')->insert(['name' => 'Värmland']);
        DB::table('regions')->insert(['name' => 'Dalarna']);
        DB::table('regions')->insert(['name' => 'Gävleborg']);
        DB::table('regions')->insert(['name' => 'Västernorrland']);
        DB::table('regions')->insert(['name' => 'Jämtland']);
        DB::table('regions')->insert(['name' => 'Västerbotten']);
        DB::table('regions')->insert(['name' => 'Norrbotten']);
    }
}
