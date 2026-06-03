<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddProfilePicColumnToUsers extends Migration
{
	public function up()
	{
		$this->forge->addColumn('users', [
			'profile_pic' => [
				'type'       => 'MEDIUMBLOB',
				'null'       => true,
				'comment'    => 'Raw binary image',
			],
		]);
	}

	public function down()
	{
		$this->forge->dropColumn('users', 'profile_pic');
	}
}