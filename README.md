import React from "react";
import { motion } from "framer-motion";
import {
  Cpu, Sparkles, ShieldCheck, Bot, PhoneCall, Mail, MapPin, Rocket, Workflow,
  LineChart, Globe2, Layers, GitBranch, Star, Users, Briefcase, CheckCircle2,
  BookOpen, UserPlus, ScrollText
} from "lucide-react";

// =============================
// HUSSNAIN'S TECH CREATION PVT LTD.
// Ultra-premium single-file React website with Blog, Careers, Privacy, Terms
// Deployment: Replit, Vercel, Netlify, GitHub Pages
// =============================

// Helpers
const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, eyebrow, title, subtitle, children, className = "" }) => (
  <section id={id} className={`py-16 sm:py-24 ${className}`}>
    <Container>
      {(eyebrow || title || subtitle) && (
        <div className="mb-10 flex flex-col gap-3 text-center">
          {eyebrow && (
            <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-sm tracking-widest uppercase text-gray-500">{eyebrow}</motion.div>
          )}
          {title && (
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">{title}</motion.h2>
          )}
          {subtitle && (
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</motion.p>
          )}
        </div>
      )}
      {children}
    </Container>
  </section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-white/50 backdrop-blur border-gray-200">{children}</span>
);

const Card = ({ icon: Icon, title, desc }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="group block rounded-2xl border border-gray-200 bg-white/80 backdrop-blur shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all p-6">
    <div className="flex items-center gap-3">
      {Icon && <div className="rounded-xl p-2 border bg-white"><Icon className="w-5 h-5" /></div>}
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{desc}</p>
  </motion.div>
);

