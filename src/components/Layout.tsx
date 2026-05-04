// import { Header } from "./Header";
// import { Footer } from "./Footer";

// export const Layout = ({ children, hideFooter = false }: { children: React.ReactNode; hideFooter?: boolean }) => (
//   <div className="min-h-screen flex flex-col bg-background">
//     <Header />
//     <main className="flex-1">{children}</main>
//     {!hideFooter && <Footer />}
//   </div>
// );

import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({
  children,
  hideFooter = false,
}: {
  children: React.ReactNode;
  hideFooter?: boolean;
}) => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />

    {/*
      On mobile we add pb-16 (+ safe area) so content isn't hidden
      behind the fixed bottom nav bar.
      On md+ the bottom nav is hidden so no extra padding needed.
    */}
    <main className="flex-1 pb-16 md:pb-0">{children}</main>

    {/* Footer: hidden on mobile (bottom nav takes its place) */}
    {!hideFooter && (
      <div className="hidden md:block">
        <Footer />
      </div>
    )}
  </div>
);