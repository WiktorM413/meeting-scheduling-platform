<?php

namespace App\Services;

use App\Models\AuthModel;

class AuthService
{
	protected AuthModel $authModel;

	public function __construct()
	{
		$this->authModel = model(AuthModel::class);
		helper('response');
	}

	public function register($firstname, $lastname, $email, $password, $userGroup = 0)
	{
		if ($this->userExists($email))
		{
			return SimpleJson(true, 'User already exists');
		}

		$userId = $this->authModel->createUser($firstname, $lastname, $email, $password, $userGroup);

		$this->setSession($userId, $email);

		return SimpleJson(false, 'Successfully registered');
	}

	public function login($email, $password)
	{
		if (! $this->userExists($email))
		{
			return SimpleJson(true, 'User with that eamil doesn\'t exist.');
		}

		$user = $this->authModel->getUserByEmail($email);

		if (! password_verify($password, $user['password']))
		{
			return SimpleJson(true, 'Wrong password');
		}

		$this->setSession($user['id'], $user['email']);
		// return ['error' => false, 'message' => 'Successfully logged in.'];
		return SimpleJson(false, 'Successfully logged in.');
	}

	public function logout()
	{
		$this->destroySession();

		return SimpleJson(false, 'Successfully logged out.');
	}

	public function hashPassword($password)
	{
		return password_hash($password, PASSWORD_DEFAULT);
	}

	public function validationErrorsToJSON($errors)
	{
		$firstField = array_key_first($errors);
		$firstError = $errors[$firstField];

		return SimpleJson(true, "Error: $firstError");
	}

	public function userExists($email)
	{
		$user = $this->authModel->getUserByEmail($email);
		
		return isset($user);
	}

	public function setSession($userId, $email)
	{
		$session = session();

		$session->set
		([
			'user_id'   => $userId,
			'email'     => $email,
			'logged_in' => true
		]);
	}

	public function getSession(string|null $key = null)
	{
		$session = session();

		return $session->get($key);
	}

	public function destroySession()
	{
		$session = session();

		$session->destroy();
	}
}
