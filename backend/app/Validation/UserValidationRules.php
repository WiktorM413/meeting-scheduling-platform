<?php

namespace App\Validation;

use App\Validation\BaseValidationRules;

class UserValidationRules extends BaseValidationRules
{
	public const userId = [
		'user_id' => [
			'rules' => 'required|integer|is_not_unique[users.id]'
		]
	];
}