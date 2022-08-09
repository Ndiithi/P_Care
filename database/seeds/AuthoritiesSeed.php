<?php

use Illuminate\Database\Seeder;
use App\Authority;

class AuthoritiesSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permmissions = array(
            array('name' => 'add_user', 'group' => 'user', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'edit_user', 'group' => 'user', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'delete_user', 'group' => 'user', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_user', 'group' => 'user', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'add_role', 'group' => 'role', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'delete_role', 'group' => 'role', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'edit_role', 'group' => 'role', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_role', 'group' => 'role', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_system_settings', 'group' => 'system', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_reports', 'group' => 'system', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_dashboard', 'group' => 'system', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_roles_not_assigned', 'group' => 'role', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_sales_report', 'group' => 'report', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_stocks_report', 'group' => 'report', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_purchases_report', 'group' => 'report', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            array('name' => 'view_datamining_module', 'group' => 'report', 'created_at' => new \dateTime, 'updated_at' => new \dateTime),
            
        );
        $authObj = new Authority();
        Authority::query()->truncate();
        $authObj->insert($permmissions);
        // $authObj->save();
    }
}
