<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Purchase;
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
            $batchNo = $request->batchNo;

            $date = date('Y-m-d H:i:s');

            $stock = Stock::where('product_id', '=', $productId)->where('batch_no', '=', $batchNo)->first();
            if ($stock === null) {
                $stock = new Stock([
                    'no_of_items' => $noOfItems,
                    'product_id' => $productId,
                    'batch_no' => $batchNo
                ]);
                $stock->save();
            } else {
                DB::update("      
                    UPDATE stocks
                    SET no_of_items  = no_of_items + $noOfItems  where product_id = '$productId' and batch_no = '$batchNo'
                ");
            }

            $purchase = Purchase::where('product_id', '=', $productId)
                ->where('date_purchased', '=', date('Y-m-d'))
                ->where('expiry_date', '=', $expiryDate)
                ->where('batch_no', '=', $batchNo)->first();

            if ($purchase != null) {
                DB::update("      
                        UPDATE purchases
                        SET no_of_items  = no_of_items + $noOfItems  where product_id = '$productId' and batch_no = '$batchNo'
                    ");
            } else {
                $purchase = new Purchase([
                    'no_of_items' => $noOfItems,
                    'product_id' => $productId,
                    'expiry_date' => $expiryDate,
                    'date_purchased' => $date,
                    'batch_no' => $batchNo
                ]);
                $purchase->save();
            }

            return response()->json(['Message' => 'Saved successfully'], 200);
            
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Could not save product ' . $ex->getMessage()];
        }
    }


    public function getStocks()
    {

        $stocks = DB::select("      
        SELECT s.no_of_items, pur.expiry_date, s.product_id,s.batch_no,cat.name, t2.price,
        cat.manufacturer FROM stocks s
        inner join catalogs cat on s.product_id = cat.product_id 
        inner join (select product_id, batch_no, expiry_date from purchases pur group by product_id, batch_no, expiry_date) pur on s.product_id = pur.product_id  and pur.batch_no=s.batch_no
        inner join (select distinct(a.product_id),a.price from prices a where from_date= (select max(from_date) 
        from prices b where a.product_id=b.product_id)) as t2
        on cat.product_id=t2.product_id
        where no_of_items>0        
        ");


        return  $stocks;
    }
}
