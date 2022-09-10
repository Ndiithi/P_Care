<?php

namespace App\Http\Controllers\Service;

use App\Catalog;
use App\Http\Controllers\Controller;
use App\Price;
use Exception;
use Illuminate\Http\Request;

class CatalogController extends Controller
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
        return view('interface/catalog/index');
    }

    public function saveProduct(Request $request)
    {
        // if (!Gate::allows(SystemAuthorities::$authorities['edit_user'])) {
        //     return response()->json(['Message' => 'Not allowed to add users: '], 500);
        // }
        try {
            // $validatedData = $request->validate([
            //     'name' => 'required',
            //     'email'    => 'required',
            //     'role' => 'required',

            // ]);

            $name = $request->name;
            $manufacturer    = $request->manufacturer;
            $price = $request->price;
            $productID = $request->productID;
            $date = date('Y-m-d H:i:s');


            $catalog = new Catalog([
                'product_id' => $productID,
                'name' => $name,
                'manufacturer' => $manufacturer,

            ]);
            $catalog->save();

            $price = new Price([
                'product_id' => $productID,
                'price' => $price,
                'from_date' => $date,

            ]);
            $price->save();


            return response()->json(['Message' => 'Saved successfully'], 200);
        } catch (Exception $ex) {
            return ['Error' => '500', 'Message' => 'Could not Updated user ' . $ex->getMessage()];
        }
    }
}
