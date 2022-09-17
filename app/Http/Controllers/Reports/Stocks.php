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
        $this->expiryQuery = 
            "SELECT sum(s.no_of_items) no_of_items,  pur.expiry_date, s.batch_no, cat.name 
            FROM stocks s
            inner join catalogs cat on s.product_id = cat.product_id 
            inner join purchases pur on s.product_id = pur.product_id  and pur.batch_no=s.batch_no 
            where DATEDIFF(expiry_date , CURDATE()) BETWEEN %d AND %d
            group by  cat.product_id, s.batch_no, pur.expiry_date, cat.name";
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
        $query = sprintf($this->expiryQuery, 10, 15);
        try {
            $stock = DB::select("      
                $query 
            ");

            return $stock;
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Error during retrieving data' . $ex->getMessage()];
        }
    }

    public function getExpiry15_20(Request $request)
    {
        $query = sprintf($this->expiryQuery, 15, 20);
        try {
            $data = DB::select("      
            $query 
            ");
            return $data;
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Error during retrieving data' . $ex->getMessage()];
        }
    }

    public function getStock(Request $request)
    {
        try {
            $data = DB::select("      
            SELECT sum(s.no_of_items) no_of_items, pur.date_purchased, pur.expiry_date, s.batch_no, cat.name 
            FROM stocks s
            inner join catalogs cat on s.product_id = cat.product_id 
            inner join purchases pur on s.product_id = pur.product_id  and pur.batch_no=s.batch_no 
            where s.no_of_items>0
            group by pur.date_purchased, cat.product_id, s.batch_no, pur.expiry_date, cat.name 
            ");
            return $data;
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Error during retrieving data' . $ex->getMessage()];
        }
    }
}
