<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateMeetingParticipantsTable extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'id' => [
				'type'           => 'INT',
				'constraint'     => 11,
				'unsigned'       => true,
				'auto_increment' => true,
			],
			'meeting_id' => [
				'type'       => 'INT',
				'constraint' => 11,
				'unsigned'   => true,
			],
			'user_id' => [
				'type'       => 'INT',
				'constraint' => 11,
				'unsigned'   => true,
			],
		]);

		$this->forge->addKey('id', true);
		$this->forge->addUniqueKey(['meeting_id', 'user_id']);
		$this->forge->addKey('user_id');

		$this->forge->createTable('meeting_participants', true);

		$this->db->query("
			ALTER TABLE meeting_participants
			ADD CONSTRAINT fk_meeting_participants_meeting
			FOREIGN KEY (meeting_id) REFERENCES meetings(unique_id)
			ON DELETE CASCADE ON UPDATE CASCADE
		");

		$this->db->query("
			ALTER TABLE meeting_participants
			ADD CONSTRAINT fk_meeting_participants_user
			FOREIGN KEY (user_id) REFERENCES users(id)
			ON DELETE CASCADE ON UPDATE CASCADE
		");
	}

	public function down()
	{
		$this->forge->dropTable('meeting_participants', true);
	}
}