<?php

namespace App\Providers;

use App\Services\SystemAuthorities;
use App\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

      
        Gate::define(SystemAuthorities::$authorities['edit_user'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['edit_user']);
        });
        Gate::define(SystemAuthorities::$authorities['edit_role'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['edit_role']);
        });
       
        Gate::define(SystemAuthorities::$authorities['delete_user'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['delete_user']);
        });
        Gate::define(SystemAuthorities::$authorities['delete_role'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['delete_role']);
        });
      
        Gate::define(SystemAuthorities::$authorities['add_user'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['add_user']);
        });
        Gate::define(SystemAuthorities::$authorities['add_role'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['add_role']);
        });
        
        Gate::define(SystemAuthorities::$authorities['view_system_settings'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_system_settings']);
        });
        Gate::define(SystemAuthorities::$authorities['view_reports'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_reports']);
        });
        Gate::define(SystemAuthorities::$authorities['view_dashboard'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_dashboard']);
        });
       
        Gate::define(SystemAuthorities::$authorities['view_user'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_user']);
        });
        Gate::define(SystemAuthorities::$authorities['view_role'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_role']);
        });
       
        Gate::define(SystemAuthorities::$authorities['view_roles_not_assigned'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_roles_not_assigned']);
        });
        Gate::define(SystemAuthorities::$authorities['view_pos_module'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_pos_module']);
        });
        Gate::define(SystemAuthorities::$authorities['view_sales_report'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_sales_report']);
        });
        Gate::define(SystemAuthorities::$authorities['view_purchases_report'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_purchases_report']);
        });
        Gate::define(SystemAuthorities::$authorities['view_stocks_report'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_stocks_report']);
        });
        Gate::define(SystemAuthorities::$authorities['view_datamining_module'], function ($user) {
            return $this->runAthurizationQuery(SystemAuthorities::$authorities['view_datamining_module']);
        });

        
    }

    private function runAthurizationQuery($authority)
    {
        $curUser = Auth::user();
        $user = User::select(
            "users.id as id"
        )->join('roles', 'roles.id', '=', 'users.role_id')
            ->join('authority_role', 'roles.id', '=', 'authority_role.role_id')
            ->join('authorities', 'authorities.id', '=', 'authority_role.authority_id')
            ->where('authorities.name', $authority)
            ->where('users.id', $curUser->id)
            ->get();
        if (count($user) != 0) {
            return true;
        } else {
            return false;
        }
    }
}
