<?php

namespace App\Controllers;

class AuthController extends BaseController
{
	public function register()
	{
		/** @var \App\Services\authService $authService */
		$authService = service('authService');
		$data        = $this->request->getJSON(true);

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
		$data        = $this->request->getJSON(true);

		if (! $this->validateData($data, $authService->constructLoginRules()))
		{
			return $this->response->setJSON($authService->validationErrorsToJSON($this->validator->getErrors()));
		}

		$email    = $data['email']    ?? '';
		$password = $data['password'] ?? '';

		$response = $authService->login($email, $password);

		return $this->response->setJSON($response);
	}
}