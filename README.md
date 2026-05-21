# DevPath — Backend Mastery PWA

> Master Node.js · Express · Next.js · SQL · PostgreSQL · Prisma · NoSQL · MongoDB  
> Live at: **https://naveedeme.github.io/backend-tutorial/**

[![Deploy to GitHub Pages](https://github.com/naveedeme/backend-tutorial/actions/workflows/deploy.yml/badge.svg)](https://github.com/naveedeme/backend-tutorial/actions/workflows/deploy.yml)

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🖥 **Terminal Simulator** | Full bash, Node REPL, psql, MongoDB shell with tab completion, history, and package installation animation |
| 📚 **8 Learning Tracks** | Node.js → Express → Next.js → SQL → PostgreSQL → Prisma → NoSQL → MongoDB |
| 📈 **Progress Tracking** | Lesson completion persisted to localStorage |
| 🚀 **15+ Projects** | Step-by-step guides with real code, commands, and React frontend design notes |
| 📱 **Installable PWA** | Works offline, home screen icon, service worker caching |
| ⚡ **Instant Navigation** | Hash-based routing, no page reloads |

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create the repository

```bash
# On GitHub: create repo named "backend-tutorial" under your account "naveedeme"
# Then locally:
git clone https://github.com/naveedeme/backend-tutorial.git
cd backend-tutorial
```

### Step 2 — Copy project files

Copy all files from this zip into the repo root, keeping the directory structure.

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

### Step 4 — Push and deploy

```bash
git add .
git commit -m "feat: initial DevPath PWA"
git push origin main
```

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will:
1. ✅ Install Node.js 20
2. ✅ Run `npm ci`
3. ✅ Run `npm run build` (Vite)
4. ✅ Deploy `dist/` to GitHub Pages

Your app will be live at: `https://naveedeme.github.io/backend-tutorial/`

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev
# → http://localhost:5173/backend-tutorial/

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🗂 Project Structure

```
backend-tutorial/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker (offline support)
│   ├── favicon.svg             # App icon
│   ├── icon-192.svg            # PWA icon 192×192
│   ├── icon-512.svg            # PWA icon 512×512
│   └── screenshot-wide.svg    # PWA screenshot
├── src/
│   ├── main.jsx                # React entry + SW registration
│   ├── App.jsx                 # Root component, routing, layout
│   ├── index.css               # Global design system
│   ├── components/
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   ├── Dashboard.jsx       # Home screen
│   │   ├── Terminal.jsx        # Interactive terminal simulator
│   │   ├── CourseView.jsx      # Course + lesson view
│   │   ├── ProjectsView.jsx    # Project guide viewer
│   │   └── CodeBlock.jsx       # Syntax-highlighted code
│   └── data/
│       ├── courseData.js       # All 8 course curricula
│       ├── projectData.js      # 15+ project guides
│       └── terminalData.js     # Terminal command handlers + VFS
├── index.html                  # HTML entry point
├── vite.config.js              # Vite config (base: /backend-tutorial/)
└── package.json
```

---

## 🖥 Terminal Commands

The simulator supports a large subset of real commands:

### File System
| Command | Description |
|---------|-------------|
| `ls [-la]` | List directory contents |
| `cd <path>` | Change directory |
| `mkdir <dir>` | Create directory |
| `touch <file>` | Create file |
| `cat <file>` | Read file contents |
| `rm [-rf] <path>` | Remove file/directory |
| `mv <src> <dest>` | Move/rename |
| `cp <src> <dest>` | Copy |
| `pwd` | Print working directory |

### npm / Node
| Command | Description |
|---------|-------------|
| `npm init -y` | Initialize package.json |
| `npm install <pkg>` | Install package (with animation) |
| `npm run <script>` | Run npm script |
| `npm start` | Start server |
| `npm list` | List installed packages |
| `node` | Enter Node.js REPL |
| `node -e <code>` | Run inline code |
| `npx prisma init` | Initialize Prisma |
| `npx prisma migrate dev --name <n>` | Run migration |
| `npx prisma studio` | Open Prisma Studio |
| `npx create-next-app` | Scaffold Next.js app |

### Databases
| Command | Description |
|---------|-------------|
| `psql` | Enter PostgreSQL shell |
| `\l` | List databases |
| `\c <db>` | Connect to database |
| `\dt` | List tables |
| `SELECT/INSERT/UPDATE/...;` | Run SQL |
| `\q` | Exit psql |
| `mongosh` | Enter MongoDB shell |
| `show dbs` | List databases |
| `use <db>` | Switch database |
| `db.col.find()` | Query collection |
| `exit` | Exit shell |

### Git
| Command | Description |
|---------|-------------|
| `git init` | Initialize repo |
| `git add <files>` | Stage changes |
| `git commit -m <msg>` | Commit |
| `git push` | Push to remote |
| `git clone <url>` | Clone repo |
| `git status` | Show status |
| `git branch` | List branches |

### Other
- `help` — full command reference
- `clear` / `Ctrl+L` — clear screen
- `Ctrl+C` — cancel current command
- `↑ / ↓` — history navigation
- `Tab` — autocomplete paths and commands
- `env` / `export KEY=val` — environment variables
- `curl <url>` — HTTP requests
- `man <cmd>` — manual pages

---

## 📚 Course Curriculum

### Node.js (Foundation)
- Getting Started: modules, CJS vs ESM, built-ins
- File System & Async: fs/promises, callbacks, Promises, async/await
- HTTP & Events: raw HTTP server, EventEmitter, pub/sub
- Streams & Buffers: readable, writable, transform, pipe
- Advanced: env config, Worker Threads, child processes

### Express.js (Core Backend)
- Fundamentals: setup, routing, middleware, query/body params
- Modular Routing: Router, controller patterns
- Authentication: JWT auth, bcrypt, refresh tokens
- Security: Helmet, rate limiting, input validation
- Production: error handling, Winston logging, async wrapper

### Next.js (Full Stack)
- App Router: file-based routing, layouts, loading/error states
- Server vs Client Components: RSC, "use client", data flow
- API Routes: Route Handlers, validation with Zod
- Data Fetching: SSR, SSG, ISR, Server Actions

### SQL (Data Foundation)
- CRUD: SELECT, INSERT, UPDATE, DELETE, filtering
- Joins: INNER, LEFT, RIGHT, FULL OUTER, SELF JOIN
- Aggregations: GROUP BY, HAVING, aggregate functions
- Advanced: Window functions, CTEs, subqueries
- Performance: Transactions, ACID, indexes, EXPLAIN ANALYZE

### PostgreSQL (Database)
- Setup: installation, psql CLI, connection strings
- Data Types: arrays, JSONB, custom types, enums
- JSONB: operators, queries, GIN indexes
- Node.js integration: pg pool, parameterized queries, transactions

### Prisma (ORM)
- Schema: models, relations, enums, migrations
- CRUD: create, findUnique, findMany, update, delete, upsert
- Advanced queries: select, include, nested writes, filters
- Transactions: $transaction array, interactive transactions

### NoSQL Concepts
- Database types: document, key-value, wide-column, graph, time-series
- CAP Theorem, BASE vs ACID
- When to use SQL vs NoSQL (decision guide)

### MongoDB (NoSQL Database)
- CRUD: insertOne, find, updateOne, deleteMany + operators
- Aggregation Pipeline: $match, $group, $lookup, $unwind, $facet
- Indexes: single, compound, partial, text, TTL
- Mongoose: schemas, virtuals, hooks, static/instance methods

---

## 🚀 Projects

| Project | Difficulty | Tech |
|---------|-----------|------|
| REST API with Express + PostgreSQL | Beginner | Node, Express, PostgreSQL, JWT |
| Full-Stack Blog — Next.js + Prisma | Intermediate | Next.js, Prisma, PostgreSQL |
| Real-time Chat — Socket.io + MongoDB | Intermediate | Node, Socket.io, MongoDB |
| E-Commerce API — Stripe + Prisma | Advanced | Node, Express, Prisma, Stripe |
| Team Task Manager — Next.js + Auth | Advanced | Next.js, Prisma, NextAuth |
| URL Shortener with Analytics | Beginner | Node, MongoDB, Redis |
| Advanced Auth — OAuth + MFA | Advanced | Node, Express, PostgreSQL |
| Product Search — Full-Text Search | Intermediate | Node, PostgreSQL |
| API Monitoring Dashboard | Advanced | Node, MongoDB, Socket.io |

Each project includes: commands to run, code snippets for every step, React frontend design notes, and key concept breakdown.

---

## 🔧 Customization

### Adding a new course
Edit `src/data/courseData.js`, add to the `courses` array following the existing structure.

### Adding a project
Edit `src/data/projectData.js`, add to the `projects` array with steps.

### Adding terminal commands
Edit `src/data/terminalData.js`, add a new case in the `handleCommand` switch.

### Changing the base URL
Edit `vite.config.js` → `base` and `public/manifest.json` → `start_url` / `scope`.

---

## 📄 License

MIT — free to use, modify, and deploy.

---

Made with ❤️ for backend learners everywhere.
