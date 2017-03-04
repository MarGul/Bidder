<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'displayname' => 'first',
                'email' => 'first@tester.com',
                'password' => bcrypt('tester'),
                'name' => 'First Tester',
            ],
            [
                'displayname' => 'second',
                'email' => 'second@tester.com',
                'password' => bcrypt('tester'),
                'name' => 'Second Tester',
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
