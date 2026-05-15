<?php

namespace App\Controllers;

use App\Validation\MeetingsValidationRules;

class MeetingsController extends BaseController
{
	/** @var \App\Services\MeetingsService $meetingsService */
	protected $meetingsService;

	public function __construct()
	{
		$this->meetingsService = service('meetingsService');
	}

	public function getAllMeetings()
	{
		$response = $this->meetingsService->getAllMeetings();

		return $this->response->setJSON($response);
	}

	public function getMeetingById()
	{
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, MeetingsValidationRules::meetingId))
		{
			return $this->response->setJSON(MeetingsValidationRules::validationErrorsToJSON($this->validator->getErrors()));
		}

		$uniqueId = $data['unique_id'];

		$response = $this->meetingsService->getMeetingById($uniqueId);

		return $this->response->setJSON($response);
	}

	public function getAllMeetingsForUser()
	{
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, MeetingsValidationRules::userId))
		{
			return $this->response->setJSON(MeetingsValidationRules::validationErrorsToJSON($this->validator->getErrors()));
		}

		$userId = $data['user_id'];
		
		$response = $this->meetingsService->getAllMeetingsForUser($userId);

		return $this->response->setJSON($response);
	}

	public function createMeeting()
	{
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, MeetingsValidationRules::meeting))
		{
			return $this->response->setJSON(MeetingsValidationRules::validationErrorsToJSON($this->validator->getErrors()));
		}

		$providerId  = $data['provider_id'];
		$receiverIds = $data['receiver_ids'];
		$topic       = $data['topic'];
		$when        = $data['when'];
		$where       = $data['where'];
		$timeStart   = $data['time_start'];
		$timeEnd     = $data['time_end'];

		$response = $this->meetingsService->createMeeting($providerId, $receiverIds, $topic, $when, $where, $timeStart, $timeEnd);

		return $this->response->setJSON($response);
	}

	public function editMeeting()
	{
		$data = $this->request->getJSON(true);

		if (! $this->validateData($data, MeetingsValidationRules::editMeeting))
		{
			return $this->response->setJSON(MeetingsValidationRules::validationErrorsToJSON($this->validator->getErrors()));
		}

		$meetingId   = $data['unique_id'];
		$receiverIds = $data['receiver_ids'] ?? null;
		$timeStart   = $data['time_start']   ?? null;
		$timeEnd     = $data['time_end']     ?? null;
		$topic       = $data['topic']        ?? null;
		$where       = $data['where']        ?? null;
		$when        = $data['when']         ?? null;

		$response = $this->meetingsService->editMeeting($meetingId, $receiverIds, $timeStart, $timeEnd, $topic, $where, $when);

		return $this->response->setJSON($response);
	}


}