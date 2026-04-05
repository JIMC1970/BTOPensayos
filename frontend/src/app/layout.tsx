import type { Metadata } from "next";
import "./globals.css";
import PageHeader from "@/components/Header";
import { AppProvider } from "@/context/AppContext";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "BTOP.AI",
  description: "BTOP.AI official page",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userCookie = (await cookies()).get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;
  return (
    <html lang="es">
      <body>
        <AppProvider initialUser={user}>
          <PageHeader />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
