<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RegionsTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(CitiesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ServicesTableSeeder::class);
        $this->call(BidsTableSeeder::class);
        $this->call(ChecklistItemsTableSeeder::class);
    }
}
