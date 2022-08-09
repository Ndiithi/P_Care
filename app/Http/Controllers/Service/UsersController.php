<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Service\Utils as ServiceUtils;
use App\Role;
use App\Services\SystemAuthorities;
use App\User;
use App\UserAllowedRole;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('interface/users/index');
    }

    public function getUsers()
    {
        if (!Gate::allows(SystemAuthorities::$authorities['view_user'])) {
            return response()->json(['Message' => 'Not allowed to view users: '], 500);
        }
        $user = Auth::user();
        $utils = new ServiceUtils();
        
        $users = User::select(
            "users.name as first_name",
            "users.id as id",
            "users.last_name as last_name",
            "users.email as email",
            "roles.name as role_name",
        )->join('roles', 'roles.id', '=', 'users.role_id');


        $users = $users->get();

        $roleIds = array();
        $payload = array();
        return  $users;
    }

    public function getUsersDetails(Request $request)
    {
        if (!Gate::allows(SystemAuthorities::$authorities['view_user'])) {
            return response()->json(['Message' => 'Not allowed to view user: '], 500);
        }
        $userId = $request->id;
        Log::info("the id " . $userId);


        $users = User::select(
            "users.name as first_name",
            "users.id as id",
            "users.last_name as last_name",
            "users.email as email",
            "roles.name as role_name",
            "roles.id as role_id"
        )->join('roles', 'roles.id', '=', 'users.role_id')
            ->where('users.id', $userId)
            ->first();

        $allowedRoles = UserAllowedRole::select(
            "role_id"
        )->where('user_id', $userId)
            ->get();
        $allowedRoles =   $allowedRoles->pluck('role_id');

        $roleIds = array();
        $payload = array();
        $payload['demographics'] = $users;
        $payload['allowed_roles'] = $allowedRoles;

        return $payload;
    }

    public function deleteUser(Request $request)
    {
        if (!Gate::allows(SystemAuthorities::$authorities['delete_user'])) {
            return response()->json(['Message' => 'Not allowed to delete users: '], 500);
        }
        try {
            $user = User::find($request->user['id']);
            $user->delete();
            UserAllowedRole::where('user_id', $user->id)->delete();
            return response()->json(['Message' => 'Deleted successfully'], 200);
        } catch (Exception $ex) {
            return response()->json(['Message' => 'Delete failed.  Error code' . $ex->getMessage()], 500);
        }
    }

    public function userProfile()
    {
        return view('interface/users/profile');
    }

    public function getUserProfile()
    {

        $user = Auth::user();
        Log::info($user->role);
      

        return [
            "first_name" => $user->name,
            "last_name" => $user->last_name,
            "email" => $user->email,
            "role_name" => $user->role->name
        ];
    }


    public function updateUserProfile(Request $request)
    {

        try {

            $authUser = Auth::user();
            $user = User::find($authUser->id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->last_name = $request->last_name;

            if ($request->password != null) {
                $user->password = Hash::make($request->password);
            }
            $user->save();
            return response()->json(['Message' => 'Updated successfully'], 200);
        } catch (Exception $ex) {
            return response()->json(['Message' => 'Could not update profile: '  . $ex->getMessage()], 500);
        }
    }

    public function updateUser(Request $request)
    {
        if (!Gate::allows(SystemAuthorities::$authorities['edit_user'])) {
            return response()->json(['Message' => 'Not allowed to add users: '], 500);
        }
        try {
            $validatedData = $request->validate([
                'name' => 'required',
                'email'    => 'required',
                'role' => 'required',

            ]);
            $name = $request->name;
            $email    = $request->email;
            $password = $request->password;
            $role_id = $request->role;
            $lastName = $request->last_name;
            if (empty($lastName)) {
                $lastName = '';
            }

            //delete associations
            $user = User::find($request->user_id);
            $user->role()->dissociate();

            $role =  Role::find($role_id);

            $user->name = $name;
            $user->email = $email;
            $user->last_name = $lastName;

            if (!empty(trim($password))) {
                $user->password = Hash::make(trim($password));
            }

            $user->role()->associate($role);
            $user->save();

            // user_allowed_roles
            UserAllowedRole::where('user_id', $user->id)->delete();
            for ($x = 0; $x < count($request->selected_viewable_roles); $x++) {
                $userAllowedRole = new UserAllowedRole([
                    'user_id' => $user->id,
                    'role_id' => $request->selected_viewable_roles[$x],
                ]);
                $userAllowedRole->save();
            }

            return response()->json(['Message' => 'Updated successfully'], 200);
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Could not Updated user ' . $ex->getMessage()];
        }
    }
}
