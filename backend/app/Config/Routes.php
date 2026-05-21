<?php

use App\Controllers\AuthController;
use App\Controllers\HomeController;
use App\Controllers\MeetingsController;
use App\Controllers\UserController;
use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->group('api', function ($routes) {
	$routes->get ('home',     [HomeController::class, 'index']);

	$routes->post('register', [AuthController::class, 'register']);
	$routes->post('login',    [AuthController::class, 'login']);
	$routes->get  ('me',      [AuthController::class, 'me']);
	$routes->get  ('logout',  [AuthController::class, 'logout']);

	$routes->get ('meetings',            [MeetingsController::class, 'getAllMeetings']);
	$routes->post('getMeetingById',      [MeetingsController::class, 'getMeetingById']);
	$routes->post('meetingsForUser',     [MeetingsController::class, 'getAllMeetingsForUser']);
	$routes->post('getUpcomingMeetings', [MeetingsController::class, 'getUpcomingMeetings']);
	$routes->post('createMeeting',       [MeetingsController::class, 'createMeeting']);
	$routes->post('editMeeting',         [MeetingsController::class, 'editMeeting']);

	$routes->get ('getAllUsers',     [UserController::class, 'getAllUsers']);
	$routes->post('getUserById',     [UserController::class, 'getUserById']);
	$routes->post('getUserStats',    [UserController::class, 'getUserStats']);
	$routes->post("getProfilePic",   [UserController::class, 'getProfilePic']);
	$routes->post('getUserSettings', [UserController::class, 'getUserSettings']);
	$routes->post('updateUser',      [UserController::class, 'updateUser']);
});
