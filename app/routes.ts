import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout/default-layout.tsx", [
    index("routes/dashboard.tsx"),
    route("profile", "./routes/profile.tsx"),
  ]),
  route("login", "./routes/login.tsx"),
  route("*", "./routes/404.tsx"),
] satisfies RouteConfig;
