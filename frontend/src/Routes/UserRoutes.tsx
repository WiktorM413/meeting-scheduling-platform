import type { RouteObject } from "react-router-dom";
import UserProfile from "../User/UserProfile";
import UserSettings from "../User/UserSettings";

const UserRoutes: RouteObject[] =
[
	{
		path:    "/userProfile/:userId",
		element: <UserProfile />
	},
	{
		path:    "/userSettings/:userId",
		element: <UserSettings />
	}
]

export default UserRoutes;