"use client";

import { ThemeProvider } from "../../context/theme-context";
import { SidebarProvider } from "../../context/sidebar-context";
import { Toaster } from "sonner";
import "react-confirm-alert/src/react-confirm-alert.css"; 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <html lang="en">
          <body>
            <Toaster position="top-right" richColors />
            {children}
          </body>
        </html>
      </SidebarProvider>
    </ThemeProvider>
  );
}
