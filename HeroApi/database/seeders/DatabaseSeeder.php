<?php

namespace Database\Seeders;

use App\Models\Users;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            PlanetSeeder::class,
            SquadSeeder::class,
            CitySeeder::class,
            SuperHeroSeeder::class,
            EnginTypeSeeder::class,
            EnginSeeder::class,
            SuperPowerSeeder::class,
            SuperPowerSuperHeroSeeder::class,
            GuideSeeder::class,
            GadgetSeeder::class,
        ]);
    }
}

class UserSeeder extends Seeder
{
    public function run()
    {
        for ($i = 0; $i < 5; $i++) {
            DB::table('users')->insert([
                'UserUuid' => ($uuid = Str::uuid()),
                'UserName' => 'User' . $i,
                'UserFirstName' => 'First' . $i,
                'UserPwd' => Hash::make('password123'),
                'UserMail' => 'user' . $i . '@example.com',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

class PlanetSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            DB::table('planet')->insert([
                'PlanetUuid' => Str::uuid(),
                'PlanetName' => 'Planet-' . $user->UserUuid,
                'UserUuid' => $user->UserUuid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}

class SquadSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            DB::table('squad')->insert([
                'SquadUuid' => Str::uuid(),
                'SquadName' => 'Squad-' . $user->UserUuid,
                'UserUuid' => $user->UserUuid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}

class CitySeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            DB::table('city')->insert([
                'CityUuid' => Str::uuid(),
                'CityName' => 'City-' . $user->UserUuid,
                'UserUuid' => $user->UserUuid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}

class SuperHeroSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            $planet = DB::table('planet')->where('UserUuid', $user->UserUuid)->first();
            $city = DB::table('city')->where('UserUuid', $user->UserUuid)->first();
            $squad = DB::table('squad')->where('UserUuid', $user->UserUuid)->first();

            DB::table('superHero')->insert([
                'SuperHeroUuid' => Str::uuid(),
                'SuperHeroname' => 'Hero-' . $user->UserUuid,
                'SuperHeroSex' => 'Male',
                'HomePlanetUuid' => $planet->PlanetUuid,
                'SuperHeroDescription' => 'A powerful hero.',
                'ProtectedCityUuid' => $city->CityUuid,
                'SquadUuid' => $squad->SquadUuid,
                'UserUuid' => $user->UserUuid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}

class SuperPowerSuperHeroSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            $superHero = DB::table('superHero')->where('UserUuid', $user->UserUuid)->first();
            $superPower = DB::table('superPower')->where('UserUuid', $user->UserUuid)->first();

            DB::table('superPower_superHero')->insert([
                'SuperHeroUuid' => $superHero->SuperHeroUuid,
                'SuperPowerUuid' => $superPower->SuperPowerUuid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}

class GuideSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            $superHero = DB::table('superHero')->where('UserUuid', $user->UserUuid)->first();

            DB::table('guide')->insert([
                'SuperHeroUuid' => $superHero->SuperHeroUuid,
                'UserUuid' => $user->UserUuid,
                'Weakness' => 'Unknown',
                'Strength' => 'Unknown',
                'Dengerousness' => rand(1, 10),
                'DestroyingPlan' => 'Unknown',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}
class EnginTypeSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            DB::table('enginType')->insert([
                'EnginTypeUuid' => Str::uuid(),
                'EnginTypeName' => 'Type-' . $user->UserUuid,
                'UserUuid' => $user->UserUuid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}
class EnginSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            $enginType = DB::table('enginType')->where('UserUuid', $user->UserUuid)->first();
            $superHero = DB::table('superHero')->where('UserUuid', $user->UserUuid)->first();

            DB::table('engin')->insert([
                'EnginTypeUuid' => $enginType->EnginTypeUuid,
                'SuperHeroUuid' => $superHero->SuperHeroUuid,
                'EnginName' => 'Engin-' . $user->UserUuid,
                'EnginDescription' => 'A powerful engin.',
                'UserUuid' => $user->UserUuid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}
class SuperPowerSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            DB::table('superPower')->insert([
                'SuperPowerUuid' => Str::uuid(),
                'SuperPowerName' => 'Power-' . $user->UserUuid,
                'SuperPowerDescription' => 'A unique ability.',
                'UserUuid' => $user->UserUuid,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}
class GadgetSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->get()->each(function ($user) {
            $superHero = DB::table('superHero')->where('UserUuid', $user->UserUuid)->first();

            DB::table('gadget')->insert([
                'GadgetUuid' => Str::uuid(),
                'SuperHeroUuid' => $superHero->SuperHeroUuid,
                'UserUuid' => $user->UserUuid,
                'GadgetName' => 'Gadget-' . $user->UserUuid,
                'GadgetDescription' => 'A special gadget.',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}
