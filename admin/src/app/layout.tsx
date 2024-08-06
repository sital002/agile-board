import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Agile Board | Admin",
  description:
    "This is a simple admin dashboard for Agile Board. It is built using Next.js (App Router). It can be used to manage the users, projects, and tasks of the Agile Board. It is a simple and easy-to-use dashboard that can be used by the admin to manage the Agile Board.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <>{children}</>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
