<?php

namespace App\Controllers;

class DebugController extends BaseController
{
	public function logs()
	{
		if ($this->request->getGet('key') !== 'temp_debug_123')
		{
			return $this->response->setStatusCode(403)->setBody('Forbidden');
		}

		$files = glob(WRITEPATH . 'logs/log-*.php');

		if (empty($files))
		{
			return $this->response->setBody('No log files found.');
		}

		usort($files, fn($a, $b) => filemtime($b) - filemtime($a));

		return $this->response->setContentType('text/plain')->setBody(file_get_contents($files[0]));
	}
}
