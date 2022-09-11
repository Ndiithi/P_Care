<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Stock;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class StockController extends Controller
{
    public function saveProduct(Request $request)
    {

        try {
            Log::info("logging");
            $noOfItems = $request->noOfItems;
            $productId    = $request->productId;
            $expiryDate = $request->expiryDate;
            $date = date('Y-m-d H:i:s');


            $stock = new Stock([
                'no_of_items' => $noOfItems,
                'product_id' => $productId,
                'expiry_date' => $expiryDate,
                'date_purchased' => $date
            ]);
            $stock->save();

            return response()->json(['Message' => 'Saved successfully'], 200);
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Could not save product ' . $ex->getMessage()];
        }
    }


    public function getStocks()
    {

        $stocks = DB::select("      
        SELECT no_of_items, expiry_date, no_of_items, s.product_id,cat.name, t2.price,
        cat.manufacturer FROM stocks s
        inner join catalogs cat on s.product_id = cat.product_id 
        inner join (select distinct(a.product_id),a.price from prices a where from_date= (select max(from_date) 
        from prices b where a.product_id=b.product_id)) as t2
        on cat.product_id=t2.product_id
        ");

        return  $stocks;
    }
}
