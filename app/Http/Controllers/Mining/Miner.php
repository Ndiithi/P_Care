<?php

namespace App\Http\Controllers\Mining;

use App\Http\Controllers\Controller;
use App\Services\SystemAuthorities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class Miner extends Controller
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
        if (!Gate::allows(SystemAuthorities::$authorities['view_datamining_module'])) {
            return response()->json(['Message' => 'Not allowed to view miner module: '], 500);
        }
        return view('interface/mining/index');
    }

    public function predict(Request $request){
        $response = Http::get("http://miner:5000/forecast/$request->product_id/?periodspan=$request->periodspan&model=$request->model");
        return $response;
    }
}
