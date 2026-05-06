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
		$meetingsModel = model(MeetingsModel::class);

		$meetings = $meetingsModel->getAllMeetings();

		return DataJson(false, "Successfully retrieved meetings", $meetings);
	}
}