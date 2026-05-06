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

	function DataJson(bool $error, string $message, $data)
	{
		return
		[
			'error' =>   $error,
			'message' => $message,
			'data'    => $data
		];
	}
}