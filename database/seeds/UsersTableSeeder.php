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
                'username' => 'MarGul',
                'email' => 'gullbeerg@gmail.com',
                'password' => bcrypt('tester'),
                'name' => 'Marcus Gullberg',
                'avatar' => 'https://avatars0.githubusercontent.com/u/11759765?v=3&s=460',
                'email_verified' => true
            ],
            [
                'username' => 'Musk',
                'email' => 'elon@spacex.com',
                'password' => bcrypt('tester'),
                'name' => 'Elon Musk',
                'avatar' => 'https://lh3.googleusercontent.com/lviuiKeKp3sfoMWnVyxkkM6WFvetT7XOMwH0qoZMDRmLChh_skg',
                'email_verified' => true
            ],
            [
                'username' => 'PThiel',
                'email' => 'peter@paypal.com',
                'password' => bcrypt('tester'),
                'name' => 'Pieter Thiel',
                'avatar' => 'http://static4.businessinsider.com/image/552568d2ecad04377e91955f-480/peter-thiel.jpg',
                'email_verified' => true
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
