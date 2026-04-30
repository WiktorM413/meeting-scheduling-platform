<?php

namespace App\Validation;

class ValidationRules
{
	public const array firstname = [
		'rules' => 'required'
	];

	public const array lastname = [
		'rules' => 'required'
	];

	public const array email = [
		'rules' => 'required|valid_email|is_unique[users.email]'
	];

	public const array password = [
		'rules' => 'required|min_length[8]'
	];
}