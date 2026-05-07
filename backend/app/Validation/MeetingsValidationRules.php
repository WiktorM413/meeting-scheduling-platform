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

	public const meeting = [
		'provider_id' => [
			'rules' => 'required|integer'
		],
		'receiver_id' => [
			'rules' => 'required|integer'
		],
		'topic' => [
			'rules' => 'required|string|max_length[255]'
		],
		'when' => [
			'rules' => 'required|valid_date[Y-m-d]'
		],
		'where' => [
			'rules' => 'required|string|max_length[255]'
		],
		'time_start' => [
			'rules' => 'required|valid_date[H:i]'
		],
		'time_end' => [
			'rules' => 'required|valid_date[H:i]'
		]
	];
}