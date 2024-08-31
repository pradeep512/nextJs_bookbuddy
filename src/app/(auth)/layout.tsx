"use client";

import Link from "next/link";
import "../global.css";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";

const navLinks = [
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
  { name: "forgot-password", href: "/forgot-password" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthProvider>
      <div>
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              href={link.href}
              key={link.name}
              className={isActive ? "font-bold mr-4" : "font-blue mr-4"}
            >
              {link.name}
            </Link>
          );
        })}
        {children}
      </div>
    </AuthProvider>
  );
}
