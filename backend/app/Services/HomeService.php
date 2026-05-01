<?php

namespace App\Services;

use App\Models\HomeModel;
use App\Validation\ValidationRules;

class HomeService
{
	protected HomeModel $homeModel;

	public function __construct()
	{
		$this->homeModel = model(HomeModel::class);
	}

	public function register($firstname, $lastname, $email, $password, $userGroup = 0)
	{
		if ($this->userExists($email))
		{
			return
			[
				'error'   => true,
				'message' => 'User already exists.'
			];
		}

		$this->homeModel->createUser($firstname, $lastname, $email, $password, $userGroup);

		return
		[
			'error'   => false,
			'message' => 'Successfully registered.'
		];
	}

	public function login($email, $password)
	{
		$user = $this->homeModel->getUserByEmail($email);
		if (! isset($user))
		{
			return
			[
				'error'   => true,
				'message' => 'User with that email doesn\'t exist'
			];
		}

		if (! password_verify($password, $user['password']))
		{
			return
			[
				'error'   => true,
				'message' => 'Wrong password'
			];
		}

		return
		[
			'error'   => false,
			'message' => 'Successfully logged in.'
		];
	}

	public function constructRegisterRules()
	{
		$mergedRules = array_merge(
			ValidationRules::firstname,
			ValidationRules::lastname,
			ValidationRules::email,
			ValidationRules::password,
		);

		return $mergedRules;
	}

	public function constructLoginRules()
	{
		$mergedRules = array_merge(
			ValidationRUles::email,
			ValidationRules::password,
		);

		return $mergedRules;
	}

	public function hashPassword($password)
	{
		return password_hash($password, PASSWORD_DEFAULT);
	}

	public function validationErrorsToJSON($errors)
	{
		$firstField = array_key_first($errors);
		$firstError = $errors[$firstField];

		return
		[
			'error'   => true,
			'message' => "Error: $firstError",
		];
	}

	public function userExists($email)
	{
		$user = $this->homeModel->getUserByEmail($email);
		
		return isset($user);
	}
}
