<?php

use App\Controllers\AuthController;
use App\Controllers\DebugController;
use App\Controllers\HomeController;
use App\Controllers\MeetingsController;
use App\Controllers\UserController;
use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */

 $routes->options('(:any)', static function ()
 {
	return service('response')
		->setHeader(
			'Access-Control-Allow-Origin',
			'https://meeting-scheduling-platform.wiktor-markowski362.workers.dev'
		)
		->setHeader(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization, X-Requested-With, Accept, Origin'
		)
		->setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, PUT, PATCH, DELETE, OPTIONS'
		)
		->setHeader(
			'Access-Control-Allow-Credentials',
			'true'
		)->setStatusCode(200);
 });

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

	$routes->get ('getAllUsers',        [UserController::class, 'getAllUsers']);
	$routes->post('getUserById',        [UserController::class, 'getUserById']);
	$routes->post('getUserStats',       [UserController::class, 'getUserStats']);
	$routes->post('getProfilePic',      [UserController::class, 'getProfilePic']);
	$routes->post('getUserSettings',    [UserController::class, 'getUserSettings']);
	$routes->post('getPublicUsersLike', [UserController::class, 'getPublicUsersLike']);
	$routes->post('updateUser',         [UserController::class, 'updateUser']);
	$routes->post('updateUserSettings', [UserController::class, 'updateUserSettings']);
	$routes->post('updatePassword',     [UserController::class, 'updatePassword']);
	$routes->post('deleteUser',         [UserController::class, 'deleteUser']);
});

$routes->get('debug/logs', [DebugController::class, 'logs']);