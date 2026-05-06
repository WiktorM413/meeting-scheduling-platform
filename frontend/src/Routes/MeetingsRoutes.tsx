import type { RouteObject } from "react-router-dom";
import Index from "../Meetings/Index";
import Schedule from "../Meetings/Schedule";

const MeetingsRoutes: RouteObject[] =
[
	{
		path:    "/meetings",
		element: <Index />
	},
	{
		path:    "/schedule",
		element: <Schedule />
	}
]

export default MeetingsRoutes;