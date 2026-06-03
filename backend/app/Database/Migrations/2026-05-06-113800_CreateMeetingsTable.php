<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMeetingsTable extends Migration
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
			'provider_id' => [
				'type'       => 'INT',
				'constraint' => 11,
				'unsigned'   => true,
			],
			'receiver_id' => [
				'type'       => 'INT',
				'constraint' => 11,
				'unsigned'   => true,
			],
			'topic' => [
				'type' => 'TEXT',
			],
			'when' => [
				'type' => 'DATE',
			],
			'where' => [
				'type' => 'TEXT',
			],
			'time_start' => [
				'type' => 'TIME',
			],
			'time_end' => [
				'type' => 'TIME',
			],
		]);

		$this->forge->addKey('unique_id', true);

		$this->forge->addKey('provider_id');
		$this->forge->addKey('receiver_id');

		$this->forge->createTable('meetings', true);

		$this->db->query("
			ALTER TABLE meetings
			ADD CONSTRAINT fk_meetings_provider_id
			FOREIGN KEY (provider_id) REFERENCES users(id)
			ON DELETE CASCADE ON UPDATE CASCADE
		");

		$this->db->query("
			ALTER TABLE meetings
			ADD CONSTRAINT fk_meetings_receiver_id
			FOREIGN KEY (receiver_id) REFERENCES users(id)
			ON DELETE CASCADE ON UPDATE CASCADE
		");

		$this->db->query("
			ALTER TABLE meetings
			ADD CONSTRAINT chk_meetings_fk_provider_receiver_difference
			CHECK (provider_id <> receiver_id)
		");
	}

	public function down()
	{
		$this->forge->dropTable('meetings', true);
	}
}