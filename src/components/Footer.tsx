import { Link } from "react-router-dom";
import { Scale, Mail, Github, Twitter } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-background mt-20">
    <div className="container py-14 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2 max-w-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="h-9 w-9 rounded-xl bg-gradient-hero grid place-items-center">
            <Scale className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.2} />
          </div>
          <div>
            <div className="font-display text-lg font-semibold">NyayaAI</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground -mt-0.5">Indian Legal AI</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Making Indian legal knowledge accessible, simple, and affordable through artificial intelligence.
        </p>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3 text-sm">Explore</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/chat" className="hover:text-foreground transition-smooth">AI Chat</Link></li>
          <li><Link to="/search" className="hover:text-foreground transition-smooth">Legal Topics</Link></li>
          <li><Link to="/about" className="hover:text-foreground transition-smooth">About</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3 text-sm">Connect</h4>
        <div className="flex gap-2">
          {[Mail, Twitter, Github].map((I, i) => (
            <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full border border-border hover:bg-secondary transition-smooth">
              <I className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="border-t border-border/60">
      <div className="container py-5 flex flex-col sm:flex-row gap-2 justify-between text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} NyayaAI. Built for Bharat.</span>
        <span>Information provided is general guidance, not legal advice.</span>
      </div>
    </div>
  </footer>
);
