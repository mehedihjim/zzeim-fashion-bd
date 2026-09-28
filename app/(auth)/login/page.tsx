import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/app/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign in | ZZEIM® Fashion" };

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
