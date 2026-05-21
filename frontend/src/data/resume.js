// All content sourced verbatim from Venkata Sri Sai Ramesh Murala's resume.
export const profile = {
  name: "Venkata Sri Sai Ramesh Murala",
  short: "Ramesh Murala",
  role: "Machine Learning Engineer",
  location: "Memphis, TN",
  phone: "+1 (901)-765-7944",
  email: "venkataramesh@jobhuntbox.com",
  linkedin: "LinkedIn",
  summary:
    "Machine Learning Engineer with 4+ years of experience designing data-driven solutions across enterprise and technology environments. Strong expertise in machine learning algorithms, data processing, and model deployment, with a proven ability to improve predictive accuracy, streamline workflows, and deliver scalable solutions supporting business objectives and operational efficiency.",
};

export const skillGroups = [
  {
    label: "Machine Learning & AI",
    path: "~/ml-ai",
    items: [
      "Supervised Learning",
      "Unsupervised Learning",
      "NLP",
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "Feature Engineering",
      "Model Evaluation",
      "Ensemble Methods",
    ],
  },
  {
    label: "Generative AI & LLM Tools",
    path: "~/genai",
    items: [
      "LangChain",
      "LlamaIndex",
      "Prompt Engineering",
      "FAISS",
      "Pinecone",
      "Embedding Models",
      "Semantic Retrieval",
    ],
  },
  {
    label: "Programming & Libraries",
    path: "~/code",
    items: ["Python", "SQL", "Scikit-learn", "TensorFlow", "PyTorch", "Pandas", "NumPy"],
  },
  {
    label: "Cloud Platforms",
    path: "~/cloud",
    items: [
      "AWS SageMaker",
      "AWS S3",
      "AWS EC2",
      "AWS Lambda",
      "AWS Glue",
      "API Gateway",
      "CloudWatch",
    ],
  },
  {
    label: "MLOps & Deployment",
    path: "~/mlops",
    items: [
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "Model Deployment",
      "Model Monitoring",
      "Experiment Tracking",
    ],
  },
  {
    label: "Data Engineering & Processing",
    path: "~/data",
    items: [
      "Data Cleaning",
      "Data Transformation",
      "ETL Pipelines",
      "Data Modeling",
      "Distributed Data Processing",
    ],
  },
  {
    label: "API & Integration",
    path: "~/api",
    items: [
      "REST APIs",
      "Microservices Architecture",
      "Real-Time Inference Pipelines",
      "System Integration",
    ],
  },
  {
    label: "Visualization & Reporting",
    path: "~/viz",
    items: ["Power BI", "Tableau", "Matplotlib", "Data Storytelling"],
  },
];

export const competencies = [
  "Analytical Thinking",
  "Problem Solving",
  "Stakeholder Communication",
  "Cross-Functional Collaboration",
];

