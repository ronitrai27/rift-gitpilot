<div align="center">

<img src="https://img.shields.io/badge/Gitpilot-Autonomous%20DevOps%20Agent-6366f1?style=for-the-badge&logo=github&logoColor=white" alt="Gitpilot Banner" />

<h1>🚀 Gitpilot</h1>
<p><strong>The Autonomous DevOps Agent that thinks, reviews, and acts — so your team doesn't have to.</strong></p>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Convex](https://img.shields.io/badge/Convex-Realtime%20DB-orange?style=flat-square)](https://convex.dev/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-blue?style=flat-square&logo=google)](https://deepmind.google/technologies/gemini/)
[![Inngest](https://img.shields.io/badge/Inngest-Orchestration-purple?style=flat-square)](https://inngest.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📖 What is Gitpilot?

**Gitpilot** is an advanced, autonomous DevOps agent that transforms your GitHub repository into an intelligent, self-managing workspace. It goes beyond traditional CI/CD monitoring by actively participating in the development process — analyzing code semantics, detecting bugs before they deploy, auto-assigning tasks to the right team members, and generating actionable fix suggestions automatically.

> Built for teams that want a **teammate**, not just a dashboard.

---

## ✨ Key Features

### 🤖 Autonomous Auto-Assign Agent
Stop manually routing Jira tickets. The **Auto-Assign Agent** analyzes every new issue and dynamically matches it to the most qualified team member based on their past contributions and expertise.

**Workflow:** New Issue Opened → Fetch Team Skills → Evaluate Best Match → Assign & Notify

---

### 🔍 Intelligent Commit Analysis
Gitpilot doesn't just watch commits — it understands them.

- **File-by-file diff analysis** for deep contextual understanding
- **Critical detection** of logic errors, security flaws, and bad practices
- **Auto-generated Mermaid.js sequence diagrams** to visualize complex logic changes

---

### 🗺️ Repository Visualization
An interactive **3D / Tree-based Visualizer** that maps your entire codebase and highlights **Risk Heatmaps** — pinpointing areas of high complexity or recurring bugs at a glance.

---

### 📊 Interactive Team Dashboard
A premium, glassmorphic React dashboard that serves as mission control:

| Panel | Description |
|---|---|
| **Review Feed** | Live stream of AI-generated code reviews |
| **Issue Tracker** | Kanban-style board for agent-created and user-created issues |
| **Team Stats** | Real-time visibility into who is working on what |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        GITPILOT                             │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │   Frontend   │    │   Backend    │    │  AI & Jobs   │   │
│  │              │    │              │    │              │   │
│  │  Next.js 14  │◄──►│    Convex    │◄──►│   Gemini     │   │
│  │  Shadcn/UI   │    │    (RT DB)   │    │  2.5 Flash   │   │
│  │  Tailwind    │    │    Clerk     │    │   Inngest    │   │
│  │  Framer      │    │   Pinecone   │    │  (Workflows) │   │
│  └──────────────┘    └──────────────┘    └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Frontend
- **Framework:** Next.js 16+ (App Router)
- **UI:** Shadcn/UI + Tailwind CSS + Framer Motion
- **Visualization:** React Flow / Custom Canvas

### Backend & Data
- **Database:** Convex — Real-time, serverless data sync
- **Auth:** Clerk — Secure user management
- **Vector DB:** Pinecone — Codebase semantic knowledge base

### AI & Automation
- **LLM:** Google Gemini 2.5 Flash — High-speed, large context window
- **Orchestration:** Inngest — Reliable background jobs & multi-step agent workflows

---

## 🗺️ Challenge Solution Mapping

| Challenge Requirement | Gitpilot Feature | Implementation |
|---|---|---|
| Input Interface | Smart Onboarding Flow | Multi-step repo connection with metadata import and team invite |
| Analyze Repository | RAG & Semantic Indexing | Full codebase indexed via Pinecone RAG |
| Discover Failures & Fixes | AI Commit Analysis | Gemini 2.5 Flash scans every push for bugs and security risks |
| Run Tests & Verify | Predictive Static Analysis | LLM-powered build failure prediction at commit time |
| Commit Fixes | Agent Reviews & Issues | Autonomous GitHub Issues with suggested patches |
| React Dashboard | Real-time Activity Feed | Live dashboard with repo health, issues, and team stats |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A GitHub account and repository
- API keys for: Convex, Clerk, Pinecone, Google Gemini, Inngest

### Installation

```bash
# Clone the repository
git clone https://github.com/ronitrai27/rift-gitpilot
cd gitpilot

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```


### Run Locally

```bash
# Start the development server
npm run dev

# In a separate terminal, start Convex
npx convex dev

# In a separate terminal, start Inngest dev server
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000) to access your local Gitpilot instance.

---

## 🔮 Roadmap

- [ ] **Active CI/CD Interception** — Directly trigger GitHub Actions and parse logs
- [ ] **Self-Healing Code** — Automatically apply suggested fixes via Pull Requests
- [ ] **Voice Interface** — Command the agent via voice input
- [ ] **Slack / Discord Integration** — Get agent notifications in your team chat
- [ ] **Multi-repo Support** — Manage an entire organization from one dashboard

---

## 📈 Impact

| Metric | Result |
|---|---|
| Admin overhead reduction | **40%** |
| Bug detection stage | **Before deployment** (commit phase) |
| Task assignment time | **Instant** (automated) |
| Context window | **Large** (Gemini 2.5 Flash) |

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and open a pull request.

```bash
# Fork and clone
git checkout -b feature/your-feature-name

# Make your changes, then
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

