import type { Metadata } from "next";
import { LoginClient } from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In · Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <LoginClient />;
}
