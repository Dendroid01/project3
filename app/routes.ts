import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/login.tsx"),
    route('register', 'routes/register.tsx'),

    layout("layouts/AuthLayout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
        route("favorites", "routes/favorites.tsx"),
    ]),
] satisfies RouteConfig;