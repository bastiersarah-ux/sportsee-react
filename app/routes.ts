import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout/default-layout.tsx", [
    index("pages/dashboard.tsx"),
    route("profile", "./pages/profile.tsx"),
  ]),
  route("login", "./pages/login.tsx"),
  route("*", "./pages/error.tsx"),
] satisfies RouteConfig;
