import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  CurrencyDollar,
  CheckCircle,
  Star,
  ArrowRight,
  X,
  UploadSimple,
  CheckFat,
  Spinner,
} from "@phosphor-icons/react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { jobs } from "./CareersPage";

const jobDetails: Record<
  string,
  {
    about: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
    process: string[];
  }
> = {
  "senior-protocol-engineer": {
    about:
      "You&#39;ll be at the heart of DeCruiz&#39;s core infrastructure team, designing and building the cross-chain bridge and ZK identity systems that underpin every product we ship. You&#39;ll collaborate daily with our Chief Research Scientist and CTO to turn cutting-edge research into battle-tested, production-grade protocol code.",
    responsibilities: [
      "Design and implement cross-chain message-passing and asset bridge primitives in Solidity/Rust",
      "Contribute to our ZK identity layer — circuits, proving systems, and on-chain verifiers",
      "Write comprehensive unit, integration, and fuzz tests; participate in internal security reviews",
      "Author protocol improvement proposals (PIPs) and specification documents",
      "Mentor mid-level engineers and conduct technical interviews",
    ],
    requirements: [
      "5+ years of software engineering experience, with 3+ years in smart contract / protocol development",
      "Deep fluency in Solidity; experience with Rust or Go is a strong plus",
      "Solid understanding of EVM internals, storage layouts, and gas optimization patterns",
      "Familiarity with cross-chain messaging standards (IBC, LayerZero, Wormhole, etc.)",
      "Clear technical writing skills — you can explain complex mechanisms to diverse audiences",
    ],
    niceToHave: [
      "Experience with ZK circuits (Circom, Halo2, PLONK)",
      "Prior work on ZK rollups or optimistic rollup stacks",
      "Published audits or academic papers in cryptography / distributed systems",
      "Prior open-source protocol contributions",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Technical screen with Engineering Lead (60 min)",
      "Take-home protocol design challenge (paid, ~4 hrs)",
      "Panel interview with CTO + Senior Engineers (90 min)",
      "Reference checks & offer",
    ],
  },
  "senior-web3-fullstack-engineer": {
  about:
    "You’ll play a key role in building DeCruiz’s end-to-end Web3 products, from smart contracts to backend services and user-facing applications. Working closely with product, design, and protocol teams, you’ll turn complex blockchain interactions into seamless, high-performance user experiences.",
    responsibilities: [
      "Design and develop full-stack decentralized applications (dApps) across frontend, backend, and smart contract layers",
      "Integrate smart contracts with scalable backend services and APIs",
      "Build responsive, high-quality user interfaces using modern frameworks (React/Next.js)",
      "Collaborate with protocol engineers to ensure smooth interaction with cross-chain and on-chain systems",
      "Write clean, testable code with unit, integration, and end-to-end tests",
      "Optimize application performance, security, and scalability",
      "Mentor junior engineers and contribute to architectural decisions",
    ],
    requirements: [
      "5+ years of full-stack engineering experience, with 2+ years in Web3 development",
      "Strong proficiency in JavaScript/TypeScript and modern frontend frameworks (React, Next.js)",
      "Experience with smart contract development (Solidity) and Web3 libraries (ethers.js, viem, web3.js)",
      "Solid understanding of backend development (Node.js, APIs, databases)",
      "Familiarity with blockchain fundamentals, wallets, and transaction flows",
      "Experience integrating with DeFi protocols, NFTs, or cross-chain applications",
      "Strong problem-solving skills and ability to work in fast-paced environments",
    ],
    niceToHave: [
      "Experience with Rust or Go for backend or blockchain development",
      "Familiarity with indexing solutions (The Graph, custom indexers)",
      "Experience building on L2s (Optimism, Arbitrum, zkSync, etc.)",
      "Understanding of security best practices in smart contract and frontend development",
      "Prior contributions to open-source Web3 projects",
    ],
    process: [
      "Initial Technical Assessment (~90 min)",
      "Technical screen (Full-Stack + Web3) (60 min)",
      "Take-home coding challenge (paid, ~4 hrs)",
      "Final interview with Engineering & Product (90 min)",
      "Reference checks & offer",
    ],
  },
  "defi-quant-researcher": {
    about:
      "You&#39;ll join our DeFi team to model, simulate, and optimize the economic mechanisms that power our AMMs, lending markets, and governance systems. Your work will directly shape tokenomics decisions and will be published openly to benefit the broader DeFi research community.",
    responsibilities: [
      "Build agent-based simulations and Monte Carlo models for AMM and lending protocol parameters",
      "Research and prototype novel liquidity incentive structures and tokenomics designs",
      "Publish findings as internal research reports and public blog posts / papers",
      "Collaborate with smart contract engineers to translate models into on-chain implementations",
      "Monitor live protocol metrics and surface actionable insights to the governance community",
    ],
    requirements: [
      "Background in quantitative finance, economics, mathematics, or a related quantitative field",
      "3+ years in DeFi research, protocol economics, or financial engineering",
      "Python proficiency for data analysis and simulation (NumPy, Pandas, SciPy)",
      "Deep understanding of AMM mechanics (Uniswap v2/v3, Curve, Balancer) and lending protocols",
      "Experience or strong interest in on-chain governance and DAO incentive design",
    ],
    niceToHave: [
      "Solidity knowledge for prototyping economic mechanisms",
      "Familiarity with Dune Analytics, Flipside, or similar on-chain analytics tooling",
      "Prior academic publications in mechanism design or cryptoeconomics",
      "Active presence in DeFi research communities (Ethereum Research, Mirror, etc.)",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Research presentation: walk us through a past project (45 min)",
      "Model review session with Head of DeFi (60 min)",
      "Culture interview with leadership (45 min)",
      "Reference checks & offer",
    ],
  },
  "blockchain-game-developer": {
    about:
      "You&#39;ll help shape the future of on-chain gaming by building the SDK and infrastructure layer that lets game developers plug into DeCruiz&#39;s asset portability and economy primitives. You&#39;ll work closely with our Head of Gaming and interface directly with studio partners.",
    responsibilities: [
      "Design and maintain the DeCruiz Gaming SDK (TypeScript/Unity/Unreal plugins)",
      "Build and audit ERC-1155/ERC-721 asset contracts optimized for high-frequency in-game transactions",
      "Develop cross-game asset bridging mechanics and player identity systems",
      "Create developer documentation, samples, and hackathon starter kits",
      "Engage with game studio partners to gather integration feedback and drive roadmap priorities",
    ],
    requirements: [
      "3+ years of game development experience (Unity or Unreal) plus 2+ years in Web3/blockchain",
      "Strong Solidity skills — you&#39;ve deployed ERC-721/1155 contracts in production",
      "TypeScript / JavaScript for SDK and tooling development",
      "Understanding of gas economics and Layer-2 scalability solutions relevant to gaming",
      "Passion for gaming — you play and think critically about game economies",
    ],
    niceToHave: [
      "Experience with zkEVM rollups or Immutable X / Polygon CDK",
      "Prior work on play-to-earn or GameFi title with real user volume",
      "Open-source game tooling or SDK contributions",
      "Comfort with Rust for performance-critical backend game services",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Portfolio / project walkthrough with Head of Gaming (60 min)",
      "Coding challenge — build a mini on-chain game mechanic (paid, ~3 hrs)",
      "Panel with Engineering + Gaming team (75 min)",
      "Reference checks & offer",
    ],
  },
  "platform-engineer": {
    about:
    "You’ll build and scale the core infrastructure that powers DeCruiz’s Web3 ecosystem. From CI/CD pipelines to blockchain node orchestration and cloud-native systems, you’ll ensure our platform is reliable, secure, and developer-friendly.",
    responsibilities: [
      "Design, build, and maintain scalable cloud infrastructure and internal platforms",
      "Manage blockchain nodes, RPC infrastructure, and indexing services",
      "Implement CI/CD pipelines and improve developer experience across teams",
      "Ensure system reliability through monitoring, logging, and alerting solutions",
      "Optimize infrastructure for performance, cost, and scalability",
      "Collaborate with engineering teams to support deployment and runtime needs",
      "Enforce security best practices across infrastructure and services",
    ],
    requirements: [
      "5+ years of experience in platform engineering, DevOps, or SRE roles",
      "Strong experience with cloud providers (AWS, GCP, or Azure)",
      "Proficiency with containerization and orchestration (Docker, Kubernetes)",
      "Experience with CI/CD tools (GitHub Actions, GitLab CI, or similar)",
      "Familiarity with infrastructure as code (Terraform, Pulumi)",
      "Understanding of networking, security, and distributed systems",
      "Experience supporting blockchain infrastructure is a strong plus",
    ],
    niceToHave: [
      "Experience running blockchain nodes (Ethereum, Solana, etc.)",
      "Familiarity with observability stacks (Prometheus, Grafana, ELK)",
      "Experience with multi-chain or cross-chain infrastructure",
      "Knowledge of backend development (Go, Rust, or Node.js)",
      "Contributions to open-source infrastructure tools",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Technical screen (Infrastructure & Systems) (60 min)",
      "Take-home or live systems design exercise",
      "Final interview with Engineering team (90 min)",
      "Reference checks & offer",
    ],
  },
  "smart-contract-security-auditor": {
    about:
      "You&#39;ll be our in-house smart contract security expert, responsible for reviewing all DeCruiz protocol code before deployment and working hand-in-hand with engineering to build secure-by-default development practices. You&#39;ll also coordinate with external audit firms and manage our bug bounty program.",
    responsibilities: [
      "Conduct thorough manual audits of all DeCruiz smart contracts and protocol upgrades",
      "Develop and maintain automated security tooling (Slither, Echidna/Foundry fuzz tests, Mythril)",
      "Write detailed audit reports with severity ratings, PoC exploits, and remediation guidance",
      "Manage our bug bounty program on Immunefi and triage community submissions",
      "Lead security-focused code reviews and run internal threat-modelling workshops",
    ],
    requirements: [
      "3+ years of smart contract security auditing experience (portfolio of past audit reports required)",
      "Expert-level Solidity understanding — storage collisions, reentrancy, integer overflow, proxy patterns, etc.",
      "Proficiency with Foundry or Hardhat testing frameworks, including advanced fuzz testing",
      "Track record of discovering meaningful vulnerabilities in production protocols",
      "Clear, structured writing for audit report delivery",
    ],
    niceToHave: [
      "Experience auditing ZK circuits or cryptographic libraries",
      "Rust / C++ background for low-level protocol analysis",
      "CTF achievements (Paradigm, SEAL, etc.)",
      "Familiarity with Ethereum&#39;s EIP process and upcoming protocol changes",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Audit sample review — we share a real (anonymized) snippet for you to analyse (async)",
      "Technical deep-dive with CTO + Lead Engineer (90 min)",
      "Team culture interview (45 min)",
      "Reference checks & offer",
    ],
  },
  "community-partnerships-lead": {
    about:
      "You&#39;ll be the face of DeCruiz to our developer and community ecosystem. You&#39;ll build programs that turn developers into champions, run hackathons that generate real protocol integrations, and create the educational content that helps the next generation of Web3 builders choose DeCruiz as their foundation.",
    responsibilities: [
      "Own the DeCruiz developer relations program — office hours, Discord, documentation, and tutorials",
      "Plan and execute hackathons and grant programs that drive meaningful protocol adoption",
      "Produce high-quality technical content: guides, video walkthroughs, sample apps",
      "Build and maintain relationships with Web3 developer communities, universities, and bootcamps",
      "Surface community feedback to the product and protocol teams to shape roadmap priorities",
    ],
    requirements: [
      "3+ years in developer relations, developer advocacy, or technical community management",
      "Solid Web3 technical literacy — you understand smart contracts, wallets, and DeFi primitives",
      "Excellent public speaking and written communication skills",
      "Proven ability to run hackathons or grant programs with measurable developer outcomes",
      "Empathetic, community-first mindset — you genuinely love helping developers succeed",
    ],
    niceToHave: [
      "Experience as a software engineer or technical writer",
      "Active presence in Web3 developer communities (ETHGlobal, Encode Club, etc.)",
      "Prior experience managing community programs at a Layer-1 or Layer-2 protocol",
      "Multilingual skills to support global developer communities",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Portfolio review — examples of content, talks, or community programs you&#39;ve run (async)",
      "Interview with Head of Partnerships + Engineering Lead (60 min)",
      "Short content creation task (paid, ~2 hrs)",
      "Reference checks & offer",
    ],
  },
  "senior-blockchain-engineer": {
    about:
      "You’ll design, build, and scale core blockchain systems that power DeCruiz’s Web3 ecosystem. Working closely with protocol, platform, and product teams, you’ll develop secure, efficient, and production-grade smart contracts and on-chain infrastructure that support millions of transactions across decentralized applications.",
    responsibilities: [
      "Design and implement secure smart contracts in Solidity and/or Rust",
      "Build and maintain on-chain systems including DeFi primitives, token standards, and protocol modules",
      "Optimize contract performance, gas efficiency, and execution safety",
      "Collaborate with protocol engineers on cross-chain and interoperability solutions",
      "Conduct internal code reviews and contribute to smart contract security audits",
      "Write comprehensive tests including unit, integration, and fuzz testing",
      "Participate in protocol design discussions and technical architecture decisions",
    ],
    requirements: [
      "5+ years of software engineering experience, with 3+ years in blockchain development",
      "Strong proficiency in Solidity and experience with EVM-based chains",
      "Experience with Rust or Go for blockchain or backend systems is a strong plus",
      "Deep understanding of smart contract security patterns and vulnerabilities",
      "Familiarity with DeFi protocols, token standards (ERC-20, ERC-721, ERC-4626, etc.)",
      "Experience with testing frameworks (Foundry, Hardhat, or similar)",
      "Strong systems thinking and ability to design scalable on-chain architectures",
    ],
    niceToHave: [
      "Experience with L2 solutions (Arbitrum, Optimism, zkSync, Starknet)",
      "Knowledge of zero-knowledge proofs and cryptographic primitives",
      "Experience with cross-chain messaging protocols (LayerZero, Wormhole, IBC)",
      "Prior smart contract audit experience or security research background",
      "Open-source contributions to blockchain or DeFi protocols",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Technical screening (Blockchain & Smart Contracts) (60 min)",
      "Take-home smart contract design challenge (paid, ~4–6 hrs)",
      "System design / architecture interview with Engineering Lead (90 min)",
      "Final interview with CTO & team",
      "Reference checks & offer",
    ],
  },
  "product-manager-defi": {
  about:
    "You’ll drive the vision, strategy, and execution of DeCruiz’s Web3 products, working at the intersection of engineering, design, and business. You’ll translate complex blockchain capabilities into user-centric products, ensuring we deliver impactful and scalable solutions across the ecosystem.",
    responsibilities: [
      "Define product vision, roadmap, and priorities aligned with company strategy",
      "Collaborate with engineering, design, and business teams to deliver end-to-end product experiences",
      "Gather and analyze user feedback, on-chain data, and market trends to inform decisions",
      "Write clear product requirements (PRDs), user stories, and acceptance criteria",
      "Drive product launches, feature releases, and iteration cycles",
      "Work closely with Web3 engineers to understand technical constraints and opportunities",
      "Monitor product performance using KPIs and continuously optimize user experience",
    ],
    requirements: [
      "4+ years of product management experience, preferably in tech or Web3",
      "Strong understanding of blockchain, DeFi, or crypto ecosystems",
      "Proven ability to ship complex, user-facing products from concept to launch",
      "Experience working with cross-functional teams in agile environments",
      "Excellent communication and stakeholder management skills",
      "Data-driven mindset with experience using analytics tools",
    ],
    niceToHave: [
      "Experience building Web3 products (wallets, dApps, DeFi platforms, NFTs)",
      "Technical background or prior experience working closely with engineers",
      "Familiarity with tokenomics, governance, and decentralized ecosystems",
      "Experience in startups or high-growth environments",
      "Passion for emerging technologies and crypto innovation",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Product case study / take-home assignment",
      "Interview with Product & Engineering leaders (60–90 min)",
      "Final round with leadership team",
      "Reference checks & offer",
    ],
  },
  "product-designer": {
    about:
    "You’ll shape the user experience of DeCruiz’s Web3 products, turning complex blockchain interactions into intuitive, elegant interfaces. Working closely with product managers and engineers, you’ll design seamless end-to-end journeys that make decentralized technology accessible to everyone.",
    responsibilities: [
      "Design user-centric experiences for dApps, dashboards, and Web3 platforms",
      "Create wireframes, prototypes, and high-fidelity UI designs",
      "Collaborate with product and engineering teams to define and implement features",
      "Conduct user research, usability testing, and iterate based on feedback",
      "Establish and maintain design systems and UI consistency across products",
      "Simplify complex blockchain workflows into clear, intuitive user flows",
      "Ensure designs meet accessibility and performance standards",
    ],
    requirements: [
      "4+ years of product design experience (UI/UX), preferably in tech or Web3",
      "Strong portfolio demonstrating end-to-end product design work",
      "Proficiency in design tools (Figma, Sketch, or similar)",
      "Experience designing complex, data-rich interfaces",
      "Understanding of user-centered design principles and best practices",
      "Ability to collaborate closely with engineers and product managers",
      "Strong communication and storytelling skills",
    ],
    niceToHave: [
      "Experience designing Web3 products (wallets, DeFi platforms, NFTs)",
      "Familiarity with blockchain UX challenges (wallets, gas fees, transactions)",
      "Experience with motion design or micro-interactions",
      "Basic understanding of frontend technologies (HTML/CSS/React)",
      "Previous work in startups or fast-paced environments",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Portfolio review with Design team (60 min)",
      "Design challenge or case study presentation",
      "Final interview with Product & Engineering",
      "Reference checks & offer",
    ],
  },
  "growth-lead": {
    about:
      "You’ll own and scale DeCruiz’s growth engine, driving user acquisition, engagement, and retention across our Web3 ecosystem. Working closely with product, community, and leadership, you’ll design and execute data-driven campaigns that turn cutting-edge technology into real user adoption.",
    responsibilities: [
      "Define and execute growth strategies across acquisition, activation, and retention funnels",
      "Run and optimize multi-channel campaigns (social, paid, SEO, partnerships, community)",
      "Analyze user behavior, on-chain data, and campaign performance to drive decisions",
      "Collaborate with product and design teams to improve conversion and user journeys",
      "Experiment rapidly with new growth tactics, channels, and messaging",
      "Build and manage referral, ambassador, and community-driven growth programs",
      "Own growth KPIs and continuously iterate to achieve targets",
    ],
    requirements: [
      "5+ years of experience in growth marketing, preferably in tech or Web3",
      "Proven track record of scaling products or platforms through data-driven growth strategies",
      "Strong analytical skills with experience in tools like Google Analytics, Mixpanel, or similar",
      "Experience managing paid acquisition channels and performance marketing",
      "Deep understanding of Web3, crypto communities, and user behavior",
      "Excellent communication and cross-functional collaboration skills",
    ],
    niceToHave: [
      "Experience launching or growing Web3 products (DeFi, NFTs, wallets, etc.)",
      "Familiarity with on-chain analytics tools (Dune, Nansen)",
      "Experience with content marketing and SEO strategies",
      "Background in community-led growth or DAO ecosystems",
      "Startup experience in high-growth environments",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Growth strategy case study or assignment",
      "Interview with Marketing & Product leaders (60–90 min)",
      "Final round with leadership team",
      "Reference checks & offer",
    ],
  },
  "content-strategist": {
    about:
      "You’ll craft and lead DeCruiz’s content strategy, translating complex Web3 concepts into clear, compelling narratives that drive awareness, education, and adoption. You’ll work across product, marketing, and community teams to build a strong and consistent voice in the ecosystem.",
    responsibilities: [
      "Define and execute a content strategy aligned with growth and product goals",
      "Create high-quality content across formats (blogs, whitepapers, social, newsletters)",
      "Translate complex blockchain concepts into accessible, engaging narratives",
      "Collaborate with product and engineering teams to produce technical content",
      "Manage content calendars and ensure consistent publishing cadence",
      "Optimize content for SEO, engagement, and conversion",
      "Analyze performance metrics and iterate on content strategy",
    ],
    requirements: [
      "4+ years of experience in content strategy, marketing, or communications",
      "Strong understanding of Web3, blockchain, and crypto ecosystems",
      "Excellent writing and storytelling skills with a strong portfolio",
      "Experience creating both technical and non-technical content",
      "Familiarity with SEO best practices and content analytics tools",
      "Ability to work cross-functionally in fast-paced environments",
    ],
    niceToHave: [
      "Experience in Web3 companies or crypto-native projects",
      "Background in journalism, technical writing, or research",
      "Familiarity with on-chain analytics and data storytelling",
      "Experience managing social media or community content",
      "Passion for emerging technologies and decentralized ecosystems",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Content writing assignment or portfolio review",
      "Interview with Marketing & Product teams (60 min)",
      "Final round with leadership",
      "Reference checks & offer",
    ],
  },
  "senior-web3-frontend-engineer": {
    about:
      "You’ll lead the development of high-performance, user-friendly interfaces for DeCruiz’s Web3 applications. Working closely with product, design, and smart contract teams, you’ll turn complex blockchain interactions into seamless and intuitive frontend experiences.",
    responsibilities: [
      "Build and maintain responsive, high-quality frontend applications using React/Next.js",
      "Integrate Web3 functionality (wallets, transactions, signatures) using libraries like ethers.js, viem, or wagmi",
      "Collaborate with smart contract and backend engineers to ensure smooth end-to-end functionality",
      "Optimize frontend performance, accessibility, and cross-browser compatibility",
      "Implement robust state management and data fetching strategies",
      "Write clean, maintainable, and well-tested code",
      "Mentor junior engineers and contribute to frontend architecture decisions",
    ],
    requirements: [
      "5+ years of frontend engineering experience, with 2+ years in Web3",
      "Strong proficiency in JavaScript/TypeScript and modern frameworks (React, Next.js)",
      "Experience with Web3 libraries (ethers.js, viem, wagmi) and wallet integrations",
      "Understanding of blockchain UX patterns (transactions, gas, confirmations)",
      "Experience with state management tools (Redux, Zustand, or similar)",
      "Familiarity with REST/GraphQL APIs and backend integration",
      "Strong attention to detail in UI/UX implementation",
    ],
    niceToHave: [
      "Experience with design systems and component libraries",
      "Familiarity with L2 ecosystems (Optimism, Arbitrum, zkSync)",
      "Experience with performance monitoring and analytics tools",
      "Basic knowledge of smart contract development (Solidity)",
      "Contributions to open-source Web3 or frontend projects",
    ],
    process: [
      "Intro call with Talent (30 min)",
      "Technical screen (Frontend + Web3) (60 min)",
      "Take-home coding challenge (paid, ~4 hrs)",
      "Final interview with Engineering & Design (90 min)",
      "Reference checks & offer",
    ],
  }
};

