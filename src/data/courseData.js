export const TECH_COLORS = {
  nodejs: '#68a063',
  express: '#404040',
  nextjs: '#ffffff',
  sql: '#f29111',
  postgresql: '#336791',
  prisma: '#5a67d8',
  nosql: '#e74c3c',
  mongodb: '#47a248'
};

export const TECH_ICONS = {
  nodejs: '⬡',
  express: '▸',
  nextjs: '▲',
  sql: '⬛',
  postgresql: '🐘',
  prisma: '◆',
  nosql: '◉',
  mongodb: '🍃'
};

export const courses = [
  // ─────────────────────────────────────────────────────────────
  // NODE.JS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'nodejs',
    title: 'Node.js',
    tagline: 'JavaScript on the server',
    color: '#68a063',
    icon: '⬡',
    level: 'Foundation',
    description: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine. Learn to build fast, scalable server-side applications.',
    prerequisites: [],
    modules: [
      {
        id: 'nodejs-intro',
        title: '1. Getting Started',
        lessons: [
          {
            id: 'what-is-node',
            title: 'What is Node.js?',
            level: 'Beginner',
            duration: '10 min',
            content: `Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Created by Ryan Dahl in 2009, it uses Chrome's V8 JavaScript engine.

**Key characteristics:**
- **Event-driven, non-blocking I/O** — handles many connections concurrently without spawning threads
- **Single-threaded** — uses an event loop to handle async operations
- **npm ecosystem** — access to 2 million+ packages

**Why Node.js?**
- Same language on frontend and backend
- Excellent for real-time applications (chat, gaming)
- Great for REST APIs and microservices
- Huge ecosystem and community

**The Event Loop:**
Node.js processes operations through an event loop:
1. Call Stack — executes synchronous code
2. Node APIs — handles async operations (fs, http, timers)
3. Callback Queue — queued callbacks
4. Microtask Queue — Promises and queueMicrotask`,
            examples: [
              {
                title: 'Hello World',
                lang: 'javascript',
                code: `// hello.js
console.log('Hello, World!');
console.log('Node version:', process.version);
console.log('Platform:', process.platform);
`
              },
              {
                title: 'Event Loop Demo',
                lang: 'javascript',
                code: `console.log('1 - Start');

setTimeout(() => console.log('4 - Timeout callback'), 0);

Promise.resolve().then(() => console.log('3 - Promise'));

console.log('2 - End');
// Output: 1 → 2 → 3 → 4
`
              }
            ],
            exercise: 'Create a file that prints your name, Node.js version, and current date to the console.'
          },
          {
            id: 'modules',
            title: 'Modules: CommonJS & ESM',
            level: 'Beginner',
            duration: '20 min',
            content: `Node.js has two module systems. **CommonJS** (the original) uses \`require()\` and \`module.exports\`. **ES Modules** (modern) uses \`import\`/\`export\`.

**CommonJS (CJS):**
- Default for \`.js\` files (unless \`"type":"module"\` in package.json)
- Synchronous loading
- \`__dirname\` and \`__filename\` available

**ES Modules (ESM):**
- Default for \`.mjs\` files or when \`"type":"module"\` is set
- Async loading, better tree-shaking
- Must use \`import.meta.url\` instead of \`__dirname\`

**Built-in modules** you'll use constantly:
\`fs\`, \`path\`, \`http\`, \`https\`, \`os\`, \`events\`, \`stream\`, \`crypto\`, \`url\`, \`util\``,
            examples: [
              {
                title: 'CommonJS',
                lang: 'javascript',
                code: `// math.js — export
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

module.exports = { add, multiply };
// or: exports.add = add;

// app.js — import
const { add, multiply } = require('./math');
const path = require('path');       // built-in
const fs = require('fs');           // built-in

console.log(add(2, 3));             // 5
console.log(__dirname);             // current directory
console.log(__filename);            // current file path
`
              },
              {
                title: 'ES Modules',
                lang: 'javascript',
                code: `// math.mjs — export
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;
export default function subtract(a, b) { return a - b; }

// app.mjs — import
import subtract, { add, multiply } from './math.mjs';
import { readFile } from 'fs/promises';  // named import
import * as path from 'path';            // namespace import
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
`
              }
            ],
            exercise: 'Create a utils.js module that exports functions: formatDate(date), capitalize(str), and slugify(str). Import and use them in index.js.'
          }
        ]
      },
      {
        id: 'nodejs-fs',
        title: '2. File System & Async',
        lessons: [
          {
            id: 'fs-module',
            title: 'Working with the File System',
            level: 'Beginner',
            duration: '25 min',
            content: `The \`fs\` module provides an API for file system operations. Node.js offers both callback, promise, and sync versions.

**Three styles:**
1. **Callback** — \`fs.readFile(path, callback)\`
2. **Promise** — \`fs.promises.readFile(path)\` or \`require('fs/promises')\`
3. **Sync** — \`fs.readFileSync(path)\` (blocks the event loop — avoid in production!)

**Key operations:** read, write, append, delete, rename, mkdir, readdir, stat, watch`,
            examples: [
              {
                title: 'Reading & Writing Files',
                lang: 'javascript',
                code: `const fs = require('fs/promises');
const path = require('path');

// Read a file
const data = await fs.readFile(
  path.join(__dirname, 'data.txt'),
  'utf-8'
);
console.log(data);

// Write a file (creates or overwrites)
await fs.writeFile('output.txt', 'Hello, File!', 'utf-8');

// Append to a file
await fs.appendFile('log.txt', \`\${new Date().toISOString()} — Event\\n\`);

// Check if file exists
try {
  await fs.access('file.txt');
  console.log('File exists');
} catch {
  console.log('File does not exist');
}

// Get file stats
const stats = await fs.stat('data.txt');
console.log('Size:', stats.size, 'bytes');
console.log('Modified:', stats.mtime);
`
              },
              {
                title: 'Directory Operations',
                lang: 'javascript',
                code: `const fs = require('fs/promises');

// Create directory (recursive)
await fs.mkdir('./logs/app', { recursive: true });

// List directory contents
const entries = await fs.readdir('./src', { withFileTypes: true });
for (const entry of entries) {
  const type = entry.isDirectory() ? '📁' : '📄';
  console.log(\`\${type} \${entry.name}\`);
}

// Rename/move
await fs.rename('old-name.txt', 'new-name.txt');

// Delete
await fs.unlink('file.txt');           // file
await fs.rmdir('./dir');               // empty dir
await fs.rm('./dir', { recursive: true }); // dir + contents

// Watch for changes
const watcher = fs.watch('./src', { recursive: true });
for await (const { eventType, filename } of watcher) {
  console.log(\`\${eventType}: \${filename}\`);
}
`
              }
            ],
            exercise: 'Build a simple logger that writes timestamped messages to a log file, rotates the file daily, and reads the last N lines.'
          },
          {
            id: 'async-patterns',
            title: 'Async Patterns: Callbacks, Promises, async/await',
            level: 'Intermediate',
            duration: '30 min',
            content: `Understanding async patterns is crucial for Node.js. Each pattern has trade-offs.

**Callback Hell (avoid):**
Nested callbacks become unreadable and hard to error-handle.

**Promises:**
Chainable, better error handling with \`.catch()\`, composable with \`Promise.all\`.

**async/await (preferred):**
Syntactic sugar over Promises. Makes async code look synchronous. Use \`try/catch\` for errors.

**Key Promise utilities:**
- \`Promise.all([p1,p2])\` — wait for all, fail fast
- \`Promise.allSettled([p1,p2])\` — wait for all, get results
- \`Promise.race([p1,p2])\` — first to settle wins
- \`Promise.any([p1,p2])\` — first to fulfill wins`,
            examples: [
              {
                title: 'Callback → Promise → async/await',
                lang: 'javascript',
                code: `// ❌ Callback hell
fs.readFile('a.txt', 'utf8', (err, a) => {
  if (err) throw err;
  fs.readFile('b.txt', 'utf8', (err, b) => {
    if (err) throw err;
    fs.writeFile('c.txt', a + b, (err) => {
      if (err) throw err;
      console.log('Done!');
    });
  });
});

// ✅ Promise chain
fs.promises.readFile('a.txt', 'utf8')
  .then(a => Promise.all([a, fs.promises.readFile('b.txt', 'utf8')]))
  .then(([a, b]) => fs.promises.writeFile('c.txt', a + b))
  .then(() => console.log('Done!'))
  .catch(console.error);

// ✅✅ async/await (cleanest)
async function mergeFiles() {
  try {
    const [a, b] = await Promise.all([
      fs.promises.readFile('a.txt', 'utf8'),
      fs.promises.readFile('b.txt', 'utf8'),
    ]);
    await fs.promises.writeFile('c.txt', a + b);
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}
`
              }
            ],
            exercise: 'Create a function that reads multiple JSON files in parallel, merges their data, and writes the result.'
          }
        ]
      },
      {
        id: 'nodejs-http',
        title: '3. HTTP & Events',
        lessons: [
          {
            id: 'http-server',
            title: 'Building HTTP Servers',
            level: 'Intermediate',
            duration: '25 min',
            content: `Node.js has a built-in \`http\` module for creating web servers. While Express is more practical, understanding raw HTTP is foundational.

**HTTP fundamentals:**
- Request: method, URL, headers, body
- Response: status code, headers, body
- Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS`,
            examples: [
              {
                title: 'Basic HTTP Server',
                lang: 'javascript',
                code: `const http = require('http');
const url = require('url');

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsed.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // Read body for POST/PUT
  let body = '';
  req.on('data', chunk => body += chunk);

  req.on('end', () => {
    const data = body ? JSON.parse(body) : {};

    if (method === 'GET' && pathname === '/') {
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Hello from Node.js!' }));
    } else if (method === 'GET' && pathname === '/health') {
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
    } else if (method === 'POST' && pathname === '/echo') {
      res.writeHead(200);
      res.end(JSON.stringify({ received: data }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
`
              }
            ],
            exercise: 'Build a simple REST API using only the http module with routes for GET /users, POST /users, and GET /users/:id using an in-memory array.'
          },
          {
            id: 'events',
            title: 'EventEmitter — The Node.js Heartbeat',
            level: 'Intermediate',
            duration: '20 min',
            content: `Node.js is event-driven. The \`EventEmitter\` class is the backbone of the entire Node.js ecosystem. \`http.Server\`, \`fs.ReadStream\`, \`net.Socket\` — all extend EventEmitter.

**Methods:** \`.on(event, listener)\`, \`.emit(event, ...args)\`, \`.once(event, listener)\`, \`.off(event, listener)\`, \`.removeAllListeners()\`

**Pattern:** Extend EventEmitter to build pub/sub systems, plugin architectures, real-time features.`,
            examples: [
              {
                title: 'Custom EventEmitter',
                lang: 'javascript',
                code: `const { EventEmitter } = require('events');

class OrderSystem extends EventEmitter {
  constructor() {
    super();
    this.orders = [];
  }

  placeOrder(order) {
    const id = Date.now();
    const newOrder = { id, ...order, status: 'pending' };
    this.orders.push(newOrder);
    this.emit('order:placed', newOrder);
    
    // Simulate processing
    setTimeout(() => {
      newOrder.status = 'completed';
      this.emit('order:completed', newOrder);
    }, 2000);
    
    return newOrder;
  }
}

const shop = new OrderSystem();

// Register listeners
shop.on('order:placed', (order) => {
  console.log(\`📦 Order #\${order.id} placed for \${order.item}\`);
});

shop.on('order:completed', (order) => {
  console.log(\`✅ Order #\${order.id} completed!\`);
});

// One-time listener
shop.once('order:placed', () => {
  console.log('🎉 First ever order!');
});

shop.placeOrder({ item: 'MacBook Pro', qty: 1, price: 1999 });
`
              }
            ],
            exercise: 'Build a simple event bus (publish/subscribe system) using EventEmitter, and use it to decouple a user registration flow (register → send welcome email → log analytics).'
          }
        ]
      },
      {
        id: 'nodejs-streams',
        title: '4. Streams & Buffers',
        lessons: [
          {
            id: 'streams',
            title: 'Streams: Handling Large Data',
            level: 'Advanced',
            duration: '30 min',
            content: `Streams allow processing data piece-by-piece without loading everything into memory. Essential for large files, HTTP responses, and real-time data.

**Four types:**
- **Readable** — source of data (\`fs.createReadStream\`)
- **Writable** — destination (\`fs.createWriteStream\`)
- **Duplex** — both readable and writable (\`net.Socket\`)
- **Transform** — modifies data as it passes through (\`zlib.createGzip\`)

**\`pipe()\`** chains streams together elegantly.`,
            examples: [
              {
                title: 'File Streaming & Compression',
                lang: 'javascript',
                code: `const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream/promises');

// Read large file → compress → write (without loading into memory)
await pipeline(
  fs.createReadStream('large-file.txt'),
  zlib.createGzip(),
  fs.createWriteStream('large-file.txt.gz')
);
console.log('File compressed!');

// Transform stream — uppercasing
const { Transform } = require('stream');

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Chain: stdin → uppercase → stdout
process.stdin.pipe(upperCase).pipe(process.stdout);

// HTTP streaming response
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const readStream = fs.createReadStream('large-file.txt');
  readStream.pipe(res);
});
`
              }
            ],
            exercise: 'Build a CSV processor that streams a large CSV file line by line, filters rows, transforms them, and writes output to a new file — all without loading the full file into memory.'
          }
        ]
      },
      {
        id: 'nodejs-advanced',
        title: '5. Advanced Node.js',
        lessons: [
          {
            id: 'env-config',
            title: 'Environment Variables & Config',
            level: 'Intermediate',
            duration: '15 min',
            content: `Managing configuration properly is critical for production apps. Never hardcode secrets.`,
            examples: [
              {
                title: 'Environment Configuration',
                lang: 'javascript',
                code: `// .env file (never commit this!)
// DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
// JWT_SECRET=super-secret-key-here
// PORT=3000
// NODE_ENV=development

// config.js
require('dotenv').config();

const config = {
  port: parseInt(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    url: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES || '7d'
  },
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production'
};

// Validate required vars
const required = ['DATABASE_URL', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(\`Missing required env var: \${key}\`);
  }
}

module.exports = config;
`
              }
            ],
            exercise: 'Create a config validation module that checks all required env vars at startup and throws descriptive errors for missing/invalid values.'
          },
          {
            id: 'worker-threads',
            title: 'Worker Threads & Child Processes',
            level: 'Advanced',
            duration: '25 min',
            content: `Node.js is single-threaded, but you can leverage multiple CPU cores using Worker Threads (CPU-intensive tasks) or Child Processes (separate processes).`,
            examples: [
              {
                title: 'Worker Threads',
                lang: 'javascript',
                code: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const os = require('os');

if (isMainThread) {
  // Main thread: distribute work
  const cpuCount = os.cpus().length;
  const numbers = Array.from({ length: 1000000 }, (_, i) => i);
  const chunkSize = Math.ceil(numbers.length / cpuCount);

  const promises = Array.from({ length: cpuCount }, (_, i) => {
    const chunk = numbers.slice(i * chunkSize, (i + 1) * chunkSize);
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: chunk });
      worker.on('message', resolve);
      worker.on('error', reject);
    });
  });

  const results = await Promise.all(promises);
  const total = results.reduce((sum, n) => sum + n, 0);
  console.log('Sum:', total);
} else {
  // Worker: process chunk
  const sum = workerData.reduce((a, b) => a + b, 0);
  parentPort.postMessage(sum);
}
`
              }
            ],
            exercise: 'Build a CPU-intensive image resizing simulation that uses worker threads to process multiple images in parallel, reporting progress.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // EXPRESS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'express',
    title: 'Express.js',
    tagline: 'Fast, minimal web framework',
    color: '#ffffff',
    icon: '▸',
    level: 'Core Backend',
    description: 'Express is the most popular Node.js web framework. Learn to build production-grade REST APIs with routing, middleware, authentication, and more.',
    prerequisites: ['nodejs'],
    modules: [
      {
        id: 'express-basics',
        title: '1. Express Fundamentals',
        lessons: [
          {
            id: 'express-setup',
            title: 'Setup, Routing & Middleware',
            level: 'Beginner',
            duration: '25 min',
            content: `Express is a minimal web framework for Node.js. It provides routing, middleware, and utilities for building web servers and APIs.

**Core concepts:**
- **App** — the Express application
- **Route** — URL + HTTP method handler
- **Middleware** — functions that process requests in sequence
- **Router** — mini-application for grouping routes
- **Request/Response** — enhanced versions of Node's built-ins

**Middleware flow:** \`req → mw1 → mw2 → route handler → res\``,
            examples: [
              {
                title: 'Express App Setup',
                lang: 'javascript',
                code: `const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// ─── Built-in Middleware ──────────────────
app.use(express.json());                    // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static('public'));          // serve static files

// ─── Third-party Middleware ───────────────
app.use(cors());                            // enable CORS
app.use(morgan('dev'));                     // request logging

// ─── Custom Middleware ────────────────────
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(\`[\${req.requestTime}] \${req.method} \${req.path}\`);
  next(); // must call next() to continue!
});

// ─── Routes ──────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!', time: req.requestTime });
});

app.get('/users', async (req, res) => {
  // Query params: /users?page=1&limit=10&sort=name
  const { page = 1, limit = 10, sort = 'id' } = req.query;
  res.json({ users: [], page, limit, sort });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;  // route params
  res.json({ id, name: 'John Doe' });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({ id: Date.now(), name, email });
});

app.put('/users/:id', (req, res) => {
  res.json({ id: req.params.id, ...req.body });
});

app.delete('/users/:id', (req, res) => {
  res.status(204).send();
});

// ─── 404 Handler ─────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Error Handler ────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(3000, () => console.log('🚀 Server on http://localhost:3000'));
`
              }
            ],
            exercise: 'Build a products CRUD API with Express using an in-memory array. Implement GET all, GET by id, POST create, PUT update, DELETE remove with proper status codes.'
          },
          {
            id: 'express-router',
            title: 'Express Router — Modular Routes',
            level: 'Intermediate',
            duration: '20 min',
            content: `As your API grows, keeping all routes in one file becomes unmanageable. Express Router lets you split routes into modules.`,
            examples: [
              {
                title: 'Modular Router Structure',
                lang: 'javascript',
                code: `// routes/users.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// All routes in this router are prefixed with /api/users (set in app.js)
router.get('/', auth, async (req, res) => {
  // GET /api/users
});

router.get('/:id', async (req, res) => {
  // GET /api/users/:id
});

router.post('/', async (req, res) => {
  // POST /api/users
});

// Router-level middleware (only affects THIS router)
router.use('/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  req.user = user;
  next();
});

module.exports = router;

// ─────────────────────────────────────────

// app.js — mount routers
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Result: /api/users/, /api/users/:id, etc.
`
              }
            ],
            exercise: 'Refactor a monolithic Express app into modular routers: auth, users, products, orders — each in its own file.'
          }
        ]
      },
      {
        id: 'express-auth',
        title: '2. Authentication & Security',
        lessons: [
          {
            id: 'jwt-auth',
            title: 'JWT Authentication',
            level: 'Intermediate',
            duration: '40 min',
            content: `JSON Web Tokens (JWT) are the standard for stateless authentication in REST APIs. A token contains encoded claims and is signed by the server.

**JWT Structure:** \`header.payload.signature\`
- Header: algorithm + type
- Payload: claims (userId, role, exp)
- Signature: ensures token integrity

**Flow:** Login → Server issues JWT → Client stores JWT → Client sends JWT in \`Authorization: Bearer <token>\` header → Server validates JWT`,
            examples: [
              {
                title: 'Complete JWT Auth System',
                lang: 'javascript',
                code: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('./config');

// ─── Password Hashing ─────────────────────
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// ─── Token Generation ─────────────────────
function generateTokens(userId) {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    JWT_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
}

// ─── Auth Middleware ──────────────────────
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ─── Auth Routes ─────────────────────────
const router = require('express').Router();
const users = []; // replace with DB

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    const hashed = await hashPassword(password);
    const user = { id: Date.now(), name, email, password: hashed };
    users.push(user);
    const tokens = generateTokens(user.id);
    res.status(201).json({ user: { id: user.id, name, email }, ...tokens });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !await verifyPassword(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const tokens = generateTokens(user.id);
  res.json({ user: { id: user.id, name: user.name, email }, ...tokens });
});

router.get('/me', authenticate, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
});
`
              }
            ],
            exercise: 'Implement role-based access control (RBAC) with roles: admin, editor, viewer. Create middleware that checks permissions for different routes.'
          },
          {
            id: 'security-best-practices',
            title: 'Security: Helmet, Rate Limiting, Validation',
            level: 'Intermediate',
            duration: '30 min',
            content: `Securing your Express API is non-negotiable. Key concerns: XSS, CSRF, SQL injection, brute force, data validation.`,
            examples: [
              {
                title: 'Security Middleware Stack',
                lang: 'javascript',
                code: `const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

// ─── Helmet ─── sets security HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    }
  }
}));