export const experience = [
  {
    company: "Intuit",
    role: "Machine Learning Engineer",
    period: "Jan 2025 — Present",
    status: "ACTIVE",
    bullets: [
      "Designed and deployed machine learning models using Python and AWS SageMaker, improving prediction accuracy for financial use cases and enabling data-driven decision-making across enterprise platforms by 34%.",
      "Developed natural language processing pipelines for text classification and sentiment analysis, improving customer insight extraction and supporting product enhancements across financial services applications by 29%.",
      "Implemented retrieval-augmented generation pipelines using vector databases and contextual retrieval, improving response relevance and reducing manual knowledge lookup time across internal systems by 36%.",
      "Processed large-scale datasets using AWS S3 and AWS Glue, enabling efficient data ingestion and transformation while reducing data processing time across analytics workflows by 32%.",
      "Built large language model-based solutions for document summarization and intelligent query handling, improving information accessibility and enhancing productivity across internal business teams by 31%.",
      "Deployed containerized machine learning services using Docker and AWS ECS, improving scalability and ensuring consistent performance across production environments supporting high-volume customer interactions.",
      "Integrated real-time inference pipelines using AWS Lambda and API Gateway, enabling low-latency predictions and improving responsiveness of machine learning-powered applications by 28%.",
      "Monitored model performance using evaluation metrics and AWS CloudWatch, identifying drift patterns and improving reliability and stability of predictions across production systems by 26%.",
    ],
  },
  {
    company: "Tech Mahindra",
    role: "Software Engineer",
    period: "Nov 2021 — Jul 2023",
    status: "COMPLETED",
    bullets: [
      "Developed backend services using Python and integrated data-driven functionalities, supporting application performance improvements and enabling scalable system operations across enterprise solutions by 30%.",
      "Designed and maintained APIs for seamless data exchange, improving system integration capabilities and ensuring consistent communication across distributed application environments.",
      "Assisted in implementing data processing pipelines, improving efficiency of data handling and enabling faster analysis across multiple application modules by 27%.",
      "Collaborated with cross-functional teams to understand business requirements and translate them into technical solutions aligned with project objectives and delivery timelines.",
      "Improved application performance through code optimization and efficient data handling techniques, reducing response times and enhancing user experience across platforms by 26%.",
      "Participated in testing and debugging activities, identifying issues and ensuring delivery of stable and reliable software solutions across development lifecycle phases.",
      "Maintained technical documentation and system workflows, supporting knowledge sharing and ensuring clarity across teams working on complex application environments.",
    ],
  },
  {
    company: "Maruti Techlabs",
    role: "Data Scientist Intern",
    period: "May 2020 — Oct 2021",
    status: "COMPLETED",
    bullets: [
      "Developed machine learning models using Python to analyze business data, improving prediction accuracy and supporting data-driven decision-making across client projects by 32%.",
      "Performed data preprocessing and feature engineering, ensuring high-quality datasets for modeling and improving performance of machine learning algorithms across various use cases.",
      "Conducted statistical analysis and exploratory data analysis, identifying trends and patterns that supported business insights and improved reporting effectiveness by 28%.",
      "Built data visualization dashboards using Power BI, improving visibility into key metrics and enabling stakeholders to make informed decisions based on analytical insights.",
      "Collaborated with stakeholders to gather data requirements and deliver analytical solutions aligned with business objectives and project expectations.",
      "Evaluated model performance using validation techniques, ensuring accuracy and reliability of predictions across deployed machine learning solutions.",
      "Assisted in automating data workflows, reducing manual effort and improving efficiency across analytics and reporting processes by 25%.",
    ],
  },
];

export const projects = [
  {
    id: "01",
    title: "Enterprise Knowledge Assistant using RAG",
    tag: "RAG / LLM",
    bullets: [
      "Designed a retrieval-augmented generation system integrating vector search and LLMs, improving response accuracy and reducing manual knowledge lookup time across internal business workflows by 35%.",
      "Implemented semantic search using embeddings and vector databases, enabling context-aware query handling and improving information retrieval efficiency across large document repositories.",
      "Deployed solution using AWS services, ensuring scalable data processing and enabling real-time responses for internal users across enterprise knowledge management systems.",
    ],
    stack: ["LLMs", "Vector DB", "Embeddings", "AWS"],
  },
  {
    id: "02",
    title: "Customer Sentiment Analysis using NLP",
    tag: "NLP",
    bullets: [
      "Developed NLP models for sentiment classification using Python and machine learning techniques, improving customer feedback analysis accuracy and enabling data-driven product improvement decisions by 30%.",
      "Processed unstructured text data through preprocessing and feature engineering, improving model performance and ensuring reliable classification across large customer datasets.",
      "Visualized sentiment trends using dashboards, enabling stakeholders to monitor customer experience metrics and identify key areas for operational improvements.",
    ],
    stack: ["Python", "NLP", "ML", "Dashboards"],
  },
  {
    id: "03",
    title: "Fraud Detection System using Machine Learning",
    tag: "Anomaly Detection",
    bullets: [
      "Built anomaly detection models to identify fraudulent transactions, improving detection accuracy and reducing financial risk exposure across transaction processing systems by 28%.",
      "Engineered features from transactional data, enabling improved pattern recognition and enhancing model performance across financial datasets.",
      "Deployed models using cloud-based infrastructure, ensuring scalability and supporting real-time fraud detection across high-volume financial systems.",
    ],
    stack: ["ML", "Feature Eng.", "Cloud", "Real-time"],
  },
  {
    id: "04",
    title: "Real-Time Recommendation System",
    tag: "Recommender",
    bullets: [
      "Designed recommendation engine using collaborative filtering techniques, improving user engagement and increasing conversion rates across digital platforms by 25%.",
      "Processed large-scale interaction data, enabling personalized recommendations and improving user experience across customer-facing applications.",
      "Integrated real-time inference pipelines, ensuring low-latency predictions and improving responsiveness of recommendation services.",
    ],
    stack: ["Collab. Filtering", "Streaming", "Inference"],
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
