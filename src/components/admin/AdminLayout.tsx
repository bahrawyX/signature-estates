"use client";
import * as React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ToastProvider } from "@/components/admin/Toast";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[var(--color-cream)]">
        <AdminSidebar />
        <main className="lg:ml-64 min-h-screen">
          <div className="px-6 lg:px-10 py-8 lg:py-12 max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
