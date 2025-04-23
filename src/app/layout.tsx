import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "uiang",
  description: "Copy and use beautiful web UI animations instantly. Fluid, natural animations with Framer Motion and Tailwind CSS for exceptional user experiences.",
  keywords: [
    "UI animations",
    "Framer Motion",
    "Tailwind CSS",
    "web animation",
    "react animations",
    "copy animations",
    "uiang"
  ],
  authors: [{ name: "uiang" }],
  icons: {
    icon: "/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
