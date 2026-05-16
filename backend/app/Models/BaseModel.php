<?php

namespace App\Models;

use CodeIgniter\Model;

class BaseModel extends Model
{
	protected function FirstOrNull(array $arr)
	{
		return count($arr) > 0 ? $arr[0] : null;
	}
}