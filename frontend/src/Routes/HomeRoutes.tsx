import Index from "../Home/Index";
import Login from "../Home/Login";
import Register from "../Home/Register";
import Logout from "../Home/Logout";
import type { RouteObject } from "react-router-dom";

const HomeRoutes: RouteObject[] =
[
	{
		path:    "/",
		element: <Index />
	},
	{
		path:    "/home",
		element: <Index />
	},
	{
		path:    "/register",
		element: <Register />
	},
	{
		path:    "/login",
		element:  <Login />
	},
	{
		path: "/logout",
		element: <Logout />
	}
];

export default HomeRoutes;