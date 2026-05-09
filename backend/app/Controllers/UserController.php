<?php

namespace App\Controllers;

use App\Validation\UserValidationRules;

class UserController extends BaseController
{
	public function getAllUsers()
	{
		/** @var \App\Services\UserService $userService */
		$userService = service('userService');

		$response = $userService->getAllUsers();

		return $this->response->setJSON($response);
	}

	public function getUserById()
	{
		/** @var \App\Services\UserService $userService */
		$userService = service('userService');
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, UserValidationRules::userId))
		{
			return $this->response->setJSON(UserValidationRules::validationErrorsToJSON($this->validator->getErrors()));
		}

		$userId = $data['user_id'];

		$response = $userService->getUserById($userId);

		return $this->response->setJSON($response);
	}
}