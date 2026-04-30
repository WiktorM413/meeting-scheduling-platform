<?php

namespace App\Validation;

class ValidationRules
{
	public const array firstname = [
		'firstname' => 'required'
	];

	public const array lastname = [
		'lastname' => 'required'
	];

	public const array email = [
		'email' => 'required|valid_email|is_unique[users.email]'
	];

	public const array password = [
		'password' => 'required|min_length[8]'
	];
}