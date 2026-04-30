<?php

namespace App\Controllers;

use App\Models\HomeModel;
use App\Services\HomeService;

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
			return $this->response->setJSON
			([
				'error'   => true,
				'message' => $this->validator->getErrors(),
			]);
		}

		$firstname = $data['firstname'] ?? '';
		$lastname  = $data['lastname']  ?? '';
		$email     = $data['email']     ?? '';
		$password  = $data['password']  ?? '';

		if ($homeService->userExists($email))
		{
			return $this->response->setJSON
			([
				'error'   => true,
				'message' => 'Account already exists',
			]);
		}
			
		$homeService->register($firstname, $lastname, $email, $password);
		
		return $this->response->setJSON
		([
			'error' =>  false,
		]);
	}
}