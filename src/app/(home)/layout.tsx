"use client";

import { ThemeProvider } from "./context/theme-context"; // Đường dẫn tương đối từ layout.tsx
import { SidebarProvider } from "./context/sidebar-context"; // Đường dẫn tương đối từ layout.tsx

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </SidebarProvider>
    </ThemeProvider>
  );
}