// ── Application Modal ──────────────────────────────────────────────────────
type ModalStep = "form" | "submitting" | "success";

function ApplyModal({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
  const [step, setStep] = useState<ModalStep>("form");
  const [fileName, setFileName] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    linkedin: "",
    coverLetter: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Entrance animation
  useEffect(() => {
    document.body.style.overflow = "hidden";
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(panelRef.current, { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out", delay: 0.05 });
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    gsap.to(panelRef.current, { opacity: 0, y: 30, scale: 0.97, duration: 0.25, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: onClose });
  };

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStep("submitting");
    setTimeout(() => setStep("success"), 1800);
  };

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) setFileName(file.name);
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div ref={panelRef} className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-1">Apply for</p>
            <h2 className="text-foreground font-bold text-xl leading-tight">{jobTitle}</h2>
          </div>
          {step !== "submitting" && (
            <button onClick={handleClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150 cursor-pointer flex-shrink-0 mt-0.5">
              <X size={18} weight="bold" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {step === "form" && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {/* Full name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-foreground font-sans text-sm font-medium">Full Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground font-sans text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-150 ${errors.fullName ? "border-red-500/60" : "border-border"}`}
                />
                {errors.fullName && <p className="text-red-400 font-mono text-xs">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-foreground font-sans text-sm font-medium">Email Address <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={`w-full px-4 py-2.5 rounded-xl bg-background border text-foreground font-sans text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-150 ${errors.email ? "border-red-500/60" : "border-border"}`}
                />
                {errors.email && <p className="text-red-400 font-mono text-xs">{errors.email}</p>}
              </div>

              {/* LinkedIn */}
              <div className="flex flex-col gap-1.5">
                <label className="text-foreground font-sans text-sm font-medium">LinkedIn / Portfolio <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/your-profile"
                  value={form.linkedin}
                  onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground font-sans text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-150"
                />
              </div>

              {/* Resume upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-foreground font-sans text-sm font-medium">Resume / CV <span className="text-muted-foreground font-normal">(optional)</span></label>
                <label className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-background border border-border border-dashed text-muted-foreground font-mono text-xs cursor-pointer hover:border-accent/40 hover:text-accent transition-all duration-150">
                  <UploadSimple size={16} weight="bold" className="flex-shrink-0" />
                  <span className="truncate">{fileName ?? "Click to upload PDF, DOC, DOCX"}</span>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              {/* Cover letter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-foreground font-sans text-sm font-medium">Why this role? <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea
                  rows={4}
                  placeholder="Tell us what excites you about this position..."
                  value={form.coverLetter}
                  onChange={e => setForm(f => ({ ...f, coverLetter: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground font-sans text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-150 resize-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cta-primary text-cta-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer text-sm mt-1"
              >
                Submit Application
                <ArrowRight size={16} weight="bold" />
              </button>
            </form>
          )}

          {step === "submitting" && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Spinner size={40} className="text-accent animate-spin" weight="bold" />
              <p className="text-foreground font-bold text-lg">Submitting your application…</p>
              <p className="text-muted-foreground font-serif text-sm text-center">Hang tight, this won&#39;t take long.</p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center justify-center py-12 gap-5 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <CheckFat size={32} weight="fill" className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-foreground font-bold text-xl mb-2">Application Submitted!</h3>
                <p className="text-muted-foreground font-serif text-sm leading-relaxed max-w-xs mx-auto">
                  Thanks for applying to <strong className="text-foreground">{jobTitle}</strong>. Our team will review your application and reach out within 5–7 business days.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-cta-primary text-cta-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer text-sm"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

  const job = jobs.find((j) => j.id === jobId);
  const detail = jobId ? jobDetails[jobId] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
      );
      gsap.fromTo(
        ".detail-block",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".details-wrapper", start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, [jobId]);

  if (!job || !detail) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 px-8 text-center">
        <h1 className="text-foreground font-bold text-3xl">Role not found</h1>
        <p className="text-muted-foreground font-serif">
          This position may have been filled or the link is incorrect.
        </p>
        <button
          onClick={() => navigate("/careers")}
          className="px-6 py-3 rounded-xl bg-cta-primary text-cta-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          View all open roles
        </button>
      </div>
    );
  }

  const Icon = job.icon;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto opacity-0">
          <button
            onClick={() => navigate("/careers")}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-200 mb-8 cursor-pointer text-sm font-mono"
          >
            <ArrowLeft size={16} weight="bold" />
            All open roles
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${job.gradient} flex items-center justify-center shadow-xl flex-shrink-0`}
            >
              <Icon size={30} weight="fill" className="text-white" />
            </div>
            <div>
              <h1
                className="text-foreground font-bold text-3xl md:text-5xl leading-tight tracking-tight"
                style={{ letterSpacing: "-0.025em" }}
              >
                {job.title}
              </h1>
            </div>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3 text-sm font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
              <MapPin size={13} weight="fill" className="text-accent/70" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
              <Clock size={13} weight="fill" className="text-accent/70" />
              {job.type}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
              <CurrencyDollar size={13} weight="fill" className="text-accent/70" />
              {job.salaryRange}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border">
              <Briefcase size={13} weight="fill" className="text-accent/70" />
              {job.department}
            </span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="py-16 px-8 bg-gradient-2">
        <div className="details-wrapper max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: main content */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* About the role */}
            <div className="detail-block opacity-0 p-8 rounded-2xl bg-card border border-border">
              <h2 className="text-foreground font-bold text-xl mb-4 flex items-center gap-2">
                <Star size={18} weight="fill" className="text-accent" />
                About the Role
              </h2>
              <p className="text-muted-foreground font-serif text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: detail.about }}
              />
            </div>

            {/* Responsibilities */}
            <div className="detail-block opacity-0 p-8 rounded-2xl bg-card border border-border">
              <h2 className="text-foreground font-bold text-xl mb-5 flex items-center gap-2">
                <CheckCircle size={18} weight="fill" className="text-emerald-400" />
                What You&#39;ll Do
              </h2>
              <ul className="flex flex-col gap-3">
                {detail.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    <span className="text-muted-foreground font-serif text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="detail-block opacity-0 p-8 rounded-2xl bg-card border border-border">
              <h2 className="text-foreground font-bold text-xl mb-5 flex items-center gap-2">
                <CheckCircle size={18} weight="fill" className="text-accent" />
                What We&#39;re Looking For
              </h2>
              <ul className="flex flex-col gap-3">
                {detail.requirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    <span className="text-muted-foreground font-serif text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to have */}
            <div className="detail-block opacity-0 p-8 rounded-2xl bg-card border border-border">
              <h2 className="text-foreground font-bold text-xl mb-5 flex items-center gap-2">
                <Star size={18} weight="fill" className="text-amber-400" />
                Nice to Have
              </h2>
              <ul className="flex flex-col gap-3">
                {detail.niceToHave.map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 mt-2.5 flex-shrink-0" />
                    <span className="text-muted-foreground font-serif text-sm leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: sidebar */}
          <div className="flex flex-col gap-6">
            {/* Apply CTA */}
            <div className="detail-block opacity-0 p-6 rounded-2xl bg-card border border-border sticky top-24">
              <h3 className="text-foreground font-bold text-lg mb-2">Ready to apply?</h3>
              <p className="text-muted-foreground font-serif text-sm leading-relaxed mb-5">
                Send us your CV and a short note on why this role excites you.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-cta-primary text-cta-primary-foreground font-sans font-medium hover:opacity-90 transition-opacity duration-200 cursor-pointer text-sm"
              >
                Apply Now
                <ArrowRight size={16} weight="bold" />
              </button>
              <p className="text-muted-foreground font-mono text-xs text-center mt-3">
                careers@decruizlabs.com
              </p>
            </div>

            {/* Interview process */}
            <div className="detail-block opacity-0 p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-foreground font-bold text-base mb-4">Interview Process</h3>
              <ol className="flex flex-col gap-3">
                {detail.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center text-accent font-mono text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground font-serif text-sm leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other roles ── */}
      <section className="py-16 px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-foreground font-bold text-2xl mb-6">Other Open Roles</h2>
          <div className="flex flex-col gap-3">
            {jobs
              .filter((j) => j.id !== jobId)
              .slice(0, 3)
              .map((j) => {
                const JIcon = j.icon;
                return (
                  <button
                    key={j.id}
                    onClick={() => navigate(`/careers/${j.id}`)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/40 transition-all duration-200 text-left cursor-pointer group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${j.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <JIcon size={18} weight="fill" className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-bold text-sm group-hover:text-accent transition-colors duration-200">
                        {j.title}
                      </p>
                      <p className="text-muted-foreground font-mono text-xs">{j.location}</p>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-accent transition-colors duration-200 flex-shrink-0" />
                  </button>
                );
              })}
          </div>
          <button
            onClick={() => navigate("/careers")}
            className="mt-6 w-full py-3 rounded-xl border border-border bg-card text-muted-foreground font-sans text-sm hover:border-accent/40 hover:text-accent transition-all duration-200 cursor-pointer"
          >
            View all {jobs.length} open roles
          </button>
        </div>
      </section>
      {showModal && (
        <ApplyModal jobTitle={job.title} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
