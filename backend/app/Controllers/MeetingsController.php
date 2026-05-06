<?php

namespace App\Controllers;

use App\Validation\MeetingsValidationRules;

class MeetingsController extends BaseController
{
	public function getAllMeetings()
	{
		/** @var \App\Services\MeetingsService $meetingsService */
		$meetingsService = service('meetingsService');

		$response = $meetingsService->getAllMeetings();

		return $this->response->setJSON($response);
	}

	public function getAllMeetingsForUser()
	{
		/** @var \App\Services\MeetingsService $meetingsService */
		$meetingsService = service('meetingsService');
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, MeetingsValidationRules::userId))
		{
			return $this->response->setJSON(MeetingsValidationRules::validationErrorsToJSON($this->validator->getErrors()));
		}

		$userId = $data['user_id'];
		
		$response = $meetingsService->getAllMeetingsForUser($userId);

		return $this->response->setJSON($response);
	}
}