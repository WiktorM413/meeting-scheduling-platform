<?php

namespace App\Controllers;

class UserController extends BaseController
{
	public function getAllUsers()
	{
		/** @var \App\Services\UserService $userService */
		$userService = service('userService');

		$response = $userService->getAllUsers();

		return $this->response->setJSON($response);
	}
}