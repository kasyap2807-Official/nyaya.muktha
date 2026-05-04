// import { Link, NavLink, useLocation } from "react-router-dom";
// import { Scale, Menu, X } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// const links = [
//   { to: "/", label: "Home" },
//   { to: "/chat", label: "AI Chat" },
//   { to: "/search", label: "Legal Topics" },
//   { to: "/about", label: "About" },
// ];

// export const Header = () => {
//   const [open, setOpen] = useState(false);
//   const { pathname } = useLocation();
//   const onChat = pathname === "/chat";

//   return (
//     <header className={cn(
//       "sticky top-0 z-40 w-full border-b border-border/60 backdrop-blur-xl",
//       onChat ? "bg-background" : "bg-background/80"
//     )}>
//       <div className="container flex h-16 items-center justify-between">
//         <Link to="/" className="flex items-center gap-2.5 group">
//           <div className="relative h-9 w-9 rounded-xl bg-gradient-hero grid place-items-center shadow-soft group-hover:shadow-glow transition-smooth">
//             <Scale className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.2} />
//             <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
//           </div>
//           <div className="leading-tight">
//             <div className="font-display text-lg font-semibold text-foreground">NyayaAI</div>
//             <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground -mt-0.5">Indian Legal AI</div>
//           </div>
//         </Link>

//         <nav className="hidden md:flex items-center gap-1">
//           {links.map((l) => (
//             <NavLink
//               key={l.to}
//               to={l.to}
//               end={l.to === "/"}
//               className={({ isActive }) => cn(
//                 "px-4 py-2 text-sm rounded-full transition-smooth",
//                 isActive ? "text-primary bg-secondary font-medium" : "text-muted-foreground hover:text-foreground"
//               )}
//             >
//               {l.label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="hidden md:flex items-center gap-2">
//           {/* <Button asChild variant="ghost" size="sm"><Link to="/auth">Sign in</Link></Button>
//           <Button asChild variant="hero" size="sm"><Link to="/auth">Get Started</Link></Button> */}
//         </div>

//         <button className="md:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setOpen(!open)} aria-label="Menu">
//           {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </button>
//       </div>

//       {open && (
//         <div className="md:hidden border-t border-border/60 bg-background animate-fade-up">
//           <div className="container py-4 flex flex-col gap-1">
//             {links.map((l) => (
//               <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}
//                 className={({ isActive }) => cn("px-4 py-3 rounded-lg text-sm", isActive ? "bg-secondary text-primary font-medium" : "text-muted-foreground")}>
//                 {l.label}
//               </NavLink>
//             ))}
//             <div className="flex gap-2 pt-2">
//               {/* <Button asChild variant="outline" className="flex-1"><Link to="/auth" onClick={() => setOpen(false)}>Sign in</Link></Button>
//               <Button asChild variant="hero" className="flex-1"><Link to="/auth" onClick={() => setOpen(false)}>Get Started</Link></Button> */}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

import { Link, NavLink, useLocation } from "react-router-dom";
import { Scale, Home, MessageSquare, BookOpen, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/",       label: "Home",         icon: Home          },
  { to: "/chat",   label: "AI Chat",      icon: MessageSquare },
  { to: "/search", label: "Legal Topics", icon: BookOpen      },
  { to: "/about",  label: "About",        icon: Info          },
];

export const Header = () => {
  const { pathname } = useLocation();
  const onChat = pathname === "/chat";

  return (
    <>
      {/* ── Top header (always visible) ── */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b border-border/60 backdrop-blur-xl",
          onChat ? "bg-background" : "bg-background/80"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-gradient-hero grid place-items-center shadow-soft group-hover:shadow-glow transition-smooth">
              <Scale className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.2} />
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold text-foreground">NyayaAI</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground -mt-0.5">
                Indian Legal AI
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 text-sm rounded-full transition-smooth",
                    isActive
                      ? "text-primary bg-secondary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA placeholder */}
          <div className="hidden md:flex items-center gap-2" />
        </div>
      </header>

      {/* ── Mobile bottom navigation bar ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/60">
        <div className="flex items-stretch h-16">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex-1 flex flex-col items-center justify-center gap-1 text-[10px] transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      "h-7 w-7 rounded-xl grid place-items-center transition-colors",
                      isActive && "bg-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={isActive ? 2.4 : 1.8} />
                  </div>
                  <span className="leading-none">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Safe area spacer (iOS home indicator) */}
        <div className="h-safe-bottom bg-background/95" />
      </nav>
    </>
  );
};