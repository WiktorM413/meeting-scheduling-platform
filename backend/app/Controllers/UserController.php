<?php

namespace App\Controllers;

use App\Validation\UserValidationRules;

class UserController extends BaseController
{
	/** @var \App\Services\UserService $userService */
	protected $userService;

	public function __construct()
	{
		$this->userService = service('userService');
	}

	public function getAllUsers()
	{
		$response = $this->userService->getAllUsers();

		return $this->response->setJSON($response);
	}

	public function getUserById()
	{
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, UserValidationRules::userId))
		{
			return $this->response->setJSON(UserValidationRules::validationErrorsToJSON($this->validator->getErrors()));
		}

		$userId = $data['user_id'];

		$response = $this->userService->getUserById($userId);

		return $this->response->setJSON($response);
	}

	public function getUserStats()
	{
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, UserValidationRules::userId))
		{
			return $this->response->setJSON(UserValidationRules::validationErrorsToJSON($this->validator->getErrors()));
		}

		$userId = $data['user_id'];

		$response = $this->userService->getUserStats($userId);

		return $this->response->setJSON($response);
	}
}