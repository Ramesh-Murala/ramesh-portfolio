export const profile = {
  name: "Venkata Sri Sai Ramesh Murala",
  short: "Ramesh Murala",
  role: "Machine Learning Engineer | Production AI & ML Infrastructure",
  location: "Memphis, TN",
  phone: "+1 (901)-765-7944",
  email: "venkataramesh@jobhuntbox.com",
  linkedin: "LinkedIn",
  summary:
    "Machine Learning Engineer with 4+ years of experience building production AI systems, backend services, ML infrastructure, and cloud-native applications. Experienced in designing RAG applications, LLM-powered workflows, real-time inference APIs, data pipelines, model deployment, monitoring, and scalable AWS-based services. Strong background in Python, AWS, Docker, SageMaker, Lambda, ECS, API Gateway, vector search, and ML observability.",
};

export const skillGroups = [
  {
    label: "Production AI & LLM Systems",
    path: "~/production-ai",
    items: [
      "RAG Systems",
      "LLM Applications",
      "Prompt Orchestration",
      "Semantic Retrieval",
      "Vector Search",
      "Contextual Retrieval",
      "Document Summarization",
      "AI Evaluation",
    ],
  },
  {
    label: "Backend & Distributed Systems",
    path: "~/backend",
    items: [
      "Python",
      "REST APIs",
      "Microservices",
      "Real-Time Inference APIs",
      "System Integration",
      "Low-Latency Services",
      "Scalable Backend Systems",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    path: "~/cloud",
    items: [
      "AWS SageMaker",
      "AWS Lambda",
      "AWS ECS",
      "AWS S3",
      "AWS Glue",
      "API Gateway",
      "CloudWatch",
      "Docker",
    ],
  },
  {
    label: "MLOps & Reliability",
    path: "~/mlops",
    items: [
      "Model Deployment",
      "Model Monitoring",
      "Evaluation Frameworks",
      "Drift Detection",
      "CI/CD Pipelines",
      "Containerization",
      "Production Observability",
    ],
  },
  {
    label: "Machine Learning & Data",
    path: "~/ml-data",
    items: [
      "Machine Learning",
      "NLP",
      "Scikit-Learn",
      "PyTorch",
      "Pandas",
      "NumPy",
      "Feature Engineering",
      "ETL Pipelines",
    ],
  },
  {
    label: "Data Engineering & Analytics",
    path: "~/data",
    items: [
      "AWS Glue",
      "AWS S3",
      "SQL",
      "Data Transformation",
      "Large-Scale Data Processing",
      "Power BI",
      "Data Visualization",
    ],
  },
];

export const competencies = [
  "Production System Ownership",
  "Scalability & Reliability",
  "Root-Cause Analysis",
  "Cross-Functional Collaboration",
];

export const experience = [
  {
    company: "Intuit",
    role: "Machine Learning Engineer",
    period: "Jan 2025 — Present",
    status: "ACTIVE",
    bullets: [
      "Own and maintain production AI services supporting internal knowledge, automation, and decision-support workflows across enterprise teams.",
      "Designed and implemented Retrieval-Augmented Generation systems using vector search, semantic chunking, contextual retrieval, and LLM-based response generation.",
      "Built scalable inference services using Python, AWS Lambda, API Gateway, Docker, and ECS to support low-latency AI applications in production.",
      "Developed backend orchestration components for retrieval, ranking, prompt construction, model invocation, and response delivery within LLM-powered applications.",
      "Deployed and managed machine learning models on AWS SageMaker, including model packaging, endpoint deployment, performance tuning, and operational monitoring.",
      "Built data pipelines using AWS S3 and AWS Glue for ingestion, transformation, and preparation of large-scale datasets supporting ML and analytics workloads.",
      "Implemented evaluation workflows to measure retrieval quality, response relevance, latency, accuracy, and production reliability across AI services.",
      "Created monitoring and observability solutions using AWS CloudWatch to track service health, model behavior, drift signals, and operational incidents.",
      "Improved scalability and reliability of AI services through containerization, infrastructure optimization, automated deployments, and performance tuning.",
      "Partnered with engineering, product, and business teams to move AI prototypes into reliable production systems used by hundreds of internal users.",
    ],
  },
  {
    company: "Tech Mahindra",
    role: "Software Engineer",
    period: "Nov 2021 — Jul 2023",
    status: "COMPLETED",
    bullets: [
      "Developed and maintained production backend services using Python and Flask for enterprise applications and business-critical workflows.",
      "Designed and implemented REST APIs consumed by multiple internal applications, enabling reliable communication across distributed systems.",
      "Built and optimized ETL workflows using Python, AWS Glue, and AWS S3 to process large-scale operational datasets.",
      "Integrated backend services with databases and cloud storage systems, improving data consistency, availability, and system reliability.",
      "Improved application performance through backend optimization, query tuning, efficient data handling, and workflow improvements.",
      "Investigated and resolved production issues through debugging, root-cause analysis, defect fixes, and post-deployment validation.",
      "Automated recurring engineering and operational workflows, reducing manual effort and improving delivery efficiency.",
      "Collaborated with product, QA, and engineering teams to deliver scalable solutions from requirement analysis through production support.",
      "Contributed to testing, code reviews, documentation, release activities, and ongoing maintenance of enterprise production systems.",
    ],
  },
  {
    company: "Maruti Techlabs",
    role: "Data Scientist Intern",
    period: "May 2020 — Oct 2021",
    status: "COMPLETED",
    bullets: [
      "Built machine learning workflows using Python, Scikit-Learn, Pandas, and NumPy to support business analytics and prediction use cases.",
      "Performed data preprocessing, feature engineering, model training, validation, and performance evaluation across structured datasets.",
      "Developed automated data processing workflows to improve data quality, reduce manual effort, and support repeatable analysis.",
      "Conducted exploratory data analysis and statistical analysis to identify trends, patterns, and business insights.",
      "Created Power BI dashboards and reporting views to help stakeholders monitor key metrics and operational performance.",
      "Compared machine learning algorithms and evaluated model performance using validation metrics to improve prediction quality.",
      "Collaborated with technical and business teams to understand data requirements and deliver analytical solutions aligned with project goals.",
      "Documented experiments, data workflows, and model outputs to support maintainability and knowledge sharing.",
    ],
  },
];

export const projects = [
  {
    id: "01",
    title: "Enterprise RAG Knowledge Platform",
    tag: "Production AI / RAG",
    bullets: [
      "Designed a production-style RAG platform for enterprise knowledge access using vector search, semantic retrieval, and LLM-based response generation.",
      "Built retrieval and orchestration workflows for document ingestion, chunking, embedding generation, context selection, prompt construction, and answer generation.",
      "Added evaluation and monitoring concepts to measure response relevance, latency, retrieval quality, and reliability across AI-powered workflows.",
    ],
    stack: ["LLMs", "RAG", "Vector DB", "AWS", "Python"],
  },
  {
    id: "02",
    title: "Real-Time ML Inference Service",
    tag: "ML Infrastructure",
    bullets: [
      "Built a low-latency inference service using Python, AWS Lambda, API Gateway, Docker, and AWS ECS for serving machine learning predictions.",
      "Designed backend APIs for request validation, feature processing, model invocation, error handling, and response delivery.",
      "Implemented monitoring concepts using CloudWatch-style metrics to track latency, failures, throughput, and service health.",
    ],
    stack: ["Python", "AWS Lambda", "API Gateway", "Docker", "ECS"],
  },
  {
    id: "03",
    title: "ML Evaluation & Monitoring Framework",
    tag: "MLOps / Reliability",
    bullets: [
      "Created an evaluation workflow to measure model quality, prediction reliability, drift patterns, and production performance across ML services.",
      "Defined metrics for accuracy, latency, failure rates, response quality, and operational stability to support production decision-making.",
      "Integrated monitoring and alerting concepts to identify model degradation and service issues before they impacted users.",
    ],
    stack: ["Python", "CloudWatch", "MLflow", "Metrics", "Monitoring"],
  },
  {
    id: "04",
    title: "Large-Scale Data Processing Pipeline",
    tag: "Data Engineering",
    bullets: [
      "Built cloud-based ETL workflows using AWS S3, AWS Glue, and Python to ingest, transform, and prepare large-scale datasets.",
      "Designed data processing logic for cleaning, validation, transformation, and downstream analytics or machine learning consumption.",
      "Improved workflow reliability through structured processing, reusable components, and clear data quality checks.",
    ],
    stack: ["AWS S3", "AWS Glue", "Python", "ETL", "SQL"],
  },
];

export const education = [
  {
    degree: "Master of Data Science",
    school: "University of Memphis",
    location: "Memphis, TN, USA",
  },
];

export const navLinks = [
  { label: "~/about", href: "#about" },
  { label: "~/experience", href: "#experience" },
  { label: "~/skills", href: "#skills" },
  { label: "~/projects", href: "#projects" },
  { label: "~/contact", href: "#contact" },
];
