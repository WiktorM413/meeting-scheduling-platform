<?php

namespace App\Controllers;

class HomeController extends BaseController
{
	public function index()
	{
		return $this->response->setJSON
		([
			'message' => 'Hello from CI4 API',
			'status'  => 'ok'
		]);
	}

	public function register()
	{
		/** @var \App\Services\HomeService $homeService */
		$homeService = service('homeService');
		$data        = $this->request->getJSON(true);

		if (! $this->validateData($data, $homeService->constructRegisterRules()))
		{
			return $this->response->setJSON($homeService->validationErrorsToJSON($this->validator->getErrors()));
		}

		$firstname = $data['firstname'] ?? '';
		$lastname  = $data['lastname']  ?? '';
		$email     = $data['email']     ?? '';
		$password  = $data['password']  ?? '';

		$password = $homeService->hashPassword($password);
		$response = $homeService->register($firstname, $lastname, $email, $password);
		
		return $this->response->setJSON($response);
	}

	public function login()
	{
		/** @var \App\Services\HomeService $homeService */
		$homeService = service('homeService');
		$data        = $this->request->getJSON(true);

		if (! $this->validateData($data, $homeService->constructLoginRules()))
		{
			return $this->response->setJSON($homeService->validationErrorsToJSON($this->validator->getErrors()));
		}

		$email    = $data['email']    ?? '';
		$password = $data['password'] ?? '';

		$response = $homeService->login($email, $password);

		return $this->response->setJSON($response);
	}
}