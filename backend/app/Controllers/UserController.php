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

	public function updateUser()
	{
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, UserValidationRules::updateUser))
		{
			return $this->response->setJSON(UserValidationRules::validationErrorsToJSON($this->validator->getErrors()));
		}

		$userId           = $data['user_id'];
		$profilePic       = $data['profile_pic'] ?? null;
		$firstname        = $data['first_name']  ?? null;
		$lastname         = $data['last_name']   ?? null;
		$email            = $data['email']       ?? null;
		$removeProfilePic = $data['remove_profile_pic'];

		$response = $this->userService->updateUser($userId, $profilePic, $firstname, $lastname, $email, $removeProfilePic);

		/** @var \App\Services\AuthService $authService */
		$authService = service('authService');

		$session = $authService->getSession();

		$authService->setSession($userId, $firstname ?? $session['firstname'], $lastname ?? $session['lastname'], $email ?? $session['email'], $profilePic);

		return $this->response->setJSON($response);
	}
}