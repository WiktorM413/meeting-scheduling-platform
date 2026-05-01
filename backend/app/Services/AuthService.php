<?php

namespace App\Services;

use App\Models\AuthModel;
use App\Validation\ValidationRules;

class AuthService
{
	protected AuthModel $authModel;

	public function __construct()
	{
		$this->authModel = model(AuthModel::class);
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

		$this->authModel->createUser($firstname, $lastname, $email, $password, $userGroup);

		return
		[
			'error'   => false,
			'message' => 'Successfully registered.'
		];
	}

	public function login($email, $password)
	{
		if (! $this->userExists($email))
		{
			return
			[
				'error'   => true,
				'message' => 'User with that email doesn\'t exist'
			];
		}

		$user = $this->authModel->getUserByEmail($email);		

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
		$user = $this->authModel->getUserByEmail($email);
		
		return isset($user);
	}
}
