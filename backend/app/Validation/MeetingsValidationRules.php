<?php

namespace App\Validation;

use App\Validation\BaseValidationRules;

class MeetingsValidationRules extends BaseValidationRules
{
	public const userId = [
		'user_id' => [
			'rules'  => 'required|integer|is_not_unique[users.id]',
			'errors' => [
				'is_not_unique' => 'Your user stopped existing.'
			]
		]
	];
}