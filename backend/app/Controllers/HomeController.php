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
			$errors     = $this->validator->getErrors();
			$firstField = array_key_first($errors);
			$firstError = $errors[$firstField];

			return $this->response->setJSON
			([
				'error'   => true,
				'message' => "Error: $firstError",
			]);
		}

		$firstname = $data['firstname'] ?? '';
		$lastname  = $data['lastname']  ?? '';
		$email     = $data['email']     ?? '';
		$password  = $data['password']  ?? '';

		$password = $homeService->hashPassword($password);
		$homeService->register($firstname, $lastname, $email, $password);
		
		return $this->response->setJSON
		([
			'error' => false,
		]);
	}
}