<?php

namespace App\Validation;

use App\Validation\BaseValidationRules;

class AuthValidationRules extends BaseValidationRules
{
	public const register = [
		'firstname' => [
			'rules'  => 'required|min_length[2]',
			'errors' => [
				'min_length' => 'First name must be at least 2 characters.',
			],
		],
		'lastname' => [
			'rules'  => 'required|min_length[2]',
			'errors' => [
				'min_length' => 'Last name must be at least 2 characters.',
			],
		],
		'email' => [
			'rules'  => 'required|valid_email|is_unique[users.email]',
		],
		'password' => [
			'rules'  => 'required|min_length[8]',
			'errors' => [
				'min_length' => 'Password must be at least 8 characters',
			],
		],
	];

	public const login = [
		'email' => [
			'rules' => 'required|valid_email',
		],
		'password' => [
			'rules' => 'required',
		],
	];
}