// Nav items
const nav = [
  { label: "Solutions", href: "#solutions" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

// Blog
const Blog = () => (
  <Section id="blog" eyebrow="Blog" title="Insights & Updates"
    subtitle="Latest articles on AI, technology, and our work.">
    <div className="grid md:grid-cols-3 gap-6">
      <Card icon={BookOpen} title="The Future of AI Agents" desc="How retrieval-augmented agents change enterprise workflows." />
      <Card icon={Cpu} title="Scaling MLOps" desc="Practical lessons from deploying ML models across industries." />
      <Card icon={Sparkles} title="Designing Human-Centered AI" desc="Why user experience matters as much as model accuracy." />
    </div>
  </Section>
);

// Careers
const Careers = () => (
  <Section id="careers" eyebrow="Careers" title="Join our team"
    subtitle="We’re hiring world-class talent in AI engineering, design, and operations.">
    <div className="grid md:grid-cols-2 gap-6">
      <Card icon={UserPlus} title="AI Engineer" desc="Build, fine-tune, and ship LLM-powered applications." />
      <Card icon={Briefcase} title="Product Designer" desc="Shape delightful experiences for enterprise AI tools." />
    </div>
    <div className="mt-8 text-center">
      <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 text-white px-5 py-3 font-semibold hover:shadow-md">
        <Sparkles className="w-4 h-4" /> Apply now
      </a>
    </div>
  </Section>
);

// Legal
const Legal = () => (
  <Section id="legal" eyebrow="Legal" title="Privacy & Terms"
    subtitle="Our commitments to users, clients, and partners.">
    <div className="grid md:grid-cols-2 gap-6 text-left">
      <div className="rounded-2xl border bg-white/70 backdrop-blur p-6">
        <div className="flex items-center gap-2 mb-3"><ScrollText className="w-5 h-5" /><h3 className="font-bold">Privacy Policy</h3></div>
        <p className="text-sm text-gray-600">We respect your privacy. No data is sold or shared without consent. Client data is encrypted and secured following SOC2/ISO standards.</p>
      </div>
      <div className="rounded-2xl border bg-white/70 backdrop-blur p-6">
        <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-5 h-5" /><h3 className="font-bold">Terms of Service</h3></div>
        <p className="text-sm text-gray-600">Use of our services is governed by mutual agreements. Engagements include SLAs, confidentiality, and compliance terms as required.</p>
      </div>
    </div>
  </Section>
);

// Navbar
const NavBar = () => (
  <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
    <Container className="flex items-center justify-between h-16">
      <a href="#home" className="flex items-center gap-2">
        <div className="relative">
          <span className="absolute inset-0 blur-lg opacity-30 bg-gradient-to-r from-blue-300 to-purple-300 rounded-xl" />
          <div className="relative rounded-xl border bg-white px-3 py-1.5 text-sm font-extrabold tracking-tight">HTC • AI</div>
        </div>
        <span className="sr-only">HUSSNAIN'S TECH CREATION PVT LTD.</span>
      </a>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {nav.map((n) => (<a key={n.href} href={n.href} className="hover:text-gray-900 text-gray-600">{n.label}</a>))}
      </nav>
      <a href="#contact" className="hidden sm:inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold hover:shadow-md">
        <PhoneCall className="w-4 h-4" /> Talk to us
      </a>
    </Container>
  </header>
);

// Placeholder sections
const Hero = () => <Section id="home" title="Welcome to HTC • AI" subtitle="Innovating with Artificial Intelligence for the future." />;
const Solutions = () => <Section id="solutions" title="Our Solutions" subtitle="AI-driven services tailored for your business." />;
const AILab = () => <Section id="ai-lab" title="AI Lab" subtitle="Experiment, prototype, and deploy state-of-the-art AI." />;
const CaseStudies = () => <Section id="case-studies" title="Case Studies" subtitle="Proven impact across industries with measurable results." />;
const TechStack = () => <Section id="tech-stack" title="Technology Stack" subtitle="We use modern, scalable, and robust technologies." />;
const Pricing = () => <Section id="pricing" title="Pricing" subtitle="Flexible pricing plans to fit your needs." />;
const About = () => <Section id="about" title="About Us" subtitle="Meet the team behind HTC • AI." />;
const Contact = () => (
  <Section id="contact" title="Contact Us" subtitle="We’d love to hear from you.">
    <div className="flex flex-col items-center gap-4">
      <a href="mailto:info@htc.com" className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4" /> info@htc.com</a>
      <a href="tel:+123456789" className="flex items-center gap-2 text-gray-700"><PhoneCall className="w-4 h-4" /> +1 (234) 567-89</a>
      <div className="flex items-center gap-2 text-gray-700"><MapPin className="w-4 h-4" /> Global Offices</div>
    </div>
  </Section>
);

// Footer
const Footer = () => (
  <footer className="border-t border-gray-200 bg-white">
    <Container className="py-10">
      <div className="grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-extrabold">HUSSNAIN'S TECH CREATION PVT LTD.</div>
          <p className="mt-2 text-gray-600">Advanced Technology & AI development company—designed for impact.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-1 text-gray-600">
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#blog" className="hover:underline">Blog</a></li>
            <li><a href="#careers" className="hover:underline">Careers</a></li>
            <li><a href="#pricing" className="hover:underline">Pricing</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Services</div>
          <ul className="space-y-1 text-gray-600">
            <li><a href="#solutions" className="hover:underline">Solutions</a></li>
            <li><a href="#ai-lab" className="hover:underline">AI Lab</a></li>
            <li><a href="#case-studies" className="hover:underline">Case Studies</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Legal</div>
          <ul className="space-y-1 text-gray-600">
            <li><a href="#legal" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#legal" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
        <div>© {new Date().getFullYear()} HUSSNAIN'S TECH CREATION PVT LTD. All rights reserved.</div>
        <div className="flex items-center gap-3"><Cpu className="w-3.5 h-3.5" /> Built with performance & accessibility in mind.</div>
      </div>
    </Container>
  </footer>
);

// Main export
export default function Website() {
  return (
    <div className="antialiased text-gray-900">
      <NavBar />
      <Hero />
      <Solutions />
      <AILab />
      <CaseStudies />
      <TechStack />
      <Pricing />
      <About />
      <Blog />
      <Careers />
      <Contact />
      <Legal />
      <Footer />
    </div>
  );
}