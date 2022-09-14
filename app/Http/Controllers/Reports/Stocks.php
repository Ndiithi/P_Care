<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Services\SystemAuthorities;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class Stocks extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->expiryQuery = "select  sum(s.no_of_items) as  no_of_items,date(s.expiry_date) as expiry_date,  cat.name as name 
            from stocks s
            inner join catalogs cat on s.product_id = cat.product_id 
            where DATEDIFF(expiry_date , CURDATE()) BETWEEN 10 AND 30
            group by date(s.expiry_date),s.product_id, cat.name;";
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if (!Gate::allows(SystemAuthorities::$authorities['view_stocks_report'])) {
            return response()->json(['Message' => 'Not allowed to view stocks report: '], 500);
        }
        return view('interface/stocks/index');
    }

    public function getExpiry10_15(Request $request)
    {

        try {
            $sales = DB::select("      
                 $this->expiryQuery
            ");

            return $sales;
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Error during retrieving data' . $ex->getMessage()];
        }
    }
}
