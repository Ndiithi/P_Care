<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Log;

class SystemAuthorities
{
    public static $authorities = [
        'view_pt_report' => 'view_pt_report',
        'view_log_book_report' => 'view_log_book_report',
        'edit_user' => 'edit_user',
        'view_user' => 'view_user',
        'view_role' => 'view_role',
        'edit_role' => 'edit_role',
        'delete_user' => 'delete_user',
        'delete_role' => 'delete_role',
        'add_user' => 'add_user',
        'add_role' => 'add_role',
        'view_system_settings' => 'view_system_settings',
        'view_reports' => 'view_reports',
        'view_dashboard' => 'view_dashboard',
        'data_backup' => 'data_backup',
        'view_spi_report' => 'view_spi_report',
        'view_roles_not_assigned' => 'view_roles_not_assigned',
        'view_pos_module' => 'view_pos_module',
        'view_sales_report' => 'view_sales_report',
        'view_stocks_report' => 'view_stocks_report',
        'view_purchases_report' => 'view_purchases_report',
        'view_datamining_module' => 'view_datamining_module',
        'view_catalog' => 'view_catalog',
        'view_pos' => 'view_pos',
        'view_product_group'=>'view_product_group'
    ];
}
