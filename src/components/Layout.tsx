import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">{children}</main>
    {!hideFooter && <Footer />}
  </div>
);
