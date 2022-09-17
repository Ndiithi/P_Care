<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            AuthoritiesSeed::class,
            Roles::class,
            UserSeed::class,
            PermissionRoleMaps::class,
            Dataseeder::class,
        ]);
    }
}
