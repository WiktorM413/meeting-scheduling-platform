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
	
		$logsDir = WRITEPATH . 'logs/';
		$diagnostic = "WRITEPATH: " . WRITEPATH . "\n";
		$diagnostic .= "logs dir exists: " . (is_dir($logsDir) ? 'yes' : 'no') . "\n";
		$diagnostic .= "logs dir writable: " . (is_writable($logsDir) ? 'yes' : 'no') . "\n";
		
		$files = glob($logsDir . 'log-*.php');
		$diagnostic .= "log files found: " . count($files) . "\n";

		if (empty($files))
		{
			return $this->response->setContentType('text/plain')->setBody($diagnostic . "\nNo log files found.");
		}
	
		usort($files, fn($a, $b) => filemtime($b) - filemtime($a));
	
		return $this->response->setContentType('text/plain')->setBody($diagnostic . "\n---\n\n" . file_get_contents($files[0]));
	}
}
