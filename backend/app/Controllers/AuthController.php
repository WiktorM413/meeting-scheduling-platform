<?php

namespace App\Controllers;

use App\Services\AuthService;

class AuthController extends BaseController
{
	protected AuthService $authService;

	public function __construct()
	{
		$authService = service('authService');
	}

	public function register()
	{
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, $this->authService->constructRegisterRules()))
		{
			return $this->response->setJSON($this->authService->validationErrorsToJSON($this->validator->getErrors()));
		}

		$firstname = $data['firstname'] ?? '';
		$lastname  = $data['lastname']  ?? '';
		$email     = $data['email']     ?? '';
		$password  = $data['password']  ?? '';

		$password = $this->authService->hashPassword($password);
		$response = $this->authService->register($firstname, $lastname, $email, $password);
		
		return $this->response->setJSON($response);
	}

	public function login()
	{
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, $this->authService->constructLoginRules()))
		{
			return $this->response->setJSON($this->authService->validationErrorsToJSON($this->validator->getErrors()));
		}

		$email    = $data['email']    ?? '';
		$password = $data['password'] ?? '';

		$response = $this->authService->login($email, $password);

		return $this->response->setJSON($response);
	}

	public function me()
	{
		$sessionData = $this->authService->getSession();

		return $this->response->setJSON
		(
			$sessionData
		);
	}
}