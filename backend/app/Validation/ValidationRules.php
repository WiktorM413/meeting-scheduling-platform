<?php

namespace App\Validation;

class ValidationRules
{
	public const firstname = [
		'firstname' => [
			'rules'  => 'required|min_length[2]',
			'errors' => [
				'min_length' => 'First name must be at least 2 characters.',
			],
		]
	];

	public const lastname = [
		'lastname' => [
			'rules'  => 'required|min_length[2]',
			'errors' => [
				'min_length' => 'Last name must be at least 2 characters.',
			],
		]
	];

	public const email = [
		'email' => [
			'rules'  => 'required|valid_email|is_unique[users.email]',
			'errors' => [
				'is_unique' => 'Account with that email already exists.',
			],
		]
	];

	public const password = [
		'password' => [
			'rules'  => 'required|min_length[8]',
			'errors' => [
				'min_length' => 'Password must be at least 8 characters',
			],
		]
	];
}