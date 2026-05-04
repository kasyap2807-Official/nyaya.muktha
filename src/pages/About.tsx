import { Mail, Github, Twitter, Linkedin, Sparkles, Target, Eye, Heart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => (
  <Layout>
    <section className="bg-gradient-soft border-b border-border/60">
      <div className="container py-20 grid lg:grid-cols-[320px_1fr] gap-12 items-center">
        
        {/* Profile card */}
        <div className="bg-card rounded-3xl border border-border/60 p-7 shadow-elegant text-center lg:sticky lg:top-24">
          <div className="h-28 w-28 mx-auto rounded-full bg-gradient-hero grid place-items-center mb-4 shadow-glow">
            <span className="font-display text-4xl text-primary-foreground">M</span>
          </div>

          <h3 className="font-display text-xl font-semibold text-primary">Muktha Kulkarni</h3>

          <p className="text-sm text-accent font-medium mt-1">
            Law Graduate & Tech-Law Enthusiast
          </p>

          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            A passionate legal professional with a strong interest in technology law. 
            Born and brought up in Raichur, currently pursuing an LLM in Data Privacy and Information Technology
            while striving to make legal knowledge more accessible and impactful.
          </p>

          <div className="flex justify-center gap-2 mt-5">
              <a
                href="mukthakulkarni5@gmail.com"
                className="h-9 w-9 grid place-items-center rounded-full border border-border hover:bg-secondary hover:border-accent/40 transition-smooth"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/muktha-kulkarni-9ba645213"
                className="h-9 w-9 grid place-items-center rounded-full border border-border hover:bg-secondary hover:border-accent/40 transition-smooth"
              >
                <Linkedin className="h-4 w-4" />
              </a>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-medium mb-3">
            About
          </p>

          <h1 className="font-display text-5xl md:text-6xl text-primary mb-6 leading-[1.05] text-balance">
            Bridging law and <span className="italic text-accent">technology</span> for a better future.
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            With a foundation in law from Reva University, Bangalore, and currently pursuing 
            a final semester LLM in IT/Technology from Manipal College, I aim to contribute 
            to the evolving landscape of legal technology. My journey is driven by the belief 
            that law should be accessible, understandable, and beneficial for everyone.
          </p>
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="container py-20">
      <div className="rounded-3xl bg-gradient-hero p-10 md:p-16 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative max-w-3xl">
          <Sparkles className="h-7 w-7 text-accent mb-5" />
          <p className="font-display text-3xl md:text-5xl text-primary-foreground leading-tight text-balance">
            "To bridge the gap between law and technology while making legal knowledge more accessible."
          </p>
          <p className="text-primary-foreground/70 mt-5">— My Mission</p>
        </div>
      </div>
    </section>

    {/* Pillars */}
    <section className="container pb-20 grid md:grid-cols-3 gap-5">
      {[
        {
          icon: Heart,
          title: "Why this journey",
          body: "Driven by a passion for justice and technology, aiming to simplify legal understanding for everyone regardless of their background.",
        },
        {
          icon: Eye,
          title: "Vision",
          body: "To contribute to a future where legal systems are transparent, accessible, and enhanced by modern technology.",
        },
        {
          icon: Target,
          title: "Future Goals",
          body: "Specializing in IT and technology law, contributing to legal tech innovations, and supporting digital legal awareness.",
        },
      ].map((p) => (
        <div
          key={p.title}
          className="bg-card rounded-2xl border border-border/60 p-7 hover:shadow-elegant transition-smooth"
        >
          <div className="h-11 w-11 rounded-xl bg-accent-soft text-accent grid place-items-center mb-4">
            <p.icon className="h-5 w-5" />
          </div>
          <h3 className="font-display text-xl font-semibold text-primary mb-2">
            {p.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
        </div>
      ))}
    </section>

    {/* CTA */}
    <section className="container pb-24">
      <div className="rounded-3xl border border-border/60 bg-secondary/40 p-10 md:p-14 text-center">
        <h2 className="font-display text-4xl text-primary mb-3 text-balance">
          Ready to explore legal knowledge?
        </h2>
        <p className="text-muted-foreground mb-7 max-w-xl mx-auto">
          Learn, explore, and understand law in a simple way.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/chat">Start Chat</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/search">Browse Topics</Link>
          </Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;