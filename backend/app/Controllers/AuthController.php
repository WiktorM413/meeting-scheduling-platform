<?php

namespace App\Controllers;

use App\Services\AuthService;

class AuthController extends BaseController
{
	public function register()
	{
		/** @var \App\Services\AuthService $authService */
		$authService = service('authService');
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, $authService->constructRegisterRules()))
		{
			return $this->response->setJSON($authService->validationErrorsToJSON($this->validator->getErrors()));
		}

		$firstname = $data['firstname'] ?? '';
		$lastname  = $data['lastname']  ?? '';
		$email     = $data['email']     ?? '';
		$password  = $data['password']  ?? '';

		$password = $authService->hashPassword($password);
		$response = $authService->register($firstname, $lastname, $email, $password);
		
		return $this->response->setJSON($response);
	}

	public function login()
	{
		/** @var \App\Services\AuthService $authService */
		$authService = service('authService');
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, $authService->constructLoginRules()))
		{
			return $this->response->setJSON($authService->validationErrorsToJSON($this->validator->getErrors()));
		}

		$email    = $data['email']    ?? '';
		$password = $data['password'] ?? '';

		$response = $authService->login($email, $password);

		return $this->response->setJSON($response);
	}

	public function me()
	{
		/** @var \App\Services\AuthService $authService */
		$authService = service('authService');

		if (! $authService->getSession("logged_in"))
		{
			return $this->response->setStatusCode(401)->setJSON
			([
				'error'   => true,
				'message' => 'Unauthorized'
			]);
		}

		$sessionData = $authService->getSession();

		return $this->response->setJSON($sessionData);
	}

	public function logout()
	{
		/** @var \App\Services\AuthService $authService */
		$authService = service('authService');

		$response = $authService->logout();

		return $this->response->setJSON($response);
	}
}