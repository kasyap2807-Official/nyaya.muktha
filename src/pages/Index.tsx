import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, BookOpen, ShieldCheck, Sparkles, Scale, Gavel, Users, Home, ShoppingBag, Globe2, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import heroImg from "@/assets/hero-law.jpg";

const categories = [
  { icon: Scale, title: "Constitution of India", desc: "Fundamental rights, duties & directive principles" },
  { icon: Gavel, title: "Criminal Law", desc: "IPC, CrPC, FIR procedures & bail" },
  { icon: FileText, title: "Civil Law", desc: "Contracts, torts & civil remedies" },
  { icon: Users, title: "Family Law", desc: "Marriage, divorce, custody & maintenance" },
  { icon: Home, title: "Property Law", desc: "Inheritance, registration & disputes" },
  { icon: ShoppingBag, title: "Consumer Rights", desc: "Complaints under Consumer Protection Act" },
  { icon: Globe2, title: "Cyber Law", desc: "IT Act 2000, online fraud & data privacy" },
  { icon: BookOpen, title: "RTI & Governance", desc: "Right to Information & public services" },
];

const blogs = [
  { tag: "Family Law", title: "How to file for mutual consent divorce in India", read: "6 min read", author: "Adv. Priya Sharma" },
  { tag: "Criminal", title: "Your rights when arrested: A citizen's guide", read: "8 min read", author: "Adv. Rohan Mehta" },
  { tag: "Consumer", title: "Filing a consumer complaint online — step by step", read: "5 min read", author: "Adv. Anjali Iyer" },
];

const Index = () => (
  <Layout>
    {/* HERO */}
    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="container py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-soft border border-accent/20 mb-6">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent-foreground/80">Based on Indian legal framework</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.02] text-balance text-primary">
            AI Lawyer for <span className="italic text-accent">Indian</span> Legal Needs
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl text-balance leading-relaxed">
            Get instant answers, legal guidance, and expert‑written blogs — simplified for everyone, in plain language.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/chat">Start Chat <ArrowRight className="ml-1" /></Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/search">Explore Legal Topics</Link>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Confidential</div>
            <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> Instant</div>
            <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-accent" /> Lawyer‑reviewed</div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-elegant">
            <img src={heroImg} alt="Indian law books with brass scales of justice" width={1600} height={1200} className="w-full h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-accent/10" />
          </div>
          {/* Floating quick chat */}
          <div className="absolute -bottom-6 -left-6 md:-left-10 max-w-[280px] bg-card rounded-2xl shadow-elegant p-4 border border-border/60">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 rounded-full bg-gradient-saffron grid place-items-center"><Sparkles className="h-3.5 w-3.5 text-accent-foreground" /></div>
              <span className="text-xs font-semibold">NyayaAI</span>
              <span className="ml-auto flex gap-1 animate-typing"><span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /><span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /><span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /></span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">An FIR is a written document prepared by police when they receive information about a cognizable offence under Section 154 CrPC…</p>
          </div>
        </div>
      </div>
    </section>

    {/* CATEGORIES */}
    <section className="container py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium mb-3">Areas of Law</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary max-w-2xl text-balance">Explore Indian law by category</h2>
        </div>
        <Link to="/search" className="text-sm font-medium text-primary hover:text-accent transition-smooth inline-flex items-center gap-1">
          View all topics <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((c, i) => (
          <Link key={c.title} to="/search" className="group bg-gradient-card rounded-2xl p-6 border border-border/60 hover:border-accent/40 hover:shadow-elegant transition-smooth animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="h-11 w-11 rounded-xl bg-secondary group-hover:bg-accent group-hover:text-accent-foreground grid place-items-center mb-4 transition-smooth">
              <c.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-primary mb-1">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
          </Link>
        ))}
      </div>
    </section>

    {/* CHAT PREVIEW */}
    <section className="container py-20">
      <div className="rounded-3xl bg-gradient-hero p-8 md:p-14 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
        <div className="grid lg:grid-cols-2 gap-10 items-center relative">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium mb-3">Quick AI Chat</p>
            <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4 text-balance">Ask a legal question. Get an answer in seconds.</h2>
            <p className="text-primary-foreground/70 text-lg mb-8 max-w-md">Trained on Indian statutes, case law, and procedure. Available 24/7 in plain English.</p>
            <Button asChild variant="hero" size="lg"><Link to="/chat">Open chat <MessageSquare className="ml-1" /></Link></Button>
          </div>
          <div className="bg-card rounded-2xl p-5 shadow-elegant border border-white/10">
            <div className="space-y-3 mb-4">
              <div className="flex justify-end"><div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[80%]">What is FIR in India?</div></div>
              <div className="flex"><div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[85%] leading-relaxed">A First Information Report (FIR) is filed under Section 154 CrPC when a cognizable offence occurs. You can file it at any police station…</div></div>
            </div>
            <div className="flex items-center gap-2 bg-secondary/60 rounded-full p-1.5 pl-4">
              <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Ask your legal question…" disabled />
              <Button size="icon" variant="navy" className="h-9 w-9"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* BLOGS */}
    <section className="container py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium mb-3">From the Bench</p>
          <h2 className="font-display text-4xl md:text-5xl text-primary max-w-2xl text-balance">Featured blogs by practising lawyers</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {blogs.map((b, i) => (
          <article key={b.title} className="group bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-elegant transition-smooth">
            <div className="h-44 bg-gradient-soft relative overflow-hidden">
              <div className="absolute inset-0 grid place-items-center font-display text-7xl text-primary/10">{i + 1}</div>
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-widest font-semibold bg-card px-2.5 py-1 rounded-full text-accent border border-accent/20">{b.tag}</span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-primary mb-3 leading-tight group-hover:text-accent transition-smooth">{b.title}</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{b.author}</span>
                <span>{b.read}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    {/* TRUST */}
    <section className="container pb-20">
      <div className="rounded-2xl bg-secondary/60 border border-border/60 p-8 md:p-10 flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
        <div className="h-14 w-14 rounded-2xl bg-gradient-saffron grid place-items-center shrink-0">
          <ShieldCheck className="h-7 w-7 text-accent-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-2xl text-primary">Built on the Indian legal framework</h3>
          <p className="text-muted-foreground mt-1">Every answer is grounded in IPC, CrPC, the Constitution, and Supreme Court precedent — reviewed by qualified Indian advocates.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
