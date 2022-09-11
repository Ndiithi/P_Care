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

        try {
            $itemsSold = [];
            foreach ($request->sales as $key => $item) {
                $productId    = $item['product_id'];
                $batchNo = $item['batch_no'];
                $date = date('Y-m-d H:i:s');

                if (array_key_exists($productId."::".$batchNo, $itemsSold)) {
                    $noSold = $itemsSold[$productId."::".$batchNo];
                    $noSold += 1;
                    $itemsSold[$productId."::".$batchNo] = $noSold;
                } else {

                    $itemsSold[$productId."::".$batchNo] = 1;
                }

                $stock = new Sale([
                    'product_id' => $productId,
                    'batch_no'=> $batchNo,
                    'date_purchased' => $date
                ]);
                $stock->save();
            }

            foreach ($itemsSold as $key => $item) {
                $keys= explode("::",$key );
                Log::info($keys);
                Log::info($keys[0]);
                Log::info($keys[1]);
                DB::update("      
                    UPDATE stocks
                    SET no_of_items  = no_of_items - $item  where product_id = '$keys[0]' and batch_no = '$keys[1]'
                ");
            }

            return response()->json(['Message' => 'Saved successfully'], 200);
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Error during saving' . $ex->getMessage()];
        }
    }
}
