<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<?php

use Illuminate\Support\Facades\Gate;
?>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="pharmaceutical management system">
    <meta name="author" content="" <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <link rel="shortcut icon" href="{{ asset('images/favicon/favicon.ico') }}">
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/sb-admin-2.css') }}" rel="stylesheet">

    <!--    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">-->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

</head>

<body>
    <!-- Page Wrapper -->
    <div id="app" class="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="{{ route('home') }}">
                <div class="sidebar-brand-icon">
                    <img style="max-width: 80%" src="{{URL('/images/favicon/favicon-32x32.png')}}" alt="">
                </div>
                <div style="margin-left: 0px !important" class="sidebar-brand-text mx-3">Olga Pharma</div>
            </a>


            <?php if (Gate::allows('view_dashboard')) { ?>
                <!-- Divider -->
                <hr class="sidebar-divider my-0">

                <!-- Nav Item - Dashboard -->
                <li class="nav-item menu-head dashboard-link">
                    <a class="nav-link " href="{{ route('home') }}" onclick="localStorage.setItem('page', 'Dashboard');">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                        
                    </a>
                </li>

            <?php } ?>

            <!--POS & Invoice section  -->
            <?php

            if (Gate::allows('view_pos')) { ?>
                <!-- Divider -->

                <hr class="sidebar-divider">

                <!-- Heading -->
                <div class="sidebar-heading">
                    POS
                </div>

                <!-- Nav Item - Pages Collapse Menu -->
                <li class="nav-item menu-head pos-head">
                    <!-- change -->
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <i class="fas fa-cart-plus"></i>
                        <span>POS & Invoices</span>
                    </a>
                    <!-- change -->
                    <div id="collapseOne" class="collapse menu-body pos-body" aria-labelledby="headingOne" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">POS:</h6>
                        
                            <?php if (Gate::allows('view_stocks_report')) { ?>
                                <!-- change -->
                                <a class="collapse-item" onclick="localStorage.setItem('page', 'POS');" href="{{ route('posIndex') }}">POS</a>
                            <?php } ?>

                        </div>
                    </div>
                </li>
            <?php } ?>


            <!--Reports section  -->
            <?php

            if (Gate::allows('view_reports')) { ?>
                <!-- Divider -->

                <hr class="sidebar-divider">

                <!-- Heading -->
                <div class="sidebar-heading">
                    Reports
                </div>

                <!-- Nav Item - Pages Collapse Menu -->
                <li class="nav-item menu-head reports-head">
                    <!-- change -->
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                        <i class="fas fa-fw fa-folder"></i>
                        <span>Reports</span>
                    </a>
                    <!-- change -->
                    <div id="collapseTwo" class="collapse menu-body reports-body" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">Reports:</h6>
                            <?php if (Gate::allows('view_pt_report')) { ?>
                                <!-- <a onclick="localStorage.setItem('page', 'Pt');" class="collapse-item" href="{{ route('ptIndex') }}">Pt</a> -->
                            <?php } ?>
                            <?php if (Gate::allows('view_stocks_report')) { ?>
                                <!-- change -->
                                <a class="collapse-item" onclick="localStorage.setItem('page', 'stocks');" href="{{ route('stocksReportIndex') }}">Stocks</a>
                            <?php } ?>
                            <?php if (Gate::allows('view_purchases_report')) { ?>
                                <a onclick="localStorage.setItem('page', 'purchases');" class="collapse-item" href="{{ route('purchasesReportIndex') }}">Purchases</a>
                            <?php } ?>
                            <?php if (Gate::allows('view_sales_report')) { ?>
                                <a onclick="localStorage.setItem('page', 'sales');" class="collapse-item" href="{{ route('salesReportIndex') }}">Sales</a>
                            <?php } ?>
                            <?php if (Gate::allows('view_datamining_module')) { ?>
                                <a onclick="localStorage.setItem('page', 'mining');" class="collapse-item" href="{{ route('miningIndex') }}">Data Mining</a>
                            <?php } ?>

                        </div>
                    </div>
                </li>
            <?php } ?>

            <!--System admin section  -->
            <?php

            if (Gate::allows('view_system_settings')) { ?>
                <!-- Divider -->
                <hr class="sidebar-divider">

                <!-- Heading -->
                <div class="sidebar-heading">
                    System
                </div>

                <!-- Nav Item - Pages Collapse Menu -->

                <li class="nav-item menu-head system-head">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                        <i class="fas fa-fw fa-cog"></i>
                        <span>System Settings</span>
                    </a>
                    <div id="collapsePages" class="collapse menu-body system-body" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <h6 class="collapse-header">System settings</h6>
                            <?php if (Gate::allows('view_product_group')) { ?>
                                <a onclick="localStorage.setItem('page', 'ProductGroup');" class="collapse-item" href="{{ route('productGroupIndex') }}">Product Group</a>
                            <?php } ?>
                            <?php if (Gate::allows('view_catalog')) { ?>
                                <a onclick="localStorage.setItem('page', 'Catalog');" class="collapse-item" href="{{ route('catalogIndex') }}">Catalog</a>
                            <?php } ?>
                            <?php if (Gate::allows('view_user')) { ?>
                                <a onclick="localStorage.setItem('page', 'Users');" class="collapse-item" href="{{ route('usersIndex') }}">Users</a>
                            <?php } ?>
                            <?php if (Gate::allows('view_role')) { ?>
                                <a onclick="localStorage.setItem('page', 'Roles');" class="collapse-item" href="{{ route('rolesIndex') }}">Roles</a>
                            <?php } ?>
                            
                        </div>
                    </div>
                </li>

            <?php } ?>

            <li class="nav-item menu-head" style="margin-left: 5px;">
                <a onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();" class="nav-link " href="{{ route('home') }}">
                    <strong> <i class="fas fa-sign-out-alt"></i> {{ __('Logout') }} </strong>
                </a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>



        </ul>
        <!-- End of Sidebar -->


        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Search -->
                    <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div class="input-group">
                            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">
                                    <i class="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                        <li class="nav-item dropdown no-arrow d-sm-none">
                            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-search fa-fw"></i>
                            </a>
                            <!-- Dropdown - Messages -->
                            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                <form class="form-inline mr-auto w-100 navbar-search">
                                    <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button">
                                                <i class="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        <!-- Nav Item - Alerts -->
                        <li class="nav-item dropdown no-arrow mx-1">
                            <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-bell fa-fw"></i>
                                <!-- Counter - Alerts -->
                                <span class="badge badge-danger badge-counter">3+</span>
                            </a>
                            <!-- Dropdown - Alerts -->
                            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                                <h6 class="dropdown-header">
                                    Alerts Center
                                </h6>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-primary">
                                            <i class="fas fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">March 7, 2021</div>
                                        <span class="font-weight-bold">A new monthly report is ready to download!</span>
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-success">
                                            <i class="fas fa-donate text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">March 7, 2021</div>
                                        New APP Users Added For Homabay County
                                    </div>
                                </a>
                                <a class="dropdown-item d-flex align-items-center" href="#">
                                    <div class="mr-3">
                                        <div class="icon-circle bg-warning">
                                            <i class="fas fa-exclamation-triangle text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="small text-gray-500">April 7, 2021</div>
                                        Data incomplete for Kisumu - SDP 1 form
                                    </div>
                                </a>
                                <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                            </div>
                        </li>

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                                    {{ Auth::user()->name }}
                                </span>
                                <img class="img-profile rounded-circle" src="{{ asset('images/undraw_profile.svg') }}">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <a class="dropdown-item" href="{{ route('profile') }}">
                                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    My Profile
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                                </a>
                                <a class="dropdown-item" href="#">
                                    <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                                </a>
                                <div class="dropdown-divider"></div>


                                <a class="dropdown-item" href="{{ route('logout') }}" onclick="event.preventDefault();
                                                localStorage.removeItem('treeStruc'); 
                                                document.getElementById('logout-form').submit();">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>


                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    @yield('content')
                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Olga Pharma &copy; <script>
                                document.write(new Date().getFullYear());
                            </script></span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->


    <!-- Custom scripts for all pages-->
    <script>
        // stocks
        // purchases
        // mining
        // sales
        // POS
        
        // Dashboard
        // Catalog
        // Users
        // Roles

        let page = localStorage.getItem('page');
        //console.log("the page is " + page);
        document.getElementsByClassName("menu-head")[0].classList.remove("active");
        document.getElementsByClassName("menu-body")[0].classList.remove("show");

        if (page == 'stocks' || page == 'purchases' || page == 'sales' || page == 'mining') {
            let head = document.getElementsByClassName("reports-head");
            head[0].classList.add("active");
            let body = document.getElementsByClassName("reports-body");
            body[0].classList.add("show");
        } else {
            let head = document.getElementsByClassName("reports-head");
            head[0].classList.remove("active");
            let body = document.getElementsByClassName("reports-body");
            body[0].classList.remove("show");
        }

        if (page == 'Users' || page == 'Roles' || page == 'Catalog' || page=='ProductGroup') {
            let head = document.getElementsByClassName("system-head");
            head[0].classList.add("active");
            let body = document.getElementsByClassName("system-body");
            body[0].classList.add("show");
        } else {
            let head = document.getElementsByClassName("system-head");
            head[0].classList.remove("active");
            let body = document.getElementsByClassName("system-body");
            body[0].classList.remove("show");
        }


        if (page == 'POS' ) {
            let head = document.getElementsByClassName("pos-head");
            head[0].classList.add("active");
            let body = document.getElementsByClassName("pos-body");
            body[0].classList.add("show");
        } else {
            let head = document.getElementsByClassName("pos-head");
            head[0].classList.remove("active");
            let body = document.getElementsByClassName("pos-body");
            body[0].classList.remove("show");
        }

        if (page == 'Dashboard' || page == null) {
            let dashboard = document.getElementsByClassName("dashboard-link");
            dashboard[0].classList.add("active");

        } else {
            let dashboard = document.getElementsByClassName("dashboard-link");
            dashboard[0].classList.remove("active");

        }
    </script>
    <script src="{{ asset('js/sb-admin-2.min.js') }}" defer></script>

</body>

</html>