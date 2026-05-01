<?php

use App\Controllers\HomeController;
use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->group('api', function ($routes) {
	$routes->get ('home',     [HomeController::class, 'index']);
	$routes->post('register', [HomeController::class, 'register']);
	$routes->post('login',    [HomeController::class, 'login']);
});
