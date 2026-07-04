import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, User, Phone } from "lucide-react";
import { profile } from "@/data/resume";
import ScrollProgress from "@/components/ScrollProgress";

const MAILTO       = `mailto:${profile.email}`;
const LINKEDIN_URL = "https://www.linkedin.com/in/venkata-sri-sai-ramesh-murala-29b061175";
const GITHUB_URL   = "https://github.com/";
const RESUME_URL   = "/Ramesh_Murala_Resume.pdf";

const BG      = "#060A12";
const SURFACE = "#0D1525";
const CARD    = "#0F1D30";
const BORDER  = "#1B2A42";
const ACCENT  = "#00D4FF";
const ACCENT2 = "#6366F1";
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// ─── Animation variants ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = (d = 0.08) => ({ hidden: {}, show: { transition: { staggerChildren: d } } });
const clipReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 16 },
  show:   { clipPath: "inset(0 0 0% 0)",   opacity: 1, y: 0,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const lineGrow = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Typing hook ──────────────────────────────────────────────────
const PHRASES = [
  "Venkata Sri Sai Ramesh Murala.",
  "building AI that actually ships.",
  "obsessed with low-latency systems.",
  "turning notebooks into production.",
  "SageMaker, Lambda, ECS — repeat.",
];
function useTyping() {
  const [text, setText]         = useState("");
  const [pidx, setPidx]         = useState(0);
  const [cidx, setCidx]         = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const phrase = PHRASES[pidx]; let t;
    if (!deleting && cidx < phrase.length)        t = setTimeout(() => setCidx(c => c + 1), 72);
    else if (!deleting && cidx === phrase.length)  t = setTimeout(() => setDeleting(true), 2400);
    else if (deleting && cidx > 0)                t = setTimeout(() => setCidx(c => c - 1), 36);
    else { setDeleting(false); setPidx(i => (i + 1) % PHRASES.length); }
    return () => clearTimeout(t);
  }, [cidx, deleting, pidx]);
  useEffect(() => { setText(PHRASES[pidx].slice(0, cidx)); }, [cidx, pidx]);
  return text;
}

// ─── Neural network background ────────────────────────────────────
const NeuralNetBg = () => {
  const nodes = useMemo(() => [
    [8,12],[22,35],[45,18],[68,28],[88,12],
    [12,55],[35,48],[58,62],[78,45],[94,68],
    [5,82],[28,78],[52,88],[76,76],[96,90],
    [18,25],[42,70],[65,38],[32,60],[62,50],
    [82,22],[15,92],[50,44],[72,88],[38,30],
  ], []);
  const edges = useMemo(() => {
    const result = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        if (Math.sqrt(dx*dx + dy*dy) < 26) result.push([i, j, Math.sqrt(dx*dx + dy*dy)]);
      }
    }
    return result;
  }, [nodes]);
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {edges.map(([a, b, dist], i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={ACCENT} strokeWidth="0.09"
          opacity={0.08 + (1 - dist/26) * 0.12}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="1.2" fill={ACCENT} opacity="0.06">
            <animate attributeName="r" values="1.2;2.2;1.2" dur={`${2.8+i*0.35}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.06;0.18;0.06" dur={`${2.8+i*0.35}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r="0.45" fill={ACCENT} opacity="0.55" />
        </g>
      ))}
    </svg>
  );
};

// ─── Shared components ────────────────────────────────────────────
const SpacedLabel = ({ children }) => (
  <p className="text-[10px] font-bold uppercase tracking-[0.55em] font-mono" style={{ color: ACCENT }}>
    {children}
  </p>
);

const SectionHeading = ({ label, title, bold, center = true }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger(0.1)} initial="hidden" animate={inView ? "show" : "hidden"}
      className={`mb-14 ${center ? "text-center" : ""}`}
    >
      <motion.div variants={fadeUp}><SpacedLabel>{label}</SpacedLabel></motion.div>
      <div className="overflow-hidden mt-4">
        <motion.h2 variants={clipReveal}
          className={`text-3xl md:text-4xl font-light leading-snug text-slate-200 ${center ? "" : "text-left"}`}
        >
          {title}{bold && <> <span className="font-semibold text-white">{bold}</span></>}
        </motion.h2>
      </div>
      <motion.div variants={lineGrow}
        className={`mt-3 h-[2px] w-12 rounded-full ${center ? "mx-auto" : ""}`}
        style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
      />
    </motion.div>
  );
};

