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
                'avatar' => 'https://avatars0.githubusercontent.com/u/11759765?v=3&s=460'
            ],
            [
                'username' => 'Musk',
                'email' => 'elon@spacex.com',
                'password' => bcrypt('tester'),
                'name' => 'Elon Musk',
                'avatar' => 'https://lh3.googleusercontent.com/lviuiKeKp3sfoMWnVyxkkM6WFvetT7XOMwH0qoZMDRmLChh_skg'
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
