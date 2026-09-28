import AccountView from "@/app/components/auth/AccountView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Account | ZZEIM® Fashion" };

export default function AccountPage() {
  return <AccountView />;
}
