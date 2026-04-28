import Index from "../Home/Index";
import type { RouteObject } from "react-router-dom";

const HomeRoutes: RouteObject[] =
[
	{
		path: "/home",
		element: <Index />,
	},
];

export default HomeRoutes;