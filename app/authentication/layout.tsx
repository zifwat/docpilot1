import "./globals.css";
import { ReactNode } from "react";
import HeaderLogin from "@/components/headerlogin";

interface Props {
  children: ReactNode;
}

export default function AuthenticationLayout({
  children,
}: Props) {
  return (
    <div>
      <HeaderLogin />
      {children}</div>
  );
};
