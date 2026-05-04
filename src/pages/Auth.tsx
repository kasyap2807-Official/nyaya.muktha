import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scale, Mail, Lock, User, Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import justiceImg from "@/assets/justice-illustration.jpg";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: mode === "login" ? "Welcome back" : "Account created", description: "This is a UI preview — connect Lovable Cloud to enable auth." });
    navigate("/");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* LEFT — illustration */}
      <div className="hidden lg:flex relative bg-gradient-hero overflow-hidden p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="h-10 w-10 rounded-xl bg-card grid place-items-center shadow-glow">
            <Scale className="h-5 w-5 text-primary" strokeWidth={2.2} />
          </div>
          <div className="text-primary-foreground">
            <div className="font-display text-xl font-semibold">NyayaAI</div>
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-70">Indian Legal AI</div>
          </div>
        </Link>

        <div className="relative z-10 flex-1 grid place-items-center py-10">
          <img src={justiceImg} alt="Lady Justice illustration" className="max-h-[480px] w-auto rounded-2xl shadow-elegant" width={1024} height={1280} loading="lazy" />
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-4xl text-primary-foreground leading-tight text-balance">Your AI Legal Assistant for Indian Law</h2>
          <p className="mt-3 text-primary-foreground/70">Instant legal help, simplified for everyone.</p>
        </div>

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl" />
      </div>

      {/* RIGHT — form */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-gradient-hero grid place-items-center"><Scale className="h-5 w-5 text-primary-foreground" /></div>
            <span className="font-display text-xl font-semibold">NyayaAI</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft border border-accent/20 mb-5">
            <Sparkles className="h-3 w-3 text-accent" />
            <span className="text-[11px] font-medium">Welcome</span>
          </div>
          <h1 className="font-display text-4xl text-primary mb-2">{mode === "login" ? "Sign in to your account" : "Create your account"}</h1>
          <p className="text-muted-foreground mb-8">{mode === "login" ? "Continue your legal journey." : "Start with India's AI legal assistant."}</p>

          {/* Toggle */}
          <div className="bg-secondary rounded-full p-1 flex mb-7 text-sm">
            {(["login", "signup"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2 rounded-full transition-smooth font-medium ${mode === m ? "bg-card shadow-soft text-primary" : "text-muted-foreground"}`}>
                {m === "login" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <Field icon={User} label="Full name" type="text" placeholder="Aarav Sharma" />
            )}
            <Field icon={Mail} label="Email" type="email" placeholder="you@example.in" />
            {mode === "signup" && (
              <div>
                <Label className="text-xs font-medium mb-1.5 block">Mobile number</Label>
                <div className="flex gap-2">
                  <div className="px-3 h-11 grid place-items-center rounded-xl bg-secondary text-sm font-medium">+91</div>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="tel" placeholder="98765 43210" className="pl-9 h-11 rounded-xl" required />
                  </div>
                </div>
              </div>
            )}
            <Field icon={Lock} label="Password" type="password" placeholder="••••••••" />

            {mode === "login" && (
              <div className="text-right text-xs">
                <a href="#" className="text-muted-foreground hover:text-accent">Forgot password?</a>
              </div>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full">
              {mode === "login" ? "Sign in" : "Create account"} <ArrowRight />
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-2.5">
            <Button variant="outline" size="lg" className="w-full">
              <GoogleIcon /> Continue with Google
            </Button>
            <Button variant="ghost" size="lg" className="w-full" onClick={() => navigate("/")}>
              Continue as Guest
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-6">
            By continuing you agree to our <a className="underline">Terms</a> & <a className="underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

const Field = ({ icon: Icon, label, ...rest }: any) => (
  <div>
    <Label className="text-xs font-medium mb-1.5 block">{label}</Label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input {...rest} required className="pl-9 h-11 rounded-xl" />
    </div>
  </div>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.4 14.7 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 9.5-4.8 9.5-7.3 0-.5-.1-.9-.1-1.3H12z"/></svg>
);

export default Auth;