// ─── Profile photos ───────────────────────────────────────────────
const ProfileCircle = () => {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden flex-shrink-0"
      style={{
        outline: `1.5px solid ${BORDER}`,
        outlineOffset: "6px",
        boxShadow: `0 0 32px rgba(0,212,255,0.15)`,
      }}
    >
      {!failed ? (
        <img src="/profile.jpg" alt="Ramesh Murala"
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(100%) contrast(1.08) brightness(0.92)" }}
          onError={() => setFailed(true)} />
      ) : (
        <div className="w-full h-full flex items-center justify-center" style={{ background: CARD }}>
          <User size={54} color={ACCENT} strokeWidth={0.8} />
        </div>
      )}
    </div>
  );
};

const AboutPhoto = () => {
  const [failed, setFailed] = useState(false);
  return (
    <div className="aspect-[3/4] w-full max-w-[340px] mx-auto rounded-lg overflow-hidden relative"
      style={{ background: CARD, border: `1px solid ${BORDER}` }}
    >
      {!failed ? (
        <img src="/profile.jpg" alt="Ramesh Murala" className="w-full h-full object-cover"
          style={{ filter: "grayscale(100%) contrast(1.06) brightness(0.88)" }}
          onError={() => setFailed(true)} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <User size={90} color={ACCENT} strokeWidth={0.7} />
        </div>
      )}
    </div>
  );
};

// ─── Fixed chrome ─────────────────────────────────────────────────
const FixedLeft = () => (
  <div className="fixed top-6 left-5 z-50 hidden md:flex flex-col gap-3">
    {[{ href: LINKEDIN_URL, Icon: Linkedin, label: "LinkedIn" }, { href: GITHUB_URL, Icon: Github, label: "GitHub" }]
      .map(({ href, Icon, label }) => (
      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
        style={{ background: CARD, border: `1px solid ${BORDER}`, color: "#64748B" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; e.currentTarget.style.boxShadow = `0 0 14px rgba(0,212,255,0.2)`; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = "#64748B"; e.currentTarget.style.boxShadow = "none"; }}
      >
        <Icon size={13} strokeWidth={1.5} />
      </a>
    ))}
  </div>
);

const FixedRight = () => (
  <a href="#contact"
    className="fixed top-5 right-5 z-50 hidden md:flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase transition-all duration-200 rounded-full px-4 py-2 font-mono"
    style={{ background: CARD, border: `1px solid ${BORDER}`, color: "#64748B" }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; e.currentTarget.style.boxShadow = `0 0 14px rgba(0,212,255,0.2)`; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = "#64748B"; e.currentTarget.style.boxShadow = "none"; }}
  >
    <Mail size={11} /> Get in Touch
  </a>
);

