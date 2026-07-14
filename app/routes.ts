import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),

    layout("layouts/AuthLayout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
    ]),
] satisfies RouteConfig;