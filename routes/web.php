<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth/login');
});

Auth::routes(['register' => false]);
//Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//Reports
Route::get('/reports/sales', 'Reports\Sales@index')->name('salesReportIndex');
Route::get('/reports/purchases', 'Reports\Purchases@index')->name('purchasesReportIndex');
Route::get('/reports/stocks', 'Reports\Stocks@index')->name('stocksReportIndex');
Route::get('/reports/mining', 'Mining\Miner@index')->name('miningIndex');


//Services
Route::get('/service/profile', 'Service\UsersController@userProfile')->name('profile');
Route::get('/service/roles', 'Service\RolesController@index')->name('rolesIndex');
Route::get('/service/users', 'Service\UsersController@index')->name('usersIndex');
Route::get('/service/catalog', 'Service\CatalogController@index')->name('catalogIndex');
Route::get('/service/product_group', 'Service\CatalogController@index')->name('productGroupIndex');
Route::get('/service/pos', 'Service\PosController@index')->name('posIndex');

