<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Services\SystemAuthorities;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class Purchases extends Controller
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
        if (!Gate::allows(SystemAuthorities::$authorities['view_purchases_report'])) {
            return response()->json(['Message' => 'Not allowed to view purchases report: '], 500);
        }
        return view('interface/purchases/index');
    }


    public function getPurchase(Request $request)
    {

        try {
            $sales = DB::select("      
            select  sum(s.no_of_items) as  no_of_items,date(s.date_purchased) as date_purchased,  cat.name as name 
            from stocks s
            inner join catalogs cat on s.product_id = cat.product_id 
            group by date(s.date_purchased),s.product_id, cat.name;
        ");

            return $sales;
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Error during retrieving data' . $ex->getMessage()];
        }
    }
}
