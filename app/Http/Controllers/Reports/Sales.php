<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Services\SystemAuthorities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class Sales extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if (!Gate::allows(SystemAuthorities::$authorities['view_sales_report'])) {
            return response()->json(['Message' => 'Not allowed to view sales report: '], 500);
        }
        return view('interface/sales/index');
    }
}
