import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Signature Estates",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// Always render fresh — admin data must never be statically cached.
export const dynamic = "force-dynamic";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pass-through layout. The (panel)/ route group adds the sidebar shell,
  // while /admin/login renders without it.
  return <>{children}</>;
}
