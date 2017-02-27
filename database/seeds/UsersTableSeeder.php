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
                'username' => 'first',
                'email' => 'first@tester.com',
                'password' => 'tester',
                'name' => 'First Tester',
            ],
            [
                'username' => 'second',
                'email' => 'second@tester.com',
                'password' => 'tester',
                'name' => 'Second Tester',
            ]
        ];

        foreach ($users as $user) {
            User::create([
                'username' => $user['username'],
                'email' => $user['email'],
                'password' => bcrypt($user['password']),
                'name' => $user['name']
            ]);
        }
    }
}
