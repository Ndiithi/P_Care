/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/dashboard/Dashboard');

require('./components/reports/sales/SalesReport');
require('./components/reports/purchases/PurchasesReport');
require('./components/reports/stocks/StocksReport');
require('./components/reports/mining/Miner');

//Intrface code
require('./components/system/role/Roles');
require('./components/system/users/Users');
require('./components/system/users/Profile');
require('./components/system/catalog/Catalog');
require('./components/system/auth/axios_login');
require('xlsx');
require("uuid/v4");
require("react-datepicker");
require("react-js-pagination")
require('../../node_modules/@fortawesome/fontawesome-free/js/fontawesome.js');

require('../../node_modules/jquery.easing/jquery.easing.min.js');
