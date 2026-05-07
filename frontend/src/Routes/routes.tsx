import HomeRoutes from "./HomeRoutes";
import type { RouteObject } from "react-router-dom";
import MeetingsRoutes from "./MeetingsRoutes";

const routes: RouteObject[] =
[
	...HomeRoutes,
	...MeetingsRoutes
];

export default routes;