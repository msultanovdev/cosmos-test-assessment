import ChartPage from "./Pages/ChartPage/ChartPage";
import MapPage from "./Pages/MapPage/MapPage";
import NotFound from "./Pages/NotFound/NotFound";

export const rootRoutes = [
  {
    path: "/",
    Component: ChartPage,
  },
  {
    path: "/map",
    Component: MapPage,
  },
  {
    path: "*",
    Component: NotFound,
  },
];
