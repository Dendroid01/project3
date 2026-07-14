import type { Route } from "./+types/dashboard";
import DashboardPage from "~/components/Dashboard/Dashboard";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Dashboard" },
        { name: "description", content: "Dashboard" },
    ];
}

export default function Dashboard() {
    return <DashboardPage />;
}