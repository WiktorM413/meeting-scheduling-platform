import type { RouteObject } from "react-router-dom";
import UserProfile from "../User/UserProfile";
import UserSettings from "../User/UserSettings";
import UserSearch from "../User/UserSearch";

const UserRoutes: RouteObject[] =
[
	{
		path:    "/userProfile/:userId",
		element: <UserProfile />
	},
	{
		path:    "/userSettings/:userId",
		element: <UserSettings />
	},
	{
		path:    "/userSearch",
		element: <UserSearch />
	}
]

export default UserRoutes;