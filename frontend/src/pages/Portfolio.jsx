import { useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Sparkles,
} from "lucide-react";
import {
  profile,
  skillGroups,
  experience,
  projects,
  education,
  navLinks,
} from "@/data/resume";
import NeuralCanvas from "@/components/NeuralCanvas";
import Counter from "@/components/Counter";
import ScrollProgress from "@/components/ScrollProgress";

const RESUME_URL = "/Ramesh_Murala_Resume.pdf";
const MAILTO = `mailto:${profile.email}`;
const LINKEDIN_URL = "https://www.linkedin.com/in/ramesh-murala/";

const ACCENT = "#5eead4";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Highlight % numbers inside resume bullets
const highlightMetrics = (text) =>
  text.split(/(\b\d+%|\b\d+\+?\s*(?:years?|yrs?))/gi).map((part, i) => {
    if (/^\d+%/.test(part) || /^\d+\+?\s*(years?|yrs?)/i.test(part)) {
      return (
        <span key={i} style={{ color: ACCENT }} className="font-mono text-[13.5px]">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });

// ---------- NAV ----------
const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" data-testid="site-header">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm text-white hover:opacity-70 transition-opacity flex items-center gap-2"
          data-testid="nav-logo"
        >
          <span className="relative inline-flex w-2 h-2">
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-50"
              style={{ background: ACCENT }}
            />
            <span
              className="relative w-2 h-2 rounded-full"
              style={{ background: ACCENT }}
            />
          </span>
          ramesh<span style={{ color: ACCENT }}>.</span>murala
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
              data-testid={`nav-link-${l.href.replace("#", "")}`}
            >
              {l.label.replace("~/", "")}
              <span
                className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: ACCENT }}
              />
            </a>
          ))}
        </nav>
        <a
          href={RESUME_URL}
          download
          className="hidden md:inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 px-3.5 py-2 rounded-full transition-all hover:scale-[1.03]"
          data-testid="nav-download-resume"
        >
          <Download size={13} /> Résumé
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-xs text-zinc-300 border border-zinc-800 px-3 py-1.5 rounded-full"
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-zinc-900 bg-[#0a0a0b]">
          <div className="px-6 py-5 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-zinc-300 hover:text-white"
                data-testid={`mobile-nav-link-${l.href.replace("#", "")}`}
              >
                {l.label.replace("~/", "")}
              </a>
            ))}
            <a
              href={RESUME_URL}
              download
              className="text-sm font-mono"
              style={{ color: ACCENT }}
              data-testid="mobile-nav-download-resume"
            >
              Download résumé →
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

// ---------- HERO ----------
const heroName = ["Venkata", "Sri", "Sai", "Ramesh", "Murala."];

const Hero = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  return (
    <section
      id="top"
      className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Animated neural canvas backdrop */}
      <div className="absolute inset-0 opacity-70">
        <NeuralCanvas density={42} />
      </div>
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,11,0.95) 100%)",
        }}
      />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative max-w-5xl mx-auto px-6 md:px-10"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase mb-10 border border-zinc-800 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-sm"
        >
          <span className="relative inline-flex w-1.5 h-1.5">
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: ACCENT }}
            />
            <span
              className="relative w-1.5 h-1.5 rounded-full"
              style={{ background: ACCENT }}
            />
          </span>
          <span style={{ color: ACCENT }}>Available for opportunities</span>
        </motion.div>

        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[1.02] tracking-[-0.04em] font-light text-white"
          data-testid="hero-name"
        >
          {heroName.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex items-center gap-3 text-lg text-zinc-300"
        >
          <Sparkles size={16} style={{ color: ACCENT }} />
          <span className="font-mono text-sm tracking-wider">
            Machine Learning Engineer · Memphis, TN
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed font-light"
          data-testid="hero-summary"
        >
          I design data-driven ML solutions across enterprise platforms —
          building production pipelines, RAG systems, and LLM applications on
          AWS. Currently at <span className="text-white">Intuit</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <MagneticButton>
            <a
              href={RESUME_URL}
              download
              className="group relative inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3.5 rounded-full hover:bg-zinc-100 transition-colors overflow-hidden"
              data-testid="hero-download-resume"
            >
              <Download size={15} />
              Download résumé
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 30%, rgba(94,234,212,0.25) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.4s ease-in-out infinite",
                }}
              />
            </a>
          </MagneticButton>
          <a
            href={MAILTO}
            className="group inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white px-2 py-3.5 transition-colors"
            data-testid="hero-mailto"
          >
            Get in touch
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

