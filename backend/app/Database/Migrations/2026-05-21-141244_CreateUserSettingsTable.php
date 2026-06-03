<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateUserSettingsTable extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'unique_id' => [
				'type'           => 'INT',
				'constraint'     => 11,
				'unsigned'       => true,
				'auto_increment' => true,
			],
			'user_id' => [
				'type'       => 'INT',
				'constraint' => 11,
				'unsigned'   => true,
			],
			'public_profile' => [
				'type'       => 'TINYINT',
				'constraint' => 2,
				'default'    => 1,
			],
			'show_email' => [
				'type'       => 'TINYINT',
				'constraint' => 2,
				'default'    => 1,
			],
		]);

		$this->forge->addKey('unique_id', true);
		$this->forge->addUniqueKey('user_id');

		$this->forge->createTable('user_settings', true);

		$this->db->query("
			ALTER TABLE user_settings
			ADD CONSTRAINT fk_user_settings_user_id
			FOREIGN KEY (user_id) REFERENCES users(id)
			ON DELETE CASCADE ON UPDATE CASCADE
		");
	}

	public function down()
	{
		$this->forge->dropTable('user_settings', true);
	}
}