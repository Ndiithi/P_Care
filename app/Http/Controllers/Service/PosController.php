<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Sale;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PosController extends Controller
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
        return view('interface/pos/index');
    }

    public function saveSales(Request $request)
    {
        if(sizeof($request->sales)==0){
            return response()->json(['Message' => 'No data for saving'], 200);
        }
        try {
            // $itemsSold = [];
            foreach ($request->sales as $key => $item) {
                $productId    = $item['product_id'];
                $quantity = $item['quantity'];
                $batchNo = $item['batch_no'];
                $date = date('Y-m-d H:i:s');

                $stock = new Sale([
                    'product_id' => $productId,
                    'batch_no' => $batchNo,
                    'date_purchased' => $date,
                    'quantity' => $quantity
                ]);
                $stock->save();

                DB::update("      
                UPDATE stocks
                SET no_of_items  = no_of_items - $quantity  where product_id = '$productId' and batch_no = '$batchNo'
            ");
            }

            return response()->json(['Message' => 'Saved successfully'], 200);
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Error during saving' . $ex->getMessage()];
        }
    }
}
