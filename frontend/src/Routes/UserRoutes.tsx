import type { RouteObject } from "react-router-dom";
import UserProfile from "../User/UserProfile";

const UserRoutes: RouteObject[] =
[
	{
		path:    "/userProfile/:userId",
		element: <UserProfile />
	}
]

export default UserRoutes;