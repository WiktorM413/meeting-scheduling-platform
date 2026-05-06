<?php

namespace App\Controllers;

use App\Services\MeetingsService;

class MeetingsController extends BaseController
{
	public function getAllMeetings()
	{
		/** @var \App\Services\MeetingsService $meetingsService */
		$meetingsService = service('meetingsService');

		$response = $meetingsService->getAllMeetings();

		return $this->response->setJSON($response);
	}
}