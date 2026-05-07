<?php

namespace App\Validation;

class BaseValidationRules
{
	public static function validationErrorsToJSON($errors)
	{
		$firstField = array_key_first($errors);
		$firstError = $errors[$firstField];

		return SimpleJson(true, "Error: $firstError");
	}
}