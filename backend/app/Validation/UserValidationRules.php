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

	public const pattern = [
		'pattern' => [
			'rules' => 'required|string'
		]
	];

	public const updateUser = [
		'user_id' => [
			'rules' => 'required|integer|is_not_unique[users.id]'
		],
		'first_name' => [
			'rules' => 'permit_empty|string|min_length[2]'
		],
		'last_name' => [
			'rules' => 'permit_empty|string|min_length[2]'
		],
		'email' => [
			'rules' => 'permit_empty|string|valid_email'
		],
		'profile_pic' => [
			'rules' => 'permit_empty|string|regex_match[/^[A-Za-z0-9+\/]*={0,2}$/]|max_length[2097152]'
		],
		'remove_profile_pic' => [
			'rules' => 'permit_empty|in_list[0,1]'
		]
	];

	public const updateUserSettings = [
		'user_id' => [
			'rules' => 'required|integer|is_not_unique[users.id]'
		],
		'public_profile' => [
			'rules' => 'permit_empty|in_list[0,1]'
		],
		'show_email' => [
			'rules' => 'permit_empty|in_list[0,1]'
		]
	];

	public const updatePassword = [
		'user_id' => [
			'rules' => 'required|integer|is_not_unique[users.id]'
		],
		'current_password' => [
			'rules'  => 'required',
			'errors' => [
				'required' => 'Current password is required'
			]
		],
		'new_password' => [
			'rules'  => 'required|min_length[8]',
			'errors' => [
				'required'   => 'New password is required',
				'min_length' => 'New password must be at least 8 characters'
			]
		],
		'repeat_password' => [
			'rules'  => 'required|matches[new_password]',
			'errors' => [
				'required' => 'Repeated password is required',
				'matches' => 'The repeated password doesn\'t match'
			]
		]
	];
}