import NavBar from "@/components/Navbar";
import Container from "@/components/ui/container";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavBar />
      <Container className="py-6">{children}</Container>
    </>
  );
};

export default Layout;
