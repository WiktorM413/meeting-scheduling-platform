<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddProfilePicColumnToUsers extends Migration
{
	public function up()
	{
		$this->db->query("
			ALTER TABLE users
				ADD COLUMN profile_pic MEDIUMBLOB DEFAULT NULL COMMENT 'Raw binary image'
		");
	}

	public function down()
	{
	}
}
