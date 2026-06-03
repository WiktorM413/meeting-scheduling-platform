<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class RemoveReceiverIdColumnFromMeetings extends Migration
{
	public function up()
	{
		$this->db->query("
			ALTER TABLE meetings
			DROP FOREIGN KEY fk_meetings_receiver_id
		");

		$this->db->query("
			ALTER TABLE meetings
			DROP CHECK chk_meetings_fk_provider_receiver_difference
		");

		$this->forge->dropColumn('meetings', 'receiver_id');
	}

	public function down()
	{
		$this->forge->addColumn('meetings', [
			'receiver_id' => [
				'type'       => 'INT',
				'constraint' => 11,
				'unsigned'   => true,
				'after'      => 'provider_id',
			],
		]);

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
}