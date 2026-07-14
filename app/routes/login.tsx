import type { Route } from "./+types/login";
import LoginPage from "~/components/Login/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Sign in to your account" },
  ];
}

export default function Login() {
  return <LoginPage />;
}