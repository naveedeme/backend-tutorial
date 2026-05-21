export const projects = [
  {
    id: 'rest-api',
    title: 'REST API with Express + PostgreSQL',
    description: 'Build a production-grade REST API with authentication, validation, and a real database.',
    difficulty: 'Beginner',
    duration: '4–6 hours',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    tech: ['nodejs', 'express', 'postgresql'],
    featured: true,
    frontendNote: 'Pair with a React dashboard using React Query for data fetching, Tailwind for styling, and React Hook Form for forms.',
    concepts: ['REST design', 'Authentication', 'Middleware', 'PostgreSQL', 'Validation'],
    steps: [
      {
        title: 'Project Setup',
        description: 'Initialize the project and install dependencies.',
        commands: ['mkdir rest-api && cd rest-api', 'npm init -y', 'npm install express pg bcryptjs jsonwebtoken dotenv cors helmet morgan express-rate-limit joi', 'npm install -D nodemon'],
        code: {
          lang: 'json',
          filename: 'package.json (scripts)',
          content: `"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "db:migrate": "node src/db/migrate.js"
}`
        }
      },
      {
        title: 'Database Schema',
        description: 'Create tables and seed data.',
        commands: ['psql -U postgres', 'CREATE DATABASE todo_api;', '\\c todo_api'],
        code: {
          lang: 'sql',
          filename: 'src/db/schema.sql',
          content: `CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE todos (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  body       TEXT,
  completed  BOOLEAN DEFAULT FALSE,
  user_id    INT REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_todos_user ON todos(user_id);
CREATE INDEX idx_users_email ON users(email);`
        }
      },
      {
        title: 'Database Pool & Helpers',
        description: 'Set up a pg connection pool.',
        code: {
          lang: 'javascript',
          filename: 'src/db/pool.js',
          content: `const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
};`
        }
      },
      {
        title: 'Auth Routes (Register + Login)',
        description: 'Build JWT-based authentication.',
        code: {
          lang: 'javascript',
          filename: 'src/routes/auth.js',
          content: `const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/pool');
const { validateRegister, validateLogin } = require('../middleware/validate');

router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await db.query('SELECT id FROM users WHERE email=$1', [email]);
    if (exists.rows.length) return res.status(409).json({ error: 'Email taken' });
    const hash = await bcrypt.hash(password, 12);
    const { rows: [user] } = await db.query(
      'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,name,email,role',
      [name, email, hash]
    );
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user, token });
  } catch (err) { next(err); }
});

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { rows: [user] } = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (err) { next(err); }
});

module.exports = router;`
        }
      },
      {
        title: 'Todo CRUD Routes',
        description: 'All CRUD endpoints with ownership checks.',
        code: {
          lang: 'javascript',
          filename: 'src/routes/todos.js',
          content: `const router = require('express').Router();
const db = require('../db/pool');
const auth = require('../middleware/auth');

router.use(auth); // protect all todo routes

router.get('/', async (req, res, next) => {
  try {
    const { completed, page = 1, limit = 20 } = req.query;
    const conditions = ['user_id = $1'];
    const params = [req.userId];
    if (completed !== undefined) {
      conditions.push(\`completed = \$\${params.length + 1}\`);
      params.push(completed === 'true');
    }
    const offset = (page - 1) * limit;
    params.push(limit, offset);
    const { rows } = await db.query(
      \`SELECT * FROM todos WHERE \${conditions.join(' AND ')} ORDER BY created_at DESC LIMIT \$\${params.length - 1} OFFSET \$\${params.length}\`,
      params
    );
    res.json({ todos: rows, page: +page, limit: +limit });
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: 'Title required' });
    const { rows: [todo] } = await db.query(
      'INSERT INTO todos (title,body,user_id) VALUES ($1,$2,$3) RETURNING *',
      [title.trim(), body || '', req.userId]
    );
    res.status(201).json(todo);
  } catch (err) { next(err); }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { rows: [todo] } = await db.query(
      'UPDATE todos SET title=COALESCE($1,title), body=COALESCE($2,body), completed=COALESCE($3,completed), updated_at=NOW() WHERE id=$4 AND user_id=$5 RETURNING *',
      [req.body.title, req.body.body, req.body.completed, req.params.id, req.userId]
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { rowCount } = await db.query(
      'DELETE FROM todos WHERE id=$1 AND user_id=$2', [req.params.id, req.userId]
    );
    if (!rowCount) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;`
        }
      },
      {
        title: 'Server Entry Point',
        description: 'Wire everything together.',
        code: {
          lang: 'javascript',
          filename: 'src/server.js',
          content: `require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todos'));
app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\`🚀 http://localhost:\${PORT}\`));`
        }
      }
    ]
  },

  {
    id: 'nextjs-blog',
    title: 'Full-Stack Blog — Next.js + Prisma + PostgreSQL',
    description: 'A production blog with SSR, markdown support, authentication, comments, and an admin dashboard.',
    difficulty: 'Intermediate',
    duration: '8–12 hours',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'React', 'TypeScript'],
    tech: ['nextjs', 'prisma', 'postgresql'],
    featured: true,
    frontendNote: 'Use Next.js App Router with Tailwind CSS, MDX for rich content, shadcn/ui components, and Framer Motion for animations.',
    concepts: ['SSR', 'SSG', 'ISR', 'Prisma ORM', 'Next Auth', 'Markdown/MDX'],
    steps: [
      {
        title: 'Create Next.js App',
        commands: [
          'npx create-next-app@latest blog --typescript --tailwind --app --src-dir',
          'cd blog',
          'npm install prisma @prisma/client @auth/prisma-adapter next-auth',
          'npm install @mdx-js/loader @mdx-js/react gray-matter remark rehype',
          'npx prisma init'
        ],
        code: { lang: 'bash', filename: 'Terminal', content: `# Set DATABASE_URL in .env
# DATABASE_URL="postgresql://user:pass@localhost:5432/blog"` }
      },
      {
        title: 'Prisma Schema',
        code: {
          lang: 'prisma',
          filename: 'prisma/schema.prisma',
          content: `model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  image         String?
  role          String    @default("USER")
  posts         Post[]
  comments      Comment[]
  accounts      Account[]
  sessions      Session[]
}

model Post {
  id          String    @id @default(cuid())
  title       String
  slug        String    @unique
  excerpt     String
  content     String    @db.Text
  coverImage  String?
  published   Boolean   @default(false)
  views       Int       @default(0)
  authorId    String
  author      User      @relation(fields: [authorId], references: [id])
  tags        Tag[]
  comments    Comment[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  @@index([slug])
  @@index([published, createdAt])
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  postId    String
  post      Post     @relation(fields: [postId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  slug  String @unique
  posts Post[]
}`
        }
      },
      {
        title: 'API Routes for Posts',
        code: {
          lang: 'typescript',
          filename: 'src/app/api/posts/route.ts',
          content: `import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const page = parseInt(searchParams.get('page') || '1');
  const tag = searchParams.get('tag');
  const limit = 9;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { 
        published: true,
        ...(tag && { tags: { some: { slug: tag } } })
      },
      select: {
        id: true, title: true, slug: true, excerpt: true,
        coverImage: true, createdAt: true, views: true,
        author: { select: { name: true, image: true } },
        tags: { select: { name: true, slug: true } },
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where: { published: true } })
  ]);

  return NextResponse.json({ posts, total, pages: Math.ceil(total / limit) });
}

const postSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(50),
  excerpt: z.string().max(300),
  tags: z.array(z.string()),
  published: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const data = postSchema.parse(body);
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const post = await prisma.post.create({
    data: {
      ...data,
      slug,
      authorId: session.user.id,
      tags: {
        connectOrCreate: data.tags.map(name => ({
          where: { slug: name.toLowerCase() },
          create: { name, slug: name.toLowerCase() }
        }))
      }
    }
  });

  return NextResponse.json(post, { status: 201 });
}`
        }
      },
      {
        title: 'Blog Homepage (Server Component)',
        code: {
          lang: 'tsx',
          filename: 'src/app/page.tsx',
          content: `import { prisma } from '@/lib/prisma';
import { PostCard } from '@/components/PostCard';
import { HeroSection } from '@/components/HeroSection';

async function getFeaturedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    include: { author: true, tags: true, _count: { select: { comments: true } } },
    orderBy: [{ views: 'desc' }, { createdAt: 'desc' }],
    take: 6
  });
}

export default async function HomePage() {
  const posts = await getFeaturedPosts();
  return (
    <main>
      <HeroSection />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </section>
    </main>
  );
}`
        }
      }
    ]
  },

  {
    id: 'realtime-chat',
    title: 'Real-time Chat App — Socket.io + MongoDB',
    description: 'Build a WhatsApp-style chat with rooms, typing indicators, read receipts, and message history.',
    difficulty: 'Intermediate',
    duration: '6–10 hours',
    tags: ['Socket.io', 'MongoDB', 'Mongoose', 'React', 'Express'],
    tech: ['nodejs', 'express', 'mongodb'],
    featured: true,
    frontendNote: 'React frontend with socket.io-client, Context API for chat state, CSS Grid for chat layout mimicking WhatsApp/Slack design.',
    concepts: ['WebSockets', 'Socket.io rooms', 'MongoDB', 'Real-time events', 'Optimistic UI'],
    steps: [
      {
        title: 'Setup',
        commands: [
          'mkdir chat-app && cd chat-app',
          'npm init -y',
          'npm install express socket.io mongoose jsonwebtoken dotenv cors',
          'npx create-react-app client',
          'cd client && npm install socket.io-client'
        ],
        code: { lang: 'text', filename: 'Project structure', content: `chat-app/
├── server/
│   ├── models/    (User, Room, Message)
│   ├── routes/    (auth)
│   ├── socket/    (handlers)
│   └── index.js
└── client/        (React app)` }
      },
      {
        title: 'Message Model',
        code: {
          lang: 'javascript',
          filename: 'server/models/Message.js',
          content: `const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 2000 },
  type: { type: String, enum: ['text', 'image', 'file'], default: 'text' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
}, { timestamps: true });

messageSchema.index({ room: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);`
        }
      },
      {
        title: 'Socket.io Event Handlers',
        code: {
          lang: 'javascript',
          filename: 'server/socket/handlers.js',
          content: `const Message = require('../models/Message');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = (io) => {
  // Auth middleware for sockets
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = userId;
      await User.findByIdAndUpdate(userId, { online: true });
      next();
    } catch { next(new Error('Authentication error')); }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.userId);

    // Join room
    socket.on('room:join', async ({ roomId }) => {
      socket.join(roomId);
      const messages = await Message.find({ room: roomId })
        .populate('sender', 'name avatar')
        .sort('-createdAt').limit(50).lean();
      socket.emit('room:history', messages.reverse());
      socket.to(roomId).emit('user:joined', { userId: socket.userId });
    });

    // Send message
    socket.on('message:send', async ({ roomId, content, replyTo }) => {
      const message = await Message.create({
        content, room: roomId, sender: socket.userId, replyTo
      });
      const populated = await message.populate('sender', 'name avatar');
      io.to(roomId).emit('message:new', populated);
    });

    // Typing indicators
    socket.on('typing:start', ({ roomId }) => {
      socket.to(roomId).emit('typing:start', { userId: socket.userId });
    });
    socket.on('typing:stop', ({ roomId }) => {
      socket.to(roomId).emit('typing:stop', { userId: socket.userId });
    });

    // Read receipts
    socket.on('message:read', async ({ roomId }) => {
      await Message.updateMany(
        { room: roomId, readBy: { $ne: socket.userId } },
        { $addToSet: { readBy: socket.userId } }
      );
      socket.to(roomId).emit('message:read', { userId: socket.userId, roomId });
    });

    socket.on('disconnect', async () => {
      await User.findByIdAndUpdate(socket.userId, { online: false, lastSeen: new Date() });
      io.emit('user:offline', { userId: socket.userId });
    });
  });
};`
        }
      }
    ]
  },

  {
    id: 'ecommerce-api',
    title: 'E-Commerce API — Node + Prisma + PostgreSQL',
    description: 'Complete e-commerce backend: products, cart, orders, payments (Stripe), reviews, and inventory management.',
    difficulty: 'Advanced',
    duration: '12–20 hours',
    tags: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Stripe', 'Redis'],
    tech: ['nodejs', 'express', 'prisma', 'postgresql'],
    featured: true,
    frontendNote: 'React + TypeScript storefront with React Query, Stripe Elements for payments, Zustand for cart state, and a Tailwind-powered design system.',
    concepts: ['Complex relations', 'Stripe payments', 'Inventory', 'Search', 'Caching', 'Webhooks'],
    steps: [
      {
        title: 'Project Setup',
        commands: [
          'mkdir ecommerce && cd ecommerce',
          'npm init -y',
          'npm install express prisma @prisma/client stripe redis dotenv bcryptjs jsonwebtoken zod',
          'npx prisma init'
        ],
        code: { lang: 'text', filename: 'Architecture', content: `src/
├── routes/      products, cart, orders, payments, reviews
├── middleware/  auth, validate, rateLimit
├── services/   StripeService, EmailService, CacheService
├── prisma/     schema, migrations, seed
└── utils/      errors, pagination, search` }
      },
      {
        title: 'Prisma Schema (Products, Orders)',
        code: {
          lang: 'prisma',
          filename: 'prisma/schema.prisma (excerpt)',
          content: `model Product {
  id          Int       @id @default(autoincrement())
  name        String
  slug        String    @unique
  description String    @db.Text
  price       Decimal   @db.Decimal(10,2)
  compareAt   Decimal?  @db.Decimal(10,2)
  images      String[]
  stock       Int       @default(0)
  sku         String    @unique
  categoryId  Int
  category    Category  @relation(fields: [categoryId], references: [id])
  variants    Variant[]
  reviews     Review[]
  orderItems  OrderItem[]
  tags        String[]
  metadata    Json?
  active      Boolean   @default(true)
  createdAt   DateTime  @default(now())
  @@index([slug])
  @@index([categoryId])
}

model Order {
  id              Int         @id @default(autoincrement())
  orderNumber     String      @unique @default(cuid())
  status          OrderStatus @default(PENDING)
  subtotal        Decimal     @db.Decimal(10,2)
  tax             Decimal     @db.Decimal(10,2)
  shipping        Decimal     @db.Decimal(10,2)
  total           Decimal     @db.Decimal(10,2)
  userId          Int
  user            User        @relation(fields: [userId], references: [id])
  items           OrderItem[]
  address         Address?
  stripePaymentId String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}`
        }
      },
      {
        title: 'Product Service with Search & Caching',
        code: {
          lang: 'javascript',
          filename: 'src/services/ProductService.js',
          content: `const { prisma } = require('../lib/prisma');
const redis = require('../lib/redis');

class ProductService {
  async search({ q, category, minPrice, maxPrice, sort, page = 1, limit = 20 }) {
    const cacheKey = \`products:\${JSON.stringify({ q, category, minPrice, maxPrice, sort, page })}\`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const where = {
      active: true,
      ...(category && { category: { slug: category } }),
      ...(minPrice || maxPrice) && { price: { gte: minPrice, lte: maxPrice } },
      ...(q && { OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { tags: { has: q.toLowerCase() } }
      ]})
    };

    const orderBy = {
      'price-asc': { price: 'asc' },
      'price-desc': { price: 'desc' },
      'newest': { createdAt: 'desc' },
      'rating': { reviews: { _count: 'desc' } },
    }[sort] || { createdAt: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where, orderBy,
        skip: (page - 1) * limit, take: limit,
        include: { category: true, _count: { select: { reviews: true } } }
      }),
      prisma.product.count({ where })
    ]);

    const result = { products, total, pages: Math.ceil(total / limit), page };
    await redis.setex(cacheKey, 300, JSON.stringify(result)); // cache 5 min
    return result;
  }

  async decrementStock(items) {
    return prisma.$transaction(
      items.map(({ productId, qty }) =>
        prisma.product.update({
          where: { id: productId, stock: { gte: qty } },
          data: { stock: { decrement: qty } }
        })
      )
    );
  }
}

module.exports = new ProductService();`
        }
      },
      {
        title: 'Stripe Payment Integration',
        code: {
          lang: 'javascript',
          filename: 'src/routes/payments.js',
          content: `const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { prisma } = require('../lib/prisma');
const auth = require('../middleware/auth');
const ProductService = require('../services/ProductService');

// Create payment intent
router.post('/create-intent', auth, async (req, res, next) => {
  try {
    const { cartItems, addressId } = req.body;
    const products = await prisma.product.findMany({
      where: { id: { in: cartItems.map(i => i.productId) } }
    });

    const subtotal = cartItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + product.price.toNumber() * item.quantity;
    }, 0);

    const tax = subtotal * 0.1;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // cents
      currency: 'usd',
      metadata: { userId: req.userId, cartItems: JSON.stringify(cartItems) }
    });

    res.json({ clientSecret: paymentIntent.client_secret, total });
  } catch (err) { next(err); }
});

// Webhook to fulfill order after payment
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch { return res.status(400).send('Webhook Error'); }

  if (event.type === 'payment_intent.succeeded') {
    const { userId, cartItems } = event.data.object.metadata;
    const items = JSON.parse(cartItems);
    await ProductService.decrementStock(items);
    await prisma.order.create({
      data: {
        userId: parseInt(userId),
        stripePaymentId: event.data.object.id,
        status: 'PAID',
        items: { create: items.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price })) },
        total: event.data.object.amount / 100
      }
    });
  }

  res.json({ received: true });
});

module.exports = router;`
        }
      }
    ]
  },

  {
    id: 'task-manager',
    title: 'Team Task Manager — Next.js + Prisma + Auth',
    description: 'Trello-style kanban board with teams, roles, drag-and-drop, due dates, and email notifications.',
    difficulty: 'Advanced',
    duration: '15–25 hours',
    tags: ['Next.js 14', 'Prisma', 'NextAuth', 'React', 'TypeScript', 'Email'],
    tech: ['nextjs', 'prisma', 'postgresql'],
    featured: false,
    frontendNote: 'React beautiful DnD for drag-and-drop, Framer Motion animations, shadcn/ui components, and a kanban board layout.',
    concepts: ['Teams & RBAC', 'NextAuth', 'Real-time with Server Actions', 'Email notifications', 'File uploads'],
    steps: [
      {
        title: 'Setup & Auth', commands: ['npx create-next-app@latest tasks --typescript --tailwind --app', 'npm install prisma @prisma/client next-auth @auth/prisma-adapter nodemailer zod', 'npx prisma init'],
        code: { lang: 'typescript', filename: 'src/lib/auth.ts', content: `import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from './prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({ clientId: process.env.GITHUB_ID!, clientSecret: process.env.GITHUB_SECRET! }),
    EmailProvider({ server: process.env.EMAIL_SERVER, from: process.env.EMAIL_FROM })
  ],
  callbacks: {
    session: ({ session, user }) => ({ ...session, user: { ...session.user, id: user.id, role: user.role } })
  }
});` }
      },
      {
        title: 'Board & Task Schema', code: {
          lang: 'prisma', filename: 'prisma/schema.prisma (excerpt)', content: `model Board {
  id          String   @id @default(cuid())
  title       String
  description String?
  teamId      String
  team        Team     @relation(fields: [teamId], references: [id])
  columns     Column[]
  createdAt   DateTime @default(now())
}

model Column {
  id       String @id @default(cuid())
  title    String
  order    Int
  boardId  String
  board    Board  @relation(fields: [boardId], references: [id])
  tasks    Task[]
}

model Task {
  id          String     @id @default(cuid())
  title       String
  description String?    @db.Text
  priority    Priority   @default(MEDIUM)
  status      String
  order       Int
  dueDate     DateTime?
  columnId    String
  column      Column     @relation(fields: [columnId], references: [id])
  assigneeId  String?
  assignee    User?      @relation(fields: [assigneeId], references: [id])
  labels      Label[]
  attachments Attachment[]
  comments    Comment[]
  createdAt   DateTime   @default(now())
}` }
      }
    ]
  },

  {
    id: 'url-shortener',
    title: 'URL Shortener with Analytics — MongoDB + Redis',
    description: 'Build a Bitly-style URL shortener with click analytics, expiry, and a dashboard.',
    difficulty: 'Beginner',
    duration: '3–5 hours',
    tags: ['Node.js', 'Express', 'MongoDB', 'Redis'],
    tech: ['nodejs', 'express', 'mongodb'],
    featured: false,
    frontendNote: 'Minimal React frontend with a link input, QR code display (using qrcode.react), and a real-time click analytics chart (Recharts).',
    concepts: ['Short code generation', 'Redis caching', 'Click tracking', 'MongoDB TTL indexes', 'Analytics'],
    steps: [
      {
        title: 'URL Model with TTL', code: {
          lang: 'javascript', filename: 'models/Url.js', content: `const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  original: { type: String, required: true },
  short: { type: String, required: true, unique: true, index: true },
  userId: mongoose.Schema.Types.ObjectId,
  clicks: { type: Number, default: 0 },
  clickData: [{
    timestamp: { type: Date, default: Date.now },
    ip: String, country: String, device: String, referrer: String
  }],
  active: { type: Boolean, default: true },
  expiresAt: Date,
}, { timestamps: true });

// TTL index — MongoDB auto-deletes expired docs
urlSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Url', urlSchema);` }
      },
      {
        title: 'Redirect with Redis Cache', code: {
          lang: 'javascript', filename: 'routes/redirect.js', content: `router.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    
    // Check Redis cache first
    const cached = await redis.get(\`url:\${code}\`);
    if (cached) {
      trackClick(code, req); // async, don't await
      return res.redirect(301, cached);
    }

    const url = await Url.findOne({ short: code, active: true });
    if (!url) return res.status(404).json({ error: 'URL not found' });
    if (url.expiresAt && url.expiresAt < new Date()) {
      return res.status(410).json({ error: 'URL expired' });
    }

    // Cache for 1 hour
    await redis.setex(\`url:\${code}\`, 3600, url.original);
    trackClick(code, req);
    res.redirect(301, url.original);
  } catch (err) { next(err); }
});

async function trackClick(code, req) {
  await Url.findOneAndUpdate(
    { short: code },
    { $inc: { clicks: 1 }, $push: {
      clickData: { ip: req.ip, referrer: req.headers.referer || 'direct', device: parseDevice(req.headers['user-agent']) }
    }}
  );
}` }
      }
    ]
  },

  {
    id: 'auth-system',
    title: 'Advanced Auth System — OAuth, MFA, Refresh Tokens',
    description: 'Enterprise-grade authentication: OAuth (Google/GitHub), multi-factor auth, refresh token rotation, and device management.',
    difficulty: 'Advanced',
    duration: '10–15 hours',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'OAuth', 'MFA', 'Security'],
    tech: ['nodejs', 'express', 'postgresql'],
    featured: false,
    frontendNote: 'React auth flow with QR code for MFA setup (using speakeasy + qrcode), device list management, and session invalidation UI.',
    concepts: ['OAuth 2.0', 'TOTP MFA', 'Refresh token rotation', 'Device fingerprinting', 'Security events'],
    steps: [
      {
        title: 'Setup', commands: ['npm install express pg bcryptjs jsonwebtoken speakeasy qrcode passport passport-google-oauth20 passport-github2 dotenv'],
        code: { lang: 'text', filename: 'Auth features', content: `✓ Email/password with bcrypt hashing
✓ JWT access tokens (15min) + refresh tokens (7d)
✓ Refresh token rotation (new token each refresh)
✓ Google & GitHub OAuth
✓ TOTP MFA with QR code setup
✓ Device tracking & session management
✓ Account lockout after failed attempts
✓ Security event logging` }
      }
    ]
  },

  {
    id: 'search-engine',
    title: 'Product Search Engine — PostgreSQL Full-Text',
    description: 'Build Elasticsearch-level product search using PostgreSQL full-text search, trigrams, and relevance ranking.',
    difficulty: 'Intermediate',
    duration: '6–8 hours',
    tags: ['Node.js', 'PostgreSQL', 'Full-Text Search', 'Express'],
    tech: ['nodejs', 'express', 'postgresql'],
    featured: false,
    frontendNote: 'React search UI with instant results (debounced), faceted filters (category, price range, rating), and search analytics.',
    concepts: ['Full-text search', 'tsvector/tsquery', 'Trigram similarity', 'Ranking', 'Faceted filters'],
    steps: [
      {
        title: 'Full-Text Search Schema', code: {
          lang: 'sql', filename: 'migrations/001_search.sql', content: `-- Enable pg_trgm for fuzzy search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

ALTER TABLE products ADD COLUMN search_vector tsvector;

-- Update vector on insert/update
CREATE OR REPLACE FUNCTION products_search_vector_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.brand, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.tags, ' '), '')), 'B');
  RETURN NEW;
END $$ LANGUAGE plpgsql;

CREATE TRIGGER products_search_update
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION products_search_vector_trigger();

-- GIN index for fast full-text search
CREATE INDEX idx_products_search ON products USING GIN (search_vector);
CREATE INDEX idx_products_trgm ON products USING GIN (name gin_trgm_ops);` }
      }
    ]
  },

  {
    id: 'monitoring-api',
    title: 'API Monitoring Dashboard — Node + MongoDB + WebSockets',
    description: 'Build a Datadog-lite: collect API metrics, show real-time charts, alerts, and request traces.',
    difficulty: 'Advanced',
    duration: '10–16 hours',
    tags: ['Node.js', 'MongoDB', 'Socket.io', 'React', 'Charts'],
    tech: ['nodejs', 'mongodb', 'express'],
    featured: false,
    frontendNote: 'React dashboard with Recharts for real-time metrics, Socket.io for live updates, and a dark theme developer-focused design.',
    concepts: ['Metrics collection', 'Time-series data', 'Aggregation pipelines', 'WebSockets', 'Alerting'],
    steps: [
      {
        title: 'Metrics Collection Middleware', code: {
          lang: 'javascript', filename: 'middleware/metrics.js', content: `const Metric = require('../models/Metric');

module.exports = (req, res, next) => {
  const start = Date.now();
  const { method, path, ip } = req;

  res.on('finish', async () => {
    const duration = Date.now() - start;
    try {
      await Metric.create({
        method, path: path.replace(/\\/[0-9]+/g, '/:id'),
        statusCode: res.statusCode,
        duration,
        ip,
        timestamp: new Date(),
        userAgent: req.headers['user-agent'],
        contentLength: res.get('content-length') || 0
      });
    } catch {} // never block the response
  });

  next();
};` }
      }
    ]
  }
];