// ─── Rate Limiting ─── brute force protection
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  skipSuccessfulRequests: true,
  message: { error: 'Too many auth attempts.' }
});

app.use('/api/', globalLimiter);
app.use('/api/auth/', authLimiter);

// ─── Input Validation ─── using express-validator
const createUserValidation = [
  body('name').trim().notEmpty().isLength({ min: 2, max: 50 }),
  body('email').trim().isEmail().normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])/)
    .withMessage('Password needs upper, lower, number, special char'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.post('/api/users', createUserValidation, validate, createUser);
`
              }
            ],
            exercise: 'Add comprehensive security to an Express API: helmet, rate limiting, request validation, sanitization, and CORS configuration.'
          }
        ]
      },
      {
        id: 'express-patterns',
        title: '3. Production Patterns',
        lessons: [
          {
            id: 'error-handling',
            title: 'Error Handling & Logging',
            level: 'Advanced',
            duration: '25 min',
            content: `Production APIs need robust error handling and structured logging. Never expose internal errors to clients.`,
            examples: [
              {
                title: 'Centralized Error Handling',
                lang: 'javascript',
                code: `// errors/AppError.js
class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) { super(message, 400, 'VALIDATION_ERROR'); }
}

class NotFoundError extends AppError {
  constructor(resource) { super(\`\${resource} not found\`, 404, 'NOT_FOUND'); }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') { super(message, 401, 'UNAUTHORIZED'); }
}

// middleware/errorHandler.js
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV === 'development';

  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  res.status(statusCode).json({
    error: {
      message: err.isOperational ? err.message : 'Something went wrong',
      code: err.code || 'INTERNAL_ERROR',
      ...(isDev && { stack: err.stack })
    }
  });
};

// Async wrapper to avoid try/catch in every handler
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Usage
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new NotFoundError('User');
  res.json(user);
}));
`
              }
            ],
            exercise: 'Build a complete error handling system with custom error classes, Winston logging, and an async wrapper. Test error scenarios thoroughly.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // NEXT.JS
  // ─────────────────────────────────────────────────────────────
  {
    id: 'nextjs',
    title: 'Next.js',
    tagline: 'The React framework for production',
    color: '#e5e5e5',
    icon: '▲',
    level: 'Full Stack',
    description: 'Next.js brings server-side rendering, static generation, and API routes to React. Build full-stack apps with one framework.',
    prerequisites: ['nodejs', 'express'],
    modules: [
      {
        id: 'nextjs-foundations',
        title: '1. Next.js Foundations',
        lessons: [
          {
            id: 'app-router',
            title: 'App Router, File-Based Routing',
            level: 'Beginner',
            duration: '30 min',
            content: `Next.js 13+ introduced the **App Router** — a new routing system based on React Server Components. Routes are defined by folders with a \`page.tsx\` file.

**Key conventions:**
- \`app/page.tsx\` → \`/\`
- \`app/about/page.tsx\` → \`/about\`
- \`app/blog/[slug]/page.tsx\` → \`/blog/:slug\`
- \`app/layout.tsx\` → Shared layout wrapper
- \`app/loading.tsx\` → Loading UI
- \`app/error.tsx\` → Error boundary
- \`app/not-found.tsx\` → 404 page`,
            examples: [
              {
                title: 'App Router Structure',
                lang: 'typescript',
                code: `// app/layout.tsx — Root layout (required)
export const metadata = {
  title: 'My Next.js App',
  description: 'Built with Next.js 14',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>Navigation</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}

// app/page.tsx — Home page (Server Component by default)
async function getUsers() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });
  return res.json();
}

export default async function HomePage() {
  const users = await getUsers(); // fetch runs on server

  return (
    <div>
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// app/blog/[slug]/page.tsx — Dynamic route
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}
`
              }
            ],
            exercise: 'Build a blog with Next.js App Router: homepage listing posts, individual post pages with dynamic routes, and a 404 page.'
          },
          {
            id: 'server-client-components',
            title: 'Server vs Client Components',
            level: 'Intermediate',
            duration: '25 min',
            content: `Next.js App Router has two types of components. **Server Components** (default) render on the server — they can fetch data directly, access databases, use secrets. **Client Components** (\`"use client"\`) run in the browser — they can use hooks, browser APIs, event handlers.

**Rule of thumb:** Keep components as Server Components unless you need interactivity.`,
            examples: [
              {
                title: 'Server & Client Components',
                lang: 'typescript',
                code: `// app/dashboard/page.tsx — Server Component
import { db } from '@/lib/db';
import { Counter } from './Counter'; // client component

export default async function Dashboard() {
  // Direct database access — no API needed!
  const stats = await db.query('SELECT COUNT(*) FROM users');
  const recentUsers = await db.user.findMany({ take: 5, orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total users: {stats[0].count}</p>
      
      {/* Pass data from server to client component */}
      <Counter initialCount={recentUsers.length} />
      
      <ul>
        {recentUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

// app/dashboard/Counter.tsx — Client Component
'use client';
import { useState } from 'react';

export function Counter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
`
              }
            ],
            exercise: 'Build a product page that fetches data on the server, but has client-side interactive elements like a quantity picker and "Add to Cart" button.'
          }
        ]
      },
      {
        id: 'nextjs-api',
        title: '2. API Routes & Data',
        lessons: [
          {
            id: 'api-routes',
            title: 'API Routes — Backend in Next.js',
            level: 'Intermediate',
            duration: '30 min',
            content: `Next.js lets you build API endpoints alongside your frontend. In the App Router, these are **Route Handlers** in \`route.ts\` files.`,
            examples: [
              {
                title: 'Route Handlers',
                lang: 'typescript',
                code: `// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

// GET /api/users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const [users, total] = await Promise.all([
    db.user.findMany({ skip: (page - 1) * limit, take: limit }),
    db.user.count()
  ]);

  return NextResponse.json({
    users,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) }
  });
}

// POST /api/users
const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = createUserSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.issues }, { status: 400 });
  }

  const user = await db.user.create({ data: parsed.data });
  return NextResponse.json(user, { status: 201 });
}

// app/api/users/[id]/route.ts — Dynamic segment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(user);
}
`
              }
            ],
            exercise: 'Build a full CRUD API with Next.js Route Handlers for a blog (posts, comments) with authentication middleware.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // SQL
  // ─────────────────────────────────────────────────────────────
  {
    id: 'sql',
    title: 'SQL',
    tagline: 'The language of relational data',
    color: '#f29111',
    icon: '⬛',
    level: 'Data Foundation',
    description: 'SQL (Structured Query Language) is the universal language for relational databases. Master querying, joins, aggregations, and transactions.',
    prerequisites: [],
    modules: [
      {
        id: 'sql-basics',
        title: '1. SQL Fundamentals',
        lessons: [
          {
            id: 'crud-queries',
            title: 'CRUD: SELECT, INSERT, UPDATE, DELETE',
            level: 'Beginner',
            duration: '30 min',
            content: `SQL is a declarative language for managing relational data. CRUD operations form the foundation of all database interactions.`,
            examples: [
              {
                title: 'Core SQL Operations',
                lang: 'sql',
                code: `-- ─── CREATE TABLE ─────────────────────────────
CREATE TABLE users (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(255) UNIQUE NOT NULL,
  age       INTEGER CHECK (age >= 0),
  role      VARCHAR(20) DEFAULT 'user',
  active    BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ─── INSERT ────────────────────────────────────
INSERT INTO users (name, email, age) VALUES
  ('Alice Johnson', 'alice@example.com', 28),
  ('Bob Smith', 'bob@example.com', 35),
  ('Carol White', 'carol@example.com', 42);

-- ─── SELECT ────────────────────────────────────
SELECT * FROM users;                            -- all columns
SELECT name, email FROM users;                  -- specific columns
SELECT * FROM users WHERE age > 30;             -- filter
SELECT * FROM users WHERE role = 'admin' AND active = TRUE;
SELECT * FROM users WHERE name LIKE 'A%';       -- pattern match
SELECT * FROM users WHERE age BETWEEN 25 AND 40;
SELECT * FROM users WHERE role IN ('admin', 'editor');
SELECT * FROM users ORDER BY age DESC LIMIT 10 OFFSET 20; -- pagination

-- ─── UPDATE ────────────────────────────────────
UPDATE users SET role = 'admin' WHERE email = 'alice@example.com';
UPDATE users SET active = FALSE WHERE last_login < NOW() - INTERVAL '90 days';

-- ─── DELETE ────────────────────────────────────
DELETE FROM users WHERE id = 5;
DELETE FROM users WHERE active = FALSE;

-- ─── Useful functions ─────────────────────────
SELECT UPPER(name), LENGTH(name) FROM users;
SELECT COALESCE(bio, 'No bio') FROM users;      -- null handling
SELECT NOW(), CURRENT_DATE, CURRENT_TIME;
`
              }
            ],
            exercise: 'Create a products table and write 10 different SELECT queries using WHERE, ORDER BY, LIMIT, LIKE, BETWEEN, and IN.'
          },
          {
            id: 'joins',
            title: 'JOINs — Combining Tables',
            level: 'Beginner',
            duration: '35 min',
            content: `JOINs combine rows from two or more tables based on a related column. Understanding joins is essential for relational databases.

**Types:**
- **INNER JOIN** — rows matching in BOTH tables
- **LEFT JOIN** — all rows from left + matching from right (NULL if no match)
- **RIGHT JOIN** — all rows from right + matching from left
- **FULL OUTER JOIN** — all rows from both tables
- **CROSS JOIN** — cartesian product (every combination)
- **SELF JOIN** — table joins itself`,
            examples: [
              {
                title: 'JOIN Examples',
                lang: 'sql',
                code: `-- Schema
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(255));
CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), amount DECIMAL, created_at TIMESTAMP DEFAULT NOW());
CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100), price DECIMAL, category_id INT);
CREATE TABLE categories (id SERIAL PRIMARY KEY, name VARCHAR(100));

-- INNER JOIN: users with their orders
SELECT u.name, u.email, o.amount, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.amount > 100;

-- LEFT JOIN: ALL users, including those with no orders
SELECT u.name, COUNT(o.id) AS order_count, SUM(o.amount) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Multiple JOINs
SELECT u.name, p.name AS product, c.name AS category, o.amount
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
WHERE o.created_at > NOW() - INTERVAL '30 days'
ORDER BY o.created_at DESC;

-- SELF JOIN: employees and their managers
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
`
              }
            ],
            exercise: 'Given tables: students, courses, enrollments. Write queries to: list all students with their enrolled courses, find students not enrolled in any course, count enrollments per course.'
          }
        ]
      },
      {
        id: 'sql-advanced',
        title: '2. Advanced SQL',
        lessons: [
          {
            id: 'aggregations',
            title: 'Aggregations, GROUP BY & Window Functions',
            level: 'Intermediate',
            duration: '30 min',
            content: `Aggregation functions compute values across rows. Window functions perform calculations across related rows without collapsing them.`,
            examples: [
              {
                title: 'Aggregations & Window Functions',
                lang: 'sql',
                code: `-- ─── Aggregation ──────────────────────────────
SELECT 
  category,
  COUNT(*) AS product_count,
  AVG(price) AS avg_price,
  MIN(price) AS min_price,
  MAX(price) AS max_price,
  SUM(price) AS total_value
FROM products
GROUP BY category
HAVING COUNT(*) > 5           -- filter after grouping
ORDER BY avg_price DESC;

-- ─── Subqueries ────────────────────────────────
-- Users who spent more than average
SELECT name FROM users
WHERE id IN (
  SELECT user_id FROM orders
  GROUP BY user_id
  HAVING SUM(amount) > (SELECT AVG(total) FROM (
    SELECT SUM(amount) AS total FROM orders GROUP BY user_id
  ) totals)
);

-- ─── CTEs (Common Table Expressions) ──────────
WITH monthly_sales AS (
  SELECT 
    DATE_TRUNC('month', created_at) AS month,
    SUM(amount) AS revenue
  FROM orders
  GROUP BY 1
),
running_total AS (
  SELECT month, revenue,
    SUM(revenue) OVER (ORDER BY month) AS cumulative
  FROM monthly_sales
)
SELECT * FROM running_total;

-- ─── Window Functions ──────────────────────────
SELECT 
  name,
  department,
  salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS overall_rank,
  ROW_NUMBER() OVER (ORDER BY created_at) AS row_num,
  LAG(salary, 1) OVER (PARTITION BY department ORDER BY created_at) AS prev_salary,
  salary - LAG(salary, 1) OVER (ORDER BY created_at) AS salary_change,
  AVG(salary) OVER (PARTITION BY department) AS dept_avg
FROM employees;
`
              }
            ],
            exercise: 'Analyze an e-commerce dataset: find top 5 products per category by revenue, calculate month-over-month growth, and rank customers by lifetime value.'
          },
          {
            id: 'transactions',
            title: 'Transactions, Indexes & Performance',
            level: 'Advanced',
            duration: '35 min',
            content: `**Transactions** ensure data consistency through ACID properties: Atomicity, Consistency, Isolation, Durability.

**Indexes** dramatically speed up queries by creating data structures for fast lookup. The trade-off: faster reads, slower writes, more storage.`,
            examples: [
              {
                title: 'Transactions & Indexes',
                lang: 'sql',
                code: `-- ─── Transactions ─────────────────────────────
BEGIN;

-- Transfer money (must be atomic)
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;

-- Verify no negative balance
DO $$
BEGIN
  IF (SELECT balance FROM accounts WHERE id = 1) < 0 THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;
END $$;

COMMIT; -- all or nothing
-- ROLLBACK; -- undo all changes if error

-- ─── Savepoints ────────────────────────────────
BEGIN;
INSERT INTO orders VALUES (...);
SAVEPOINT after_order;
INSERT INTO order_items VALUES (...);
-- if this fails:
ROLLBACK TO SAVEPOINT after_order;
-- order is kept, items are rolled back
COMMIT;

-- ─── Indexes ───────────────────────────────────
-- B-tree (default): equality + range queries
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_orders_user_date ON orders (user_id, created_at DESC);

-- Unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users (email);

-- Partial index (only index rows matching condition)
CREATE INDEX idx_active_users ON users (email) WHERE active = TRUE;

-- Covering index (includes extra columns to avoid table lookup)
CREATE INDEX idx_orders_covering ON orders (user_id) 
  INCLUDE (amount, created_at);

-- Full-text search index
CREATE INDEX idx_products_search ON products 
  USING GIN (to_tsvector('english', name || ' ' || description));

-- Check if index is being used
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alice@example.com';
`
              }
            ],
            exercise: 'Optimize a slow e-commerce database: add appropriate indexes, rewrite N+1 queries, and use EXPLAIN ANALYZE to verify improvements.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // POSTGRESQL
  // ─────────────────────────────────────────────────────────────
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    tagline: 'The world\'s most advanced open source database',
    color: '#336791',
    icon: '🐘',
    level: 'Database',
    description: 'PostgreSQL is a powerful, open-source object-relational database. Learn installation, advanced data types, JSON support, full-text search, and performance tuning.',
    prerequisites: ['sql'],
    modules: [
      {
        id: 'postgres-setup',
        title: '1. Setup & psql CLI',
        lessons: [
          {
            id: 'postgres-install',
            title: 'Installation, Configuration & psql',
            level: 'Beginner',
            duration: '20 min',
            content: `PostgreSQL is a full-featured RDBMS with advanced capabilities far beyond standard SQL.

**Connecting with psql:**
\`psql -U postgres -d mydb\` — connect to database
\`psql -U postgres -h localhost -p 5432 mydb\` — explicit connection

**Essential psql commands:**
\`\\l\` — list databases | \`\\c db\` — connect | \`\\dt\` — list tables | \`\\d table\` — describe | \`\\q\` — quit | \`\\i file.sql\` — run SQL file | \`\\timing\` — show query time`,
            examples: [
              {
                title: 'PostgreSQL Setup & Connection',
                lang: 'bash',
                code: `# Install (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib

# macOS with Homebrew  
brew install postgresql@16

# Start service
sudo systemctl start postgresql  # Linux
brew services start postgresql   # macOS

# Connect as postgres user
sudo -u postgres psql

# Create role and database
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE mydb OWNER myuser;
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

# Connect to database
psql -U myuser -d mydb

# Connection string format
# postgresql://user:password@host:port/dbname
# postgresql://myuser:mypassword@localhost:5432/mydb
`
              }
            ],
            exercise: 'Set up PostgreSQL, create a new user and database, and verify connectivity using psql and a Node.js script.'
          }
        ]
      },
      {
        id: 'postgres-features',
        title: '2. PostgreSQL-Specific Features',
        lessons: [
          {
            id: 'jsonb',
            title: 'JSON/JSONB — Flexible Data',
            level: 'Intermediate',
            duration: '25 min',
            content: `PostgreSQL's JSONB column type stores JSON data in a binary format for efficient querying. It bridges relational and document database worlds.`,
            examples: [
              {
                title: 'JSONB Operations',
                lang: 'sql',
                code: `-- Create table with JSONB column
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  metadata JSONB,
  tags TEXT[]
);

-- Insert with JSONB
INSERT INTO products (name, metadata, tags) VALUES
  ('Laptop Pro', 
   '{"brand":"Apple","specs":{"ram":"16GB","storage":"512GB","cpu":"M3"},"weight":1.4}',
   ARRAY['electronics', 'apple', 'laptop']
  );

-- Query JSONB fields
SELECT 
  name,
  metadata->>'brand' AS brand,              -- as text
  metadata->'specs' AS specs,               -- as JSON
  metadata->'specs'->>'ram' AS ram,         -- nested as text
  (metadata->>'weight')::float AS weight    -- cast
FROM products;

-- Filter on JSONB
SELECT * FROM products WHERE metadata->>'brand' = 'Apple';
SELECT * FROM products WHERE (metadata->'specs'->>'ram') = '16GB';
SELECT * FROM products WHERE metadata @> '{"specs":{"storage":"512GB"}}'; -- contains

-- Array operations
SELECT * FROM products WHERE 'laptop' = ANY(tags);
SELECT * FROM products WHERE tags @> ARRAY['apple', 'laptop'];

-- Update JSONB
UPDATE products 
SET metadata = jsonb_set(metadata, '{specs,ram}', '"32GB"')
WHERE id = 1;

-- GIN index for JSONB performance
CREATE INDEX idx_products_metadata ON products USING GIN (metadata);
CREATE INDEX idx_products_tags ON products USING GIN (tags);
`
              }
            ],
            exercise: 'Build a product catalog with JSONB attributes (flexible specs per category), implement filtering by nested attributes, and optimize with GIN indexes.'
          },
          {
            id: 'postgres-with-node',
            title: 'PostgreSQL with Node.js (pg)',
            level: 'Intermediate',
            duration: '30 min',
            content: `The \`pg\` package is the standard PostgreSQL client for Node.js. Use connection pooling for production performance.`,
            examples: [
              {
                title: 'pg Connection Pool',
                lang: 'javascript',
                code: `const { Pool } = require('pg');

// Connection pool (recommended for production)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // OR individual options:
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 20,                    // max pool size
  idleTimeoutMillis: 30000,   // close idle connections after 30s
  connectionTimeoutMillis: 2000,
  ssl: process.env.NODE_ENV === 'production' 
    ? { rejectUnauthorized: false } 
    : false
});

// ─── Query Helpers ────────────────────────────
const db = {
  // Simple query
  async query(text, params) {
    const start = Date.now();
    const result = await pool.query(text, params);
    console.log('Query executed in', Date.now() - start, 'ms');
    return result;
  },

  // Transaction helper
  async transaction(callback) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }
};

// ─── Parameterized Queries (prevent SQL injection)
const getUserById = async (id) => {
  const { rows } = await db.query(
    'SELECT id, name, email FROM users WHERE id = $1',
    [id]  // $1, $2, ... are placeholders
  );
  return rows[0] || null;
};

// ─── Transaction Example
const transferFunds = async (fromId, toId, amount) => {
  return db.transaction(async (client) => {
    const { rows: [from] } = await client.query(
      'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',
      [fromId]
    );
    if (from.balance < amount) throw new Error('Insufficient funds');
    
    await client.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, fromId]);
    await client.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, toId]);
    
    return { success: true, transferred: amount };
  });
};
`
              }
            ],
            exercise: 'Build a banking API using pg with connection pooling. Implement account creation, deposits, withdrawals, transfers (with transactions), and transaction history.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // PRISMA
  // ─────────────────────────────────────────────────────────────
  {
    id: 'prisma',
    title: 'Prisma',
    tagline: 'Next-generation Node.js ORM',
    color: '#5a67d8',
    icon: '◆',
    level: 'ORM',
    description: 'Prisma is a modern ORM that provides type-safe database access, auto-generated migrations, and an intuitive query API for PostgreSQL, MySQL, SQLite, and more.',
    prerequisites: ['nodejs', 'sql', 'postgresql'],
    modules: [
      {
        id: 'prisma-setup',
        title: '1. Prisma Fundamentals',
        lessons: [
          {
            id: 'prisma-schema',
            title: 'Schema, Models & Migrations',
            level: 'Beginner',
            duration: '30 min',
            content: `Prisma uses a schema file (\`prisma/schema.prisma\`) to define your data models. From this schema, it generates the database tables (via migrations) and a type-safe client.

**Workflow:**
1. Define models in schema.prisma
2. Run \`npx prisma migrate dev\` to create migration + apply
3. Use \`prisma generate\` to update the Prisma Client
4. Query with full TypeScript autocomplete`,
            examples: [
              {
                title: 'Prisma Schema',
                lang: 'prisma',
                code: `// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  name      String
  avatar    String?
  role      Role      @default(USER)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Relations
  posts     Post[]
  profile   Profile?
  comments  Comment[]
  orders    Order[]

  @@index([email])
  @@map("users")  // maps to "users" table
}

model Profile {
  id     Int    @id @default(autoincrement())
  bio    String
  userId Int    @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Post {
  id          Int       @id @default(autoincrement())
  title       String
  slug        String    @unique
  content     String
  published   Boolean   @default(false)
  viewCount   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  authorId    Int
  author      User      @relation(fields: [authorId], references: [id])
  comments    Comment[]
  tags        Tag[]

  @@index([authorId])
  @@index([slug])
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
  postId    Int
  post      Post     @relation(fields: [postId], references: [id])
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String @unique
  posts Post[]
}

model Order {
  id        Int         @id @default(autoincrement())
  total     Decimal     @db.Decimal(10, 2)
  status    OrderStatus @default(PENDING)
  userId    Int
  user      User        @relation(fields: [userId], references: [id])
  items     OrderItem[]
  createdAt DateTime    @default(now())
}

model OrderItem {
  id        Int   @id @default(autoincrement())
  quantity  Int
  price     Decimal @db.Decimal(10, 2)
  orderId   Int
  order     Order @relation(fields: [orderId], references: [id])
  productId Int
}

enum Role {
  USER
  EDITOR
  ADMIN
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
`
              }
            ],
            exercise: 'Design a Prisma schema for a social media app with users, posts, likes, follows, and comments. Include proper relations and indexes.'
          },
          {
            id: 'prisma-crud',
            title: 'CRUD with Prisma Client',
            level: 'Intermediate',
            duration: '35 min',
            content: `The Prisma Client provides a type-safe API that mirrors your schema exactly. You get full TypeScript autocomplete for every query.`,
            examples: [
              {
                title: 'Prisma CRUD & Relations',
                lang: 'typescript',
                code: `import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// ─── CREATE ────────────────────────────────────
const user = await prisma.user.create({
  data: {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'EDITOR',
    profile: {
      create: { bio: 'Full-stack developer' }  // nested create
    }
  },
  include: { profile: true }  // include relation in result
});

// ─── READ ──────────────────────────────────────
// Find one
const user = await prisma.user.findUnique({
  where: { email: 'alice@example.com' },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    },
    _count: { select: { posts: true, comments: true } }
  }
});

// Find many with filters
const posts = await prisma.post.findMany({
  where: {
    published: true,
    author: { role: 'EDITOR' },
    tags: { some: { name: 'typescript' } },
    createdAt: { gte: new Date('2024-01-01') }
  },
  select: {
    id: true, title: true, slug: true,
    author: { select: { name: true, avatar: true } },
    _count: { select: { comments: true } }
  },
  orderBy: [{ viewCount: 'desc' }, { createdAt: 'desc' }],
  skip: (page - 1) * limit,
  take: limit,
});

// Count
const total = await prisma.post.count({ where: { published: true } });

// ─── UPDATE ────────────────────────────────────
const updated = await prisma.user.update({
  where: { id: 1 },
  data: {
    name: 'Alice Smith',
    posts: {
      updateMany: {
        where: { published: false },
        data: { published: true }
      }
    }
  }
});

// Upsert (create or update)
const upserted = await prisma.user.upsert({
  where: { email: 'alice@example.com' },
  update: { name: 'Alice Johnson' },
  create: { name: 'Alice Johnson', email: 'alice@example.com' }
});

// ─── DELETE ────────────────────────────────────
await prisma.user.delete({ where: { id: 5 } });
await prisma.post.deleteMany({ where: { published: false, createdAt: { lt: new Date('2024-01-01') } } });

// ─── TRANSACTIONS ─────────────────────────────
const [newOrder, updatedInventory] = await prisma.$transaction([
  prisma.order.create({ data: { userId: 1, total: 99.99, items: { create: [{ productId: 1, quantity: 2, price: 49.99 }] } } }),
  prisma.product.update({ where: { id: 1 }, data: { stock: { decrement: 2 } } })
]);

// Interactive transaction
await prisma.$transaction(async (tx) => {
  const account = await tx.account.findUnique({ where: { id: 1 } });
  if (account.balance < 100) throw new Error('Insufficient funds');
  await tx.account.update({ where: { id: 1 }, data: { balance: { decrement: 100 } } });
  await tx.account.update({ where: { id: 2 }, data: { balance: { increment: 100 } } });
});
`
              }
            ],
            exercise: 'Build a complete blog API with Prisma: user auth, post CRUD with tags, comments, likes, and a dashboard query showing aggregate stats.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // NOSQL
  // ─────────────────────────────────────────────────────────────
  {
    id: 'nosql',
    title: 'NoSQL Concepts',
    tagline: 'Beyond relational databases',
    color: '#e74c3c',
    icon: '◉',
    level: 'Concepts',
    description: 'Understand when and why to use NoSQL databases. Explore document, key-value, graph, and time-series stores with real-world trade-offs.',
    prerequisites: ['sql'],
    modules: [
      {
        id: 'nosql-overview',
        title: '1. NoSQL Landscape',
        lessons: [
          {
            id: 'nosql-types',
            title: 'Types of NoSQL Databases',
            level: 'Beginner',
            duration: '20 min',
            content: `NoSQL (Not Only SQL) databases sacrifice some relational properties to achieve scalability, flexibility, or performance benefits.

**Types & Use Cases:**

🗂 **Document Stores** (MongoDB, Firestore, CouchDB)
- Stores JSON-like documents
- Good for: content management, catalogs, user profiles

🔑 **Key-Value Stores** (Redis, DynamoDB, Memcached)  
- Simple: key → value
- Good for: caching, sessions, real-time leaderboards

📊 **Wide-Column** (Cassandra, HBase)
- Column-family data model
- Good for: IoT, analytics, time-series at massive scale

🕸 **Graph Databases** (Neo4j, Amazon Neptune)
- Nodes and edges
- Good for: social networks, recommendations, fraud detection

⏱ **Time-Series** (InfluxDB, TimescaleDB)
- Optimized for time-stamped data
- Good for: metrics, monitoring, IoT sensor data

**CAP Theorem:** A distributed system can only guarantee 2 of 3:
- **C**onsistency — all nodes see the same data
- **A**vailability — every request gets a response
- **P**artition tolerance — system works despite network splits`,
            examples: [
              {
                title: 'SQL vs NoSQL Decision',
                lang: 'javascript',
                code: `// ✅ Use SQL (PostgreSQL) when:
// - Complex relationships between data
// - ACID compliance is critical (banking, inventory)
// - Data structure is well-defined and stable
// - Complex joins and aggregations needed
// - Reporting and analytics

// ✅ Use Document DB (MongoDB) when:
// - Schema evolves frequently
// - Hierarchical/nested data (product catalogs)
// - Horizontal scaling needed
// - Development speed matters
// - Data varies per document (e-commerce products)

// ✅ Use Key-Value (Redis) when:
// - Caching database results
// - Session management
// - Real-time features (rate limiting, leaderboards)
// - Pub/sub messaging
// - Fast counter increments

// Example: Use both in same app (polyglot persistence)
const app = {
  // PostgreSQL: core business data
  users: 'postgres',
  orders: 'postgres',
  payments: 'postgres',
  
  // MongoDB: flexible content
  products: 'mongodb',     // varying attributes per category
  blogPosts: 'mongodb',    // rich content, comments
  userActivity: 'mongodb', // event logs
  
  // Redis: performance layer
  sessions: 'redis',
  cache: 'redis',
  rateLimit: 'redis',
  realtime: 'redis'        // pub/sub, websockets
};
`
              }
            ],
            exercise: 'Design a data storage strategy for a food delivery app: what goes in SQL, what in MongoDB, what in Redis? Justify each decision.'
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // MONGODB
  // ─────────────────────────────────────────────────────────────
  {
    id: 'mongodb',
    title: 'MongoDB',
    tagline: 'The leading document database',
    color: '#47a248',
    icon: '🍃',
    level: 'NoSQL Database',
    description: 'MongoDB stores data as flexible JSON-like documents. Master CRUD, aggregation pipelines, indexing, and Mongoose ODM for Node.js applications.',
    prerequisites: ['nodejs', 'nosql'],
    modules: [
      {
        id: 'mongodb-basics',
        title: '1. MongoDB Fundamentals',
        lessons: [
          {
            id: 'mongodb-crud',
            title: 'Collections, Documents & CRUD',
            level: 'Beginner',
            duration: '30 min',
            content: `MongoDB organizes data into **databases → collections → documents**. Documents are JSON-like (BSON) objects without a fixed schema.

**Key differences from SQL:**
| SQL | MongoDB |
|-----|---------|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |
| Index | Index |
| JOIN | $lookup or embedding |`,
            examples: [
              {
                title: 'MongoDB CRUD',
                lang: 'javascript',
                code: `// Using mongosh or MongoDB driver

// ─── Create Documents ─────────────────────────
db.users.insertOne({
  name: 'Alice Johnson',
  email: 'alice@example.com',
  age: 28,
  address: {              // embedded document
    city: 'New York',
    country: 'USA'
  },
  interests: ['coding', 'photography'], // array
  createdAt: new Date()
});

db.users.insertMany([
  { name: 'Bob', email: 'bob@example.com', age: 35 },
  { name: 'Carol', email: 'carol@example.com', age: 42 }
]);

// ─── Read Documents ───────────────────────────
db.users.find({});                           // all
db.users.findOne({ email: 'alice@example.com' }); // first match

// Query operators
db.users.find({ age: { $gt: 25, $lt: 50 } });    // range
db.users.find({ interests: 'coding' });            // array contains
db.users.find({ 'address.city': 'New York' });     // nested field
db.users.find({ $or: [{ age: 28 }, { name: 'Bob' }] });

// Projection (select fields)
db.users.find({}, { name: 1, email: 1, _id: 0 });

// Sort, limit, skip
db.users.find({}).sort({ age: -1 }).limit(10).skip(20);

// ─── Update Documents ─────────────────────────
db.users.updateOne(
  { email: 'alice@example.com' },
  {
    $set: { age: 29, 'address.city': 'Boston' },  // update fields
    $push: { interests: 'hiking' },                // add to array
    $inc: { loginCount: 1 },                       // increment
    $currentDate: { lastModified: true }
  }
);

db.users.updateMany(
  { age: { $lt: 18 } },
  { $set: { role: 'junior' } }
);

// Upsert (create if not found)
db.users.updateOne(
  { email: 'new@example.com' },
  { $set: { name: 'New User', email: 'new@example.com' } },
  { upsert: true }
);

// ─── Delete Documents ─────────────────────────
db.users.deleteOne({ email: 'spam@example.com' });
db.users.deleteMany({ active: false });
`
              }
            ],
            exercise: 'Build a movie database in MongoDB. Insert 20 movies with titles, genres (array), ratings, cast (array of objects). Write queries to find movies by genre, rating, and actor.'
          },
          {
            id: 'aggregation-pipeline',
            title: 'Aggregation Pipeline',
            level: 'Intermediate',
            duration: '40 min',
            content: `The MongoDB Aggregation Pipeline transforms documents through a series of stages. It's MongoDB's equivalent to SQL GROUP BY + JOINs + complex transformations.

**Key stages:** \`$match\`, \`$group\`, \`$project\`, \`$sort\`, \`$limit\`, \`$skip\`, \`$lookup\`, \`$unwind\`, \`$addFields\`, \`$count\``,
            examples: [
              {
                title: 'Aggregation Pipeline',
                lang: 'javascript',
                code: `// Sales analytics pipeline
db.orders.aggregate([
  // Stage 1: Filter
  { $match: { 
    createdAt: { $gte: new Date('2024-01-01') },
    status: 'completed'
  }},
  
  // Stage 2: Unwind array field
  { $unwind: '$items' },
  
  // Stage 3: Join with products collection
  { $lookup: {
    from: 'products',
    localField: 'items.productId',
    foreignField: '_id',
    as: 'product'
  }},
  { $unwind: '$product' },
  
  // Stage 4: Add computed fields
  { $addFields: {
    itemRevenue: { $multiply: ['$items.qty', '$items.price'] },
    month: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }
  }},
  
  // Stage 5: Group by category + month
  { $group: {
    _id: { category: '$product.category', month: '$month' },
    totalRevenue: { $sum: '$itemRevenue' },
    orderCount: { $sum: 1 },
    avgOrderValue: { $avg: '$itemRevenue' },
    products: { $addToSet: '$product.name' }
  }},
  
  // Stage 6: Project final shape
  { $project: {
    category: '$_id.category',
    month: '$_id.month',
    totalRevenue: { $round: ['$totalRevenue', 2] },
    orderCount: 1,
    avgOrderValue: { $round: ['$avgOrderValue', 2] },
    uniqueProducts: { $size: '$products' },
    _id: 0
  }},
  
  // Stage 7: Sort
  { $sort: { month: 1, totalRevenue: -1 } }
]);

// Faceted search (multiple groupings in one query)
db.products.aggregate([
  { $match: { price: { $gte: 10, $lte: 1000 } } },
  { $facet: {
    byCategory: [
      { $group: { _id: '$category', count: { $sum: 1 }, avgPrice: { $avg: '$price' } } },
      { $sort: { count: -1 } }
    ],
    byPriceRange: [
      { $bucket: {
        groupBy: '$price',
        boundaries: [0, 25, 100, 250, 500, 1000],
        default: 'Other',
        output: { count: { $sum: 1 } }
      }}
    ],
    stats: [
      { $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' }, avg: { $avg: '$price' } } }
    ]
  }}
]);
`
              }
            ],
            exercise: 'Build analytics for an e-commerce app: top products by revenue, customer lifetime value distribution, monthly active users, and funnel analysis using aggregation pipelines.'
          }
        ]
      },
      {
        id: 'mongoose',
        title: '2. Mongoose ODM',
        lessons: [
          {
            id: 'mongoose-schemas',
            title: 'Mongoose: Schemas, Models & Virtuals',
            level: 'Intermediate',
            duration: '35 min',
            content: `Mongoose is an ODM (Object Document Mapper) that provides schema validation, middleware hooks, and a rich query API for MongoDB in Node.js.`,
            examples: [
              {
                title: 'Mongoose Schema & Model',
                lang: 'javascript',
                code: `const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ─── Connection ────────────────────────────────
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'myapp',
  maxPoolSize: 10,
});

// ─── Schema ────────────────────────────────────
const userSchema = new mongoose.Schema({
  name: {
    first: { type: String, required: true, trim: true },
    last: { type: String, required: true, trim: true }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v),
      message: 'Invalid email format'
    }
  },
  password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: ['user', 'editor', 'admin'], default: 'user' },
  avatar: String,
  active: { type: Boolean, default: true },
  lastLogin: Date,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}, {
  timestamps: true,  // adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ─── Virtuals ─────────────────────────────────
userSchema.virtual('fullName').get(function () {
  return \`\${this.name.first} \${this.name.last}\`;
});

// ─── Pre-save Hook ─────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ─── Instance Methods ──────────────────────────
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toPublicJSON = function () {
  const { password, __v, ...rest } = this.toObject();
  return rest;
};

// ─── Static Methods ────────────────────────────
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() }).select('+password');
};

// ─── Index ─────────────────────────────────────
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

const User = mongoose.model('User', userSchema);
module.exports = User;

// ─── Usage ─────────────────────────────────────
const user = await User.create({
  name: { first: 'Alice', last: 'Johnson' },
  email: 'alice@example.com',
  password: 'SecurePass123!'
});

console.log(user.fullName); // "Alice Johnson" (virtual)

const found = await User.findByEmail('alice@example.com');
const isValid = await found.comparePassword('SecurePass123!');
`
              }
            ],
            exercise: 'Build a complete blog API with Mongoose: User, Post, Comment schemas with virtuals, hooks, populate queries, and a search feature.'
          }
        ]
      }
    ]
  }
];

// ─── Quick Reference snippets ─────────────────────────────────────────────────
export const quickRef = {
  nodejs: [
    { label: 'Read file', code: `const data = await fs.readFile('file.txt', 'utf-8');` },
    { label: 'Write file', code: `await fs.writeFile('file.txt', 'content');` },
    { label: 'HTTP server', code: `http.createServer((req, res) => res.end('OK')).listen(3000);` },
    { label: 'EventEmitter', code: `const ee = new EventEmitter(); ee.on('event', cb); ee.emit('event');` },
  ],
  express: [
    { label: 'GET route', code: `app.get('/path', (req, res) => res.json({ ok: true }));` },
    { label: 'POST with body', code: `app.post('/path', (req, res) => { const { name } = req.body; });` },
    { label: 'Middleware', code: `app.use((req, res, next) => { /* logic */ next(); });` },
    { label: 'Error handler', code: `app.use((err, req, res, next) => res.status(500).json({ error: err.message }));` },
  ],
  sql: [
    { label: 'Select with join', code: `SELECT u.name, p.title FROM users u JOIN posts p ON u.id = p.user_id;` },
    { label: 'Aggregate', code: `SELECT category, COUNT(*), AVG(price) FROM products GROUP BY category;` },
    { label: 'Window function', code: `SELECT name, RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rank;` },
    { label: 'CTE', code: `WITH cte AS (SELECT ...) SELECT * FROM cte WHERE ...;` },
  ],
  mongodb: [
    { label: 'Find', code: `db.collection.find({ field: value }).sort({ date: -1 }).limit(10);` },
    { label: 'Aggregate', code: `db.col.aggregate([{ $match: {} }, { $group: { _id: '$field' } }]);` },
    { label: 'Update', code: `db.col.updateOne({ _id: id }, { $set: { field: val }, $inc: { count: 1 } });` },
  ]
};
