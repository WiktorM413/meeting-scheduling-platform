<?php

if (! function_exists('SimpleJson'))
{
	function SimpleJson(bool $error, string $message)
	{
		return
		[
			'error'   => $error,
			'message' => $message
		];
	}
}