// ─── PAGE TRANSITION ──────────────────────────────────────────────
const TransitionOverlay = ({ phase }) => (
  <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
    <motion.div className="absolute left-0 right-0 top-0"
      style={{ background: `linear-gradient(135deg, ${BG} 0%, #0A0F1E 50%, ${ACCENT2}22 100%)`, height: "50%", borderBottom: `1px solid ${ACCENT}33` }}
      animate={phase === "in"  ? { y: "0%"    } :
               phase === "out" ? { y: "-101%" } : { y: "-101%" }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
    />
    <motion.div className="absolute left-0 right-0 bottom-0"
      style={{ background: `linear-gradient(135deg, ${ACCENT2}22 0%, #0A0F1E 50%, ${BG} 100%)`, height: "50%", borderTop: `1px solid ${ACCENT}33` }}
      animate={phase === "in"  ? { y: "0%"    } :
               phase === "out" ? { y: "101%"  } : { y: "101%" }}
      transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
    />
  </div>
);

// ─── HERO ─────────────────────────────────────────────────────────
const Hero = () => {
  const typed = useTyping();
  return (
    <section id="top" className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: BG }}
    >
      <NeuralNetBg />

      {/* Radial glow at center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mb-7"
        >
          <ProfileCircle />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-[11px] md:text-[13px] font-semibold uppercase tracking-[0.3em] md:tracking-[0.5em] font-mono" style={{ color: ACCENT }}>
            Machine Learning Engineer
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }} className="mt-5 mb-10 h-12 md:h-14 flex items-center"
        >
          <h1 className="font-mono text-2xl md:text-3xl lg:text-4xl font-light text-slate-100 tracking-tight">
            {typed}<span className="cursor-blink" />
          </h1>
        </motion.div>

        <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }} className="flex items-center gap-8 md:gap-14"
        >
          {["About", "Experience", "Skills", "Projects"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-[11px] uppercase font-mono transition-colors pb-0.5 border-b border-transparent"
              style={{ color: "#64748B" }}
              onMouseEnter={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = ACCENT; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#64748B"; e.currentTarget.style.borderColor = "transparent"; }}
            >
              {item}
            </a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
};

// ─── ABOUT ────────────────────────────────────────────────────────
const About = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="about" ref={ref} className="relative min-h-screen flex flex-col justify-center py-24 md:py-32 dot-grid"
      style={{ background: SURFACE }}
    >
      <div className="max-w-5xl mx-auto px-8 md:px-12 w-full">
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative"
          >
            <motion.div initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <AboutPhoto />
            </motion.div>
            <motion.div className="absolute -bottom-5 -left-5 w-16 h-16 border-l-[2px] border-b-[2px]"
              style={{ borderColor: ACCENT }}
              initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7, ease: "backOut" }}
            />
            <motion.div className="absolute -top-5 -right-5 w-16 h-16 border-r-[2px] border-t-[2px]"
              style={{ borderColor: ACCENT }}
              initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.85, ease: "backOut" }}
            />
          </motion.div>

          <motion.div variants={stagger(0.12)} initial="hidden" animate={inView ? "show" : "hidden"}>
            <motion.div variants={fadeUp}><SpacedLabel>About</SpacedLabel></motion.div>
            <div className="overflow-hidden mt-5 mb-2">
              <motion.h2 variants={clipReveal} className="text-3xl md:text-4xl font-light text-slate-200 leading-snug">
                Here is a little <span className="font-semibold text-white">background</span>
              </motion.h2>
            </div>
            <motion.div variants={lineGrow} className="h-[2px] w-10 rounded-full mb-7"
              style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
            />

            <div className="space-y-4 text-[15px] leading-relaxed"
              style={{ color: "#94A3B8", hyphens: "none", WebkitHyphens: "none", wordBreak: "normal" }}
            >
              {[
                <>I am a Machine Learning Engineer designing and shipping production AI systems trusted by thousands of users every day. My foundation is a Master's degree in Data Science from the University of Memphis, and my focus has always been on closing the gap between promising experiments and software that genuinely performs at scale.</>,
                <>I built a RAG platform processing over 10,000 daily queries with p95 latency under 800ms, deployed containerized LLM inference APIs on AWS ECS, and implemented evaluation frameworks that reduced hallucination rates by 35% across production workflows. My expertise spans vector search, semantic retrieval, MLOps pipelines, and cloud infrastructure across SageMaker, Lambda, and ECS.</>,
                <>I believe exceptional AI engineering demands more than strong models. It demands obsessive attention to latency, observability, and reliability, combined with the systems thinking required to carry an idea from a research notebook all the way to a service that scales under real load.</>,
              ].map((text, i) => (
                <motion.p key={i} variants={fadeUp} style={{ hyphens: "none", WebkitHyphens: "none", textAlign: "left" }}>
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
              {[
                { href: LINKEDIN_URL, Icon: Linkedin, label: "LinkedIn" },
                { href: GITHUB_URL,   Icon: Github,   label: "GitHub"   },
                { href: MAILTO,       Icon: Mail,      label: "Email"    },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: CARD, border: `1px solid ${BORDER}`, color: "#64748B" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; e.currentTarget.style.boxShadow = `0 0 12px rgba(0,212,255,0.2)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = "#64748B"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <Icon size={15} strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── EXPERIENCE ───────────────────────────────────────────────────
const EXP_CARDS = [
  {
    company: "Intuit", role: "Machine Learning Engineer", period: "Jan 2025 — Present",
    tech: [
      { name: "Python",    imgUrl: `${DEVICON}/python/python-original.svg` },
      { name: "Docker",    imgUrl: `${DEVICON}/docker/docker-original.svg` },
      { name: "AWS",       abbr: "AWS" },
      { name: "LangChain", abbr: "LC" },
      { name: "SageMaker", abbr: "SM" },
      { name: "ECS",       abbr: "ECS" },
    ],
    bullets: [
      "Built production RAG pipeline serving 10K+ daily queries using LangChain, FAISS, and AWS SageMaker with p95 latency under 800ms.",
      "Deployed containerized LLM inference APIs on AWS ECS handling real-time document retrieval across enterprise knowledge bases.",
      "Implemented MLflow-based evaluation framework reducing hallucination rate by 35% across production LLM workflows.",
    ],
  },
  {
    company: "Tech Mahindra", role: "Software Engineer", period: "Nov 2021 — Jul 2023",
    tech: [
      { name: "Python", imgUrl: `${DEVICON}/python/python-original.svg` },
      { name: "Flask",  imgUrl: `${DEVICON}/flask/flask-original.svg` },
      { name: "AWS",    abbr: "AWS" },
      { name: "PostgreSQL", imgUrl: `${DEVICON}/postgresql/postgresql-original.svg` },
      { name: "Docker", imgUrl: `${DEVICON}/docker/docker-original.svg` },
    ],
    bullets: [
      "Engineered ETL pipelines on AWS Glue and S3 processing 5M+ records daily for downstream ML and analytics workloads.",
      "Built and maintained REST APIs in Python/Flask consumed by 8+ internal applications across distributed systems.",
    ],
  },
  {
    company: "Maruti Techlabs", role: "Data Scientist Intern", period: "May 2020 — Oct 2021",
    tech: [
      { name: "Python",    imgUrl: `${DEVICON}/python/python-original.svg` },
      { name: "Pandas",    imgUrl: `${DEVICON}/pandas/pandas-original.svg` },
      { name: "Scikit",    abbr: "SK" },
      { name: "NumPy",     imgUrl: `${DEVICON}/numpy/numpy-original.svg` },
    ],
    bullets: [
      "Developed ML classification models using Scikit-Learn and Pandas achieving 89% accuracy on structured business datasets.",
      "Automated data preprocessing pipelines reducing manual effort by 40%.",
    ],
  },
];

const ExperienceCard = ({ card }) => (
  <motion.div variants={cardVariant}
    className="flex-shrink-0 w-[calc(100vw-3rem)] md:w-[400px] rounded-2xl overflow-hidden snap-start scan-line relative transition-all duration-300"
    style={{ background: CARD, border: `1px solid ${BORDER}` }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = `${ACCENT}44`; e.currentTarget.style.boxShadow = `0 0 32px rgba(0,212,255,0.08)`; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }}
  >
    <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${ACCENT}88, ${ACCENT2}88)` }} />
    <div className="p-6">
      <h3 className="text-base font-semibold text-slate-100 leading-snug mb-1">{card.role}</h3>
      <p className="text-sm font-semibold mb-0.5 font-mono" style={{ color: ACCENT }}>{card.company}</p>
      <p className="text-xs mb-4 font-mono" style={{ color: "#475569" }}>{card.period}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {card.tech.map(t => (
          <div key={t.name} title={t.name}
            className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
            style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
          >
            {t.imgUrl ? (
              <img src={t.imgUrl} alt={t.name} className="w-5 h-5 object-contain grayscale-img" loading="lazy" />
            ) : (
              <span className="text-[8px] font-bold font-mono" style={{ color: ACCENT }}>{t.abbr}</span>
            )}
          </div>
        ))}
      </div>
      <ul className="space-y-2.5">
        {card.bullets.map((b, i) => (
          <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed" style={{ color: "#94A3B8" }}>
            <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Experience = () => (
  <section id="experience" className="relative min-h-screen flex flex-col justify-center py-24"
    style={{ background: BG }}
  >
    <div className="max-w-6xl mx-auto px-6 md:px-10 w-full">
      <SectionHeading label="Experience" title="Where I've" bold="worked" />
      <motion.div variants={stagger(0.13)} initial="hidden" whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
      >
        {EXP_CARDS.map(card => <ExperienceCard key={card.company} card={card} />)}
      </motion.div>
    </div>
  </section>
);

// ─── SKILLS ───────────────────────────────────────────────────────
const SKILL_LIST = [
  { name: "Python",      level: 95, imgUrl: `${DEVICON}/python/python-original.svg` },
  { name: "AWS",         level: 85, imgUrl: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { name: "Docker",      level: 80, imgUrl: `${DEVICON}/docker/docker-original.svg` },
  { name: "LangChain",   level: 85, svgIcon: "langchain" },
  { name: "FAISS",       level: 80, svgIcon: "faiss" },
  { name: "Pinecone",    level: 75, svgIcon: "pinecone" },
  { name: "PyTorch",     level: 70, imgUrl: `${DEVICON}/pytorch/pytorch-original.svg` },
  { name: "TensorFlow",  level: 70, imgUrl: `${DEVICON}/tensorflow/tensorflow-original.svg` },
  { name: "SageMaker",   level: 80, svgIcon: "sagemaker" },
  { name: "Pandas",      level: 90, imgUrl: `${DEVICON}/pandas/pandas-original.svg` },
  { name: "PostgreSQL",  level: 75, imgUrl: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: "Git",         level: 85, imgUrl: `${DEVICON}/git/git-original.svg` },
  { name: "FastAPI",     level: 75, imgUrl: `${DEVICON}/fastapi/fastapi-original.svg` },
  { name: "React",       level: 65, imgUrl: `${DEVICON}/react/react-original.svg` },
  { name: "LlamaIndex",  level: 75, svgIcon: "llamaindex" },
  { name: "HuggingFace", level: 80, svgIcon: "huggingface" },
];

const SvgSkillIcon = ({ type }) => {
  if (type === "langchain") return (
    <svg viewBox="0 0 40 40" className="w-11 h-11" fill="none">
      <circle cx="20" cy="20" r="18" fill="#1C7A5E" opacity="0.10"/>
      <path d="M10 20 Q15 12 20 20 Q25 28 30 20" stroke="#1C7A5E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <circle cx="10" cy="20" r="2.5" fill="#1C7A5E"/>
      <circle cx="30" cy="20" r="2.5" fill="#1C7A5E"/>
      <circle cx="20" cy="20" r="2.5" fill="#1C7A5E"/>
    </svg>
  );
  if (type === "faiss") return (
    <svg viewBox="0 0 40 40" className="w-11 h-11" fill="none">
      <rect x="6" y="14" width="28" height="4" rx="2" fill="#6366F1" opacity="0.9"/>
      <rect x="6" y="22" width="20" height="4" rx="2" fill="#6366F1" opacity="0.6"/>
      <rect x="6" y="30" width="14" height="4" rx="2" fill="#6366F1" opacity="0.35"/>
      <circle cx="32" cy="24" r="5" fill="none" stroke="#6366F1" strokeWidth="2"/>
      <line x1="36" y1="28" x2="40" y2="32" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
  if (type === "pinecone") return (
    <svg viewBox="0 0 40 40" className="w-11 h-11" fill="none">
      <ellipse cx="20" cy="26" rx="7" ry="9" fill="#34D399" opacity="0.12" stroke="#34D399" strokeWidth="1.5"/>
      <path d="M20 8 L20 26" stroke="#34D399" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 12 L15 16 M20 12 L25 16" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 17 L14 21 M20 17 L26 21" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="8" r="2" fill="#34D399"/>
    </svg>
  );
  if (type === "sagemaker") return (
    <svg viewBox="0 0 40 40" className="w-11 h-11" fill="none">
      <rect x="4" y="4" width="32" height="32" rx="6" fill="#FF9900" opacity="0.10"/>
      <path d="M12 28 L12 20 L20 14 L28 20 L28 28" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="16" y="22" width="8" height="6" rx="1" fill="#FF9900" opacity="0.7"/>
      <circle cx="20" cy="18" r="3" fill="#FF9900"/>
    </svg>
  );
  if (type === "llamaindex") return (
    <svg viewBox="0 0 40 40" className="w-11 h-11" fill="none">
      <ellipse cx="20" cy="24" rx="10" ry="8" fill="#A78BFA" opacity="0.12" stroke="#A78BFA" strokeWidth="1.5"/>
      <path d="M14 24 Q14 16 20 14 Q26 16 26 24" fill="#A78BFA" opacity="0.18" stroke="#A78BFA" strokeWidth="1.5"/>
      <circle cx="16" cy="20" r="1.5" fill="#A78BFA"/>
      <circle cx="24" cy="20" r="1.5" fill="#A78BFA"/>
      <path d="M17 26 Q20 28 23 26" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M26 22 L30 20 L28 24" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
  if (type === "huggingface") return (
    <svg viewBox="0 0 40 40" className="w-11 h-11" fill="none">
      <circle cx="20" cy="20" r="14" fill="#FBBF24" opacity="0.12" stroke="#FBBF24" strokeWidth="1.5"/>
      <circle cx="15" cy="17" r="2" fill="#D97706"/>
      <circle cx="25" cy="17" r="2" fill="#D97706"/>
      <path d="M14 24 Q17 28 20 28 Q23 28 26 24" stroke="#D97706" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M13 13 Q12 9 15 10" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M27 13 Q28 9 25 10" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  return null;
};

const SkillBadge = ({ name, level, imgUrl, abbr, svgIcon }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="w-[110px] h-[110px] md:w-[124px] md:h-[124px] rounded-full flex flex-col items-center justify-center cursor-default transition-all duration-250 relative overflow-hidden skill-glow"
      style={{
        background: hov ? `radial-gradient(circle at center, ${ACCENT}12 0%, ${CARD} 70%)` : CARD,
        border: `1px solid ${hov ? ACCENT + "66" : BORDER}`,
        boxShadow: hov ? `0 0 28px rgba(0,212,255,0.18)` : "none",
      }}
    >
      <AnimatePresence mode="wait">
        {hov ? (
          <motion.div key="pct"
            initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.15 }}
            className="flex flex-col items-center gap-0.5"
          >
            <span className="text-2xl font-bold font-mono" style={{ color: ACCENT }}>{level}%</span>
            <span className="text-[8px] font-mono" style={{ color: "#475569" }}>proficiency</span>
          </motion.div>
        ) : (
          <motion.div key="icon"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="flex flex-col items-center justify-center gap-1.5"
          >
            {imgUrl ? (
              <img src={imgUrl} alt={name} className="w-10 h-10 object-contain" loading="lazy" />
            ) : svgIcon ? (
              <SvgSkillIcon type={svgIcon} />
            ) : (
              <span className="text-sm font-bold font-mono" style={{ color: ACCENT }}>{abbr || name.slice(0, 2)}</span>
            )}
            <span className="text-[9px] font-medium text-center leading-tight px-1 font-mono" style={{ color: "#475569" }}>{name}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Skills = () => (
  <section id="skills" className="relative min-h-screen flex flex-col justify-center py-24 dot-grid"
    style={{ background: SURFACE }}
  >
    <div className="max-w-4xl mx-auto px-6 md:px-10 w-full">
      <SectionHeading label="Skills" title="What I" bold="work with" />
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
        className="text-sm tracking-wider text-center -mt-8 mb-10 font-mono"
        style={{ color: "#334155" }}
      >
        Hover to see proficiency
      </motion.p>
      <motion.div className="flex flex-wrap justify-center gap-5"
        variants={stagger(0.045)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
      >
        {SKILL_LIST.map(s => (
          <motion.div key={s.name} variants={{
            hidden: { opacity: 0, scale: 0.6, y: 20 },
            show:   { opacity: 1, scale: 1,   y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
          }}>
            <SkillBadge {...s} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ─── PROJECTS ─────────────────────────────────────────────────────
const PROJECT_CARDS = [
  { id: "01", title: "Enterprise RAG Knowledge Platform", tag: "Production AI / RAG",
    desc: "Production-grade RAG pipeline serving 10K+ daily queries — vector search over enterprise docs using FAISS, semantic chunking, and LLM response generation on AWS SageMaker with p95 latency under 800ms.",
    stack: ["LangChain", "FAISS", "AWS", "Python", "SageMaker"],
    bgImg: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1920&h=1080&fit=crop&q=80" },
  { id: "02", title: "Real-Time ML Inference Service", tag: "ML Infrastructure",
    desc: "Containerized inference API on AWS ECS and Lambda — serving real-time ML predictions at 1.2K req/s with CloudWatch observability, p50 latency of 124ms, and automated scaling across availability zones.",
    stack: ["Python", "Lambda", "Docker", "FastAPI", "ECS"],
    bgImg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&h=1080&fit=crop&q=80" },
  { id: "03", title: "Healthcare MLOps Pipeline", tag: "MLOps / Healthcare",
    desc: "End-to-end automated ML pipeline on SageMaker — continuous retraining, drift detection, model versioning with MLflow, and CI/CD deployment for clinical classification workloads with 93.4% accuracy.",
    stack: ["SageMaker", "MLflow", "Python", "Docker", "CloudWatch"],
    bgImg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop&q=80" },
  { id: "04", title: "ML Evaluation & Monitoring Framework", tag: "MLOps / Reliability",
    desc: "Evaluation framework measuring hallucination rate (reduced by 35%), retrieval relevance, latency drift, and prediction reliability across production LLM services — with real-time alerting on CloudWatch.",
    stack: ["Python", "CloudWatch", "MLflow", "Pandas", "AWS"],
    bgImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&q=80" },
];

const Projects = () => {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef(null);

  const goTo = (idx) => {
    scrollRef.current?.scrollTo({ left: idx * scrollRef.current.offsetWidth, behavior: "smooth" });
    setCurrent(idx);
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.offsetWidth));
  };

  return (
    <section id="projects" className="relative" style={{ height: "100vh" }}>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none">
        <p className="text-[10px] font-bold uppercase tracking-[0.55em] font-mono" style={{ color: ACCENT }}>
          P R O J E C T S
        </p>
      </div>

      <div ref={scrollRef} onScroll={onScroll}
        className="flex h-full overflow-x-scroll snap-x snap-mandatory scrollbar-hide"
      >
        {PROJECT_CARDS.map((project, i) => (
          <div key={project.id} className="flex-shrink-0 w-screen h-screen snap-start relative overflow-hidden">
            <img src={project.bgImg} alt={project.title}
              className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(105deg, rgba(3,6,16,0.94) 0%, rgba(3,6,16,0.78) 45%, rgba(3,6,16,0.32) 75%, rgba(3,6,16,0.12) 100%)" }}
            />

            {/* Subtle cyan top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${ACCENT}88, ${ACCENT2}88, transparent)` }}
            />

            <span className="absolute top-10 right-8 font-mono font-bold text-[140px] md:text-[200px] leading-none select-none pointer-events-none"
              style={{ color: "rgba(0,212,255,0.04)" }}
            >
              {project.id}
            </span>

            <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-10 md:px-20 pb-24 md:pb-0 pt-24 md:max-w-[58%] z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false }}
              >
                <p className="text-[10px] font-bold tracking-[0.45em] uppercase mb-4 font-mono" style={{ color: ACCENT }}>{project.tag}</p>
                <h2 className="text-3xl md:text-5xl font-light text-white/60 leading-tight mb-2">
                  Project {project.id}
                </h2>
                <h3 className="text-2xl md:text-4xl font-semibold text-white leading-tight mb-6">
                  {project.title}
                </h3>
                <div className="w-10 h-[2px] rounded-full mb-6"
                  style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
                />
                <p className="text-[14px] md:text-[15px] text-white/65 leading-relaxed mb-8 max-w-lg">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map(s => (
                    <span key={s}
                      className="text-[11px] font-medium px-3 py-1 rounded-full font-mono"
                      style={{ border: `1px solid ${ACCENT}44`, color: ACCENT, background: `${ACCENT}0D`, backdropFilter: "blur(8px)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold transition-colors px-4 py-2 rounded-full w-fit font-mono"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.borderColor = `${ACCENT}66`; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                >
                  <Github size={13} /> View on GitHub
                </a>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {current > 0 && (
        <button onClick={() => goTo(current - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{ background: `${CARD}CC`, border: `1px solid ${BORDER}`, color: "#64748B", backdropFilter: "blur(8px)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = "#64748B"; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {current < PROJECT_CARDS.length - 1 && (
        <button onClick={() => goTo(current + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{ background: `${CARD}CC`, border: `1px solid ${BORDER}`, color: "#64748B", backdropFilter: "blur(8px)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = "#64748B"; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {PROJECT_CARDS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              background: i === current ? ACCENT : "#1B2A42",
              boxShadow: i === current ? `0 0 8px ${ACCENT}88` : "none",
              transform: i === current ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </section>
  );
};

// ─── CONTACT ──────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm]           = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const inputStyle = {
    width: "100%", padding: "12px 16px", fontSize: "14px",
    color: "#E2E8F0", background: CARD,
    border: `1px solid ${BORDER}`, borderRadius: "8px",
    outline: "none", fontFamily: "inherit", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={ref} className="relative min-h-screen flex flex-col justify-center py-24"
      style={{ background: BG }}
    >
      <div className="max-w-2xl mx-auto px-6 md:px-10 w-full">
        <motion.div variants={stagger(0.1)} initial="hidden" animate={inView ? "show" : "hidden"} className="text-center mb-12">
          <motion.div variants={fadeUp}><SpacedLabel>Contact</SpacedLabel></motion.div>
          <div className="overflow-hidden mt-5 mb-3">
            <motion.h2 variants={clipReveal} className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-200 leading-snug">
              I build things that work in production.{" "}
              <span className="font-semibold" style={{ color: ACCENT }}>Let's talk.</span>
            </motion.h2>
          </div>
          <motion.div variants={lineGrow} className="h-[2px] w-12 rounded-full mx-auto mb-6"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT2})` }}
          />
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: "#64748B" }}>
            <a href={MAILTO} className="flex items-center gap-2 transition-colors"
              onMouseEnter={e => e.currentTarget.style.color = ACCENT}
              onMouseLeave={e => e.currentTarget.style.color = "#64748B"}
            >
              <Mail size={14} strokeWidth={1.5} /> {profile.email}
            </a>
            <span className="flex items-center gap-2">
              <Phone size={14} strokeWidth={1.5} /> {profile.phone}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} strokeWidth={1.5} /> {profile.location}
            </span>
          </motion.div>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center py-16 rounded-2xl"
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}44` }}
            >
              <Send size={22} color={ACCENT} />
            </motion.div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Message sent!</h3>
            <p className="text-sm" style={{ color: "#64748B" }}>I'll get back to you within a day.</p>
          </motion.div>
        ) : (
          <motion.form variants={stagger(0.09)} initial="hidden" animate={inView ? "show" : "hidden"}
            onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-4"
          >
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ id: "name", label: "Name", type: "text", ph: "Your name" }, { id: "email", label: "Email", type: "email", ph: "you@email.com" }]
                .map(({ id, label, type, ph }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-[10px] font-bold uppercase tracking-[0.22em] mb-1.5 font-mono" style={{ color: "#475569" }}>{label}</label>
                  <input id={id} type={type} required placeholder={ph}
                    value={form[id]} onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
                    style={{ ...inputStyle, "::placeholder": { color: "#334155" } }}
                    onFocus={e => e.target.style.borderColor = ACCENT}
                    onBlur={e => e.target.style.borderColor = BORDER}
                    className="placeholder:text-[#334155]"
                  />
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}>
              <label htmlFor="subject" className="block text-[10px] font-bold uppercase tracking-[0.22em] mb-1.5 font-mono" style={{ color: "#475569" }}>Subject</label>
              <input id="subject" type="text" required placeholder="What's this about?"
                value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                style={inputStyle} className="placeholder:text-[#334155]"
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = BORDER}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-[0.22em] mb-1.5 font-mono" style={{ color: "#475569" }}>Message</label>
              <textarea id="message" required rows={5} placeholder="Tell me about your project or opportunity..."
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ ...inputStyle, resize: "none" }} className="placeholder:text-[#334155]"
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = BORDER}
              />
            </motion.div>
            <motion.button variants={fadeUp} type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 text-sm font-bold tracking-[0.18em] uppercase rounded-[8px] text-[#060A12] font-mono"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
            >
              Send Message
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-8" style={{ background: SURFACE, borderTop: `1px solid ${BORDER}` }}>
    <div className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono" style={{ color: "#334155" }}>
      <p>© {new Date().getFullYear()} Ramesh Murala — built with care.</p>
      <div className="flex items-center gap-4">
        {[{ href: GITHUB_URL, Icon: Github, label: "GitHub" }, { href: LINKEDIN_URL, Icon: Linkedin, label: "LinkedIn" }, { href: MAILTO, Icon: Mail, label: "Email" }]
          .map(({ href, Icon, label }) => (
          <a key={label} href={href} aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
            className="transition-colors"
            style={{ color: "#334155" }}
            onMouseEnter={e => e.currentTarget.style.color = ACCENT}
            onMouseLeave={e => e.currentTarget.style.color = "#334155"}
          >
            <Icon size={14} strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── ROOT ─────────────────────────────────────────────────────────
export default function Portfolio() {
  const [transPhase, setTransPhase] = useState("idle");

  const triggerTransition = useCallback((href) => {
    setTransPhase("in");
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "instant" });
      setTransPhase("out");
      setTimeout(() => setTransPhase("idle"), 480);
    }, 460);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      triggerTransition(href);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [triggerTransition]);

  return (
    <main className="relative" style={{ background: BG }}>
      <TransitionOverlay phase={transPhase} />
      <ScrollProgress />
      <FixedLeft />
      <FixedRight />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
