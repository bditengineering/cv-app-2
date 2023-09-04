import NavBar from "@/components/Navbar";
import Container from "@/components/ui/container";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const dynamic = "force-dynamic";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("signin");
  }

  return (
    <>
      <NavBar />
      <Container className="py-6">{children}</Container>
    </>
  );
};

export default Layout;
