<?php

namespace App\Services;

use App\Models\MeetingsModel;

class MeetingsService
{
	protected MeetingsModel $meetingsModel;
	
	public function __construct()
	{
		$this->meetingsModel = model(MeetingsModel::class);
		helper('response');
	}
	
	public function getAllMeetings()
	{
		$meetings = $this->meetingsModel->getAllMeetings();

		return DataJson(false, "Successfully retrieved meetings", $meetings);
	}

	public function getAllMeetingsForUser(int $userId)
	{
		$meetings = $this->meetingsModel->getAllMeetingsForUser($userId);

		return DataJson(false, "Successfully retrieved meetings", $meetings);
	}

	public function createMeeting(int $providerId, array $receiverIds, string $topic, string $when, string $where, string $timeStart, string $timeEnd)
	{
		$meetingId = $this->meetingsModel->createMeeting($providerId, $topic, $when, $where, $timeStart, $timeEnd);

		$this->meetingsModel->addUsersToMeeting($meetingId, $receiverIds);

		return SimpleJson(false, "Successfully scheduled a meeting.");
	}

	public function editMeeting(int $meetingId, array|null $receiverIds, string|null $timeStart,
	string|null $timeEnd,string|null $topic, string|null $where, string|null $when)
	{
		$this->meetingsModel->editMeeting($meetingId, $receiverIds, $timeStart, $timeEnd, $topic, $where, $when);

		return SimpleJson(false, "Successfully edited a meeting.");
	}
}