// Magnetic button wrapper
const MagneticButton = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

// ---------- METRICS STRIP ----------
const metrics = [
  { value: 4, suffix: "+", label: "Years of experience", sub: "ML · NLP · LLM" },
  { value: 36, suffix: "%", label: "Faster knowledge lookup", sub: "with RAG pipelines" },
  { value: 34, suffix: "%", label: "Prediction accuracy lift", sub: "on AWS SageMaker" },
  { value: 28, suffix: "%", label: "Lower inference latency", sub: "Lambda + API GW" },
];

const Metrics = () => (
  <section
    className="relative py-16 md:py-20 border-y border-zinc-900"
    data-testid="metrics-section"
  >
    <div className="max-w-6xl mx-auto px-6 md:px-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <div
              className="text-4xl md:text-5xl font-light tracking-[-0.03em]"
              style={{ color: ACCENT }}
            >
              <Counter value={m.value} suffix={m.suffix} />
            </div>
            <div className="mt-3 text-sm text-zinc-200">{m.label}</div>
            <div className="mt-0.5 font-mono text-[11px] tracking-wider uppercase text-zinc-500">
              {m.sub}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ---------- SECTION HEAD ----------
const SectionHead = ({ kicker, title }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="mb-14 md:mb-20"
  >
    <div className="flex items-center gap-3 mb-5">
      <span
        className="h-px w-8"
        style={{ background: ACCENT }}
      />
      <div
        className="font-mono text-xs tracking-[0.25em] uppercase"
        style={{ color: ACCENT }}
      >
        {kicker}
      </div>
    </div>
    <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-[-0.03em] font-light text-white max-w-2xl">
      {title}
    </h2>
  </motion.div>
);

// ---------- ABOUT ----------
const About = () => (
  <section
    id="about"
    className="relative py-24 md:py-32 border-t border-zinc-900"
    data-testid="about-section"
  >
    <div className="max-w-5xl mx-auto px-6 md:px-10">
      <SectionHead kicker="About" title="A short introduction." />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="grid md:grid-cols-3 gap-10 md:gap-16"
      >
        <p className="md:col-span-2 text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
          {profile.summary}
        </p>
        <dl className="space-y-6 text-sm">
          <Detail label="Currently" value="ML Engineer, Intuit" />
          <Detail label="Experience" value="4+ years" />
          <Detail label="Based in" value="Memphis, TN" />
          <Detail label="Focus" value="ML · LLM · RAG · AWS" />
        </dl>
      </motion.div>
    </div>
  </section>
);

const Detail = ({ label, value }) => (
  <div className="group cursor-default">
    <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500 mb-1.5">
      {label}
    </dt>
    <dd className="text-zinc-200 group-hover:text-white transition-colors">
      {value}
    </dd>
  </div>
);

// ---------- EXPERIENCE ----------
const Experience = () => (
  <section
    id="experience"
    className="relative py-24 md:py-32 border-t border-zinc-900"
    data-testid="experience-section"
  >
    <div className="max-w-5xl mx-auto px-6 md:px-10">
      <SectionHead kicker="Experience" title="Where I've worked." />
      <div className="space-y-16 md:space-y-24">
        {experience.map((job, idx) => (
          <motion.article
            key={job.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.06 }}
            className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 group"
            data-testid={`experience-${idx}`}
          >
            <div className="font-mono text-xs tracking-wider text-zinc-500 md:pt-1.5">
              {job.period}
              {job.status === "ACTIVE" && (
                <div
                  className="mt-2 inline-flex items-center gap-1.5 text-[10px]"
                  style={{ color: ACCENT }}
                >
                  <span className="relative inline-flex w-1.5 h-1.5">
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: ACCENT }}
                    />
                    <span
                      className="relative w-1.5 h-1.5 rounded-full"
                      style={{ background: ACCENT }}
                    />
                  </span>
                  Current
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl text-white font-normal tracking-tight">
                {job.role}
                <span className="text-zinc-500"> · </span>
                <span
                  className="relative inline-block"
                  style={{ color: ACCENT }}
                >
                  {job.company}
                </span>
              </h3>
              <ul className="mt-6 space-y-3.5">
                {job.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="flex gap-3 text-[15px] text-zinc-400 leading-relaxed font-light"
                  >
                    <span className="text-zinc-700 mt-2.5 w-1 h-1 rounded-full bg-zinc-700 flex-shrink-0 group-hover:bg-[var(--accent)] transition-colors" />
                    <span>{highlightMetrics(b)}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

// ---------- SKILLS ----------
const Skills = () => (
  <section
    id="skills"
    className="relative py-24 md:py-32 border-t border-zinc-900"
    data-testid="skills-section"
  >
    <div className="max-w-5xl mx-auto px-6 md:px-10">
      <SectionHead kicker="Skills" title="Tools I work with." />
      <div className="space-y-10 md:space-y-12">
        {skillGroups.map((g, idx) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.04 }}
            className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-12 pb-10 md:pb-12 border-b border-zinc-900 last:border-b-0 last:pb-0 group"
            data-testid={`skill-group-${idx}`}
          >
            <h3 className="text-base md:text-lg text-white font-normal group-hover:translate-x-1 transition-transform">
              {g.label}
            </h3>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5">
              {g.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  className="text-sm text-zinc-400 font-light hover:text-white transition-colors cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ---------- PROJECTS ----------
const Projects = () => (
  <section
    id="projects"
    className="relative py-24 md:py-32 border-t border-zinc-900"
    data-testid="projects-section"
  >
    <div className="max-w-5xl mx-auto px-6 md:px-10">
      <SectionHead kicker="Projects" title="Selected work." />
      <div className="grid md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900 rounded-sm overflow-hidden">
        {projects.map((p, idx) => (
          <ProjectCard key={p.id} project={p} idx={idx} />
        ))}
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [3, -3]);
  const rotateY = useTransform(x, [-50, 50], [-3, 3]);

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: idx * 0.08 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative bg-[#0a0a0b] p-8 md:p-10 hover:bg-[#111113] transition-colors group cursor-default"
      data-testid={`project-${idx}`}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase"
          style={{ color: ACCENT }}
        >
          {project.tag}
        </span>
        <span className="font-mono text-[10px] text-zinc-700">
          / {project.id}
        </span>
      </div>
      <h3 className="mt-6 text-xl md:text-2xl text-white font-normal tracking-tight leading-snug">
        {project.title}
      </h3>
      <p className="mt-4 text-[15px] text-zinc-400 leading-relaxed font-light">
        {highlightMetrics(project.bullets[0])}
      </p>
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
        {project.stack.map((s) => (
          <span key={s} className="font-mono text-[11px] text-zinc-500">
            {s}
          </span>
        ))}
      </div>
      {/* hover arrow */}
      <ArrowUpRight
        size={20}
        className="absolute top-8 right-8 text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
        style={{ color: ACCENT }}
      />
    </motion.article>
  );
};

// ---------- EDUCATION ----------
const Education = () => (
  <section
    id="education"
    className="relative py-24 md:py-32 border-t border-zinc-900"
    data-testid="education-section"
  >
    <div className="max-w-5xl mx-auto px-6 md:px-10">
      <SectionHead kicker="Education" title="Academic background." />
      {education.map((e, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12"
          data-testid={`education-${idx}`}
        >
          <div className="font-mono text-xs tracking-wider text-zinc-500 md:pt-1.5">
            Master's
          </div>
          <div>
            <h3 className="text-xl md:text-2xl text-white font-normal tracking-tight">
              {e.degree}
            </h3>
            <p className="mt-2 text-zinc-400 font-light">
              {e.school} · {e.location}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// ---------- CONTACT ----------
const Contact = () => (
  <section
    id="contact"
    className="relative py-28 md:py-40 border-t border-zinc-900 overflow-hidden"
    data-testid="contact-section"
  >
    <div className="absolute inset-0 opacity-40">
      <NeuralCanvas density={28} />
    </div>
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,11,0.95) 100%)",
      }}
    />
    <div className="relative max-w-5xl mx-auto px-6 md:px-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-5"
      >
        <span className="h-px w-8" style={{ background: ACCENT }} />
        <div
          className="font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: ACCENT }}
        >
          Contact
        </div>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] font-light text-white leading-[1.05] max-w-3xl"
      >
        Have a project in mind?
        <br />
        <span className="text-zinc-500">Let&apos;s talk.</span>
      </motion.h2>

      <div className="mt-14 grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <p className="text-lg text-zinc-400 leading-relaxed font-light max-w-md">
            Open to ML engineering, applied LLM, and MLOps opportunities.
            The fastest way to reach me is by email.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <MagneticButton>
              <a
                href={MAILTO}
                className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3.5 rounded-full hover:bg-zinc-100 transition-colors"
                data-testid="contact-mailto-primary"
              >
                <Mail size={15} />
                Send email
              </a>
            </MagneticButton>
            <a
              href={RESUME_URL}
              download
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white px-2 py-3.5 transition-colors"
              data-testid="contact-download-resume"
            >
              Download résumé
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="space-y-5 md:pt-2">
          <ContactRow
            icon={Mail}
            label="Email"
            value={profile.email}
            href={MAILTO}
            testid="contact-row-email"
          />
          <ContactRow
            icon={Phone}
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phone.replace(/[^\d+]/g, "")}`}
            testid="contact-row-phone"
          />
          <ContactRow
            icon={MapPin}
            label="Location"
            value={profile.location}
            testid="contact-row-location"
          />
          <ContactRow
            icon={Linkedin}
            label="LinkedIn"
            value="linkedin.com/in/ramesh-murala"
            href={LINKEDIN_URL}
            external
            testid="contact-row-linkedin"
          />
        </div>
      </div>
    </div>
  </section>
);

const ContactRow = ({ icon: Icon, label, value, href, external, testid }) => {
  const inner = (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:border-[#5eead4]/40 transition-colors">
        <Icon size={15} className="text-zinc-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-600">
          {label}
        </div>
        <div className="mt-0.5 text-sm text-zinc-200 truncate group-hover:text-white transition-colors">
          {value}
        </div>
      </div>
      {href && (
        <ArrowUpRight
          size={14}
          className="text-zinc-700 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0"
        />
      )}
    </div>
  );
  if (!href) return <div data-testid={testid}>{inner}</div>;
  return (
    <a
      href={href}
      data-testid={testid}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block"
    >
      {inner}
    </a>
  );
};

// ---------- FOOTER ----------
const Footer = () => (
  <footer className="border-t border-zinc-900 py-10" data-testid="site-footer">
    <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="font-mono text-xs text-zinc-600">
        © {new Date().getFullYear()} Ramesh Murala — designed & engineered with care.
      </div>
      <a
        href="#top"
        className="font-mono text-xs text-zinc-500 hover:text-white transition-colors"
        data-testid="footer-top"
      >
        Back to top ↑
      </a>
    </div>
  </footer>
);

// ---------- MAIN ----------
export default function Portfolio() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0b]" style={{ "--accent": ACCENT }}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <Metrics />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
