<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Stock;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StockController extends Controller
{
    public function saveProduct(Request $request)
    {

        try {
            Log::info("logging");
            $noOfItems = $request->noOfItems;
            $productId    = $request->productId;
            $batchNumber = $request->batchNumber;
            $expiryDate = $request->expiryDate;
            $date = date('Y-m-d H:i:s');


            $stock = new Stock([
                'no_of_items' => $noOfItems,
                'product_id' => $productId,
                'batch_number' => $batchNumber,
                'expiry_date' => $expiryDate,
                'date_purchased' => $date
            ]);
            $stock->save();

            return response()->json(['Message' => 'Saved successfully'], 200);
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Could not save product ' . $ex->getMessage()];
        }
    }
}
