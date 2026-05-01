<?php

use App\Controllers\AuthController;
use App\Controllers\HomeController;
use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->group('api', function ($routes) {
	$routes->get ('home',     [HomeController::class, 'index']);
	$routes->post('register', [AuthController::class, 'register']);
	$routes->post('login',    [AuthController::class, 'login']);
});
