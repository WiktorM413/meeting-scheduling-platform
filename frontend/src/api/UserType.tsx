import type { UserGroup } from "./UserGroup";

export interface UserData
{
	id:         number;
	firstname:  string;
	lastname:   string;
	email:      string;
	userGroup: UserGroup|undefined;
}