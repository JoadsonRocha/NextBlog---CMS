# 🗄️ Database & ORM Integration Guide

**NextBlog CMS** is architected to operate seamlessly in a zero-config *In-Memory/Reactive Storage* mode for instantaneous prototyping, while providing turnkey persistence integrations for enterprise SQL (PostgreSQL, SQLite) and NoSQL (MongoDB) databases in production.

---

## 1. Supported Persistence Drivers

| Database Engine | ORM / Driver | Schema Location | Target Platforms |
|---|---|---|---|
| **PostgreSQL** | Prisma ORM / Drizzle | [`prisma/schema.prisma`](file:///d:/FULLSTARK/NextBlog---CMS/prisma/schema.prisma) | Supabase, Neon Database, AWS RDS, Railway |
| **SQLite / Turso** | Prisma ORM / LibSQL | [`prisma/schema.prisma`](file:///d:/FULLSTARK/NextBlog---CMS/prisma/schema.prisma) | Local Development, Embedded Edge Deployments |
| **MongoDB Atlas** | Mongoose | [`lib/db/mongoose/models.ts`](file:///d:/FULLSTARK/NextBlog---CMS/lib/db/mongoose/models.ts) | Document-oriented NoSQL architectures |
| **Zero-Config Reactive** | LocalStorage / Memory | [`lib/db/adapter.ts`](file:///d:/FULLSTARK/NextBlog---CMS/lib/db/adapter.ts) | Instant evaluation, CI tests, static demos |

---

## 2. PostgreSQL Setup with Prisma ORM (Recommended)

### Step 1: Configure Connection String
Define your connection string in your `.env` file:
```env
# Example Neon / Supabase pooled connection string
DATABASE_URL="postgresql://user:password@ep-cool-sample.us-east-2.aws.neon.tech/nextblog_db?sslmode=require"
```

### Step 2: Generate Prisma Client & Run Migrations
Run the database migration workflow:
```bash
# Generate type-safe Prisma client
npx prisma generate

# Apply migrations to your database
npx prisma migrate dev --name init_cms_schema
```

### Step 3: Inspect Database with Prisma Studio
Open the built-in visual data explorer in your browser:
```bash
npx prisma studio
```
Access the visual studio at **[http://localhost:5555](http://localhost:5555)** to browse records, inspect block JSON trees, and manage user accounts.

---

## 3. High-Performance SQL with Drizzle ORM

NextBlog CMS includes ready-to-use Drizzle ORM definitions in [`lib/db/drizzle/schema.ts`](file:///d:/FULLSTARK/NextBlog---CMS/lib/db/drizzle/schema.ts).

### Step 1: Install Optional Driver Dependencies
```bash
npm install drizzle-orm pg
npm install -D drizzle-kit @types/pg
```

### Step 2: Push Schema to Target Database
```bash
npx drizzle-kit push
```

---

## 4. Document Persistence with MongoDB Atlas

For projects requiring schema flexibility, MongoDB models are defined in [`lib/db/mongoose/models.ts`](file:///d:/FULLSTARK/NextBlog---CMS/lib/db/mongoose/models.ts).

### Step 1: Define MongoDB URI
```env
MONGODB_URI="mongodb+srv://admin:password@cluster0.mongodb.net/nextblog?retryWrites=true&w=majority"
```

### Step 2: Utilize Mongoose Models
Import `PostMongooseSchema` directly into API routes (`app/api/posts/route.ts`) to handle NoSQL storage operations.

---

## 5. 1-Click JSON Snapshot Backup & Restore

Through the **Database Manager** tab in the Admin panel:
* **Export Snapshot (JSON)**: Generates a complete JSON backup bundle encompassing all posts, modular block trees, pages, media records, categories, and settings.
* **Import Snapshot**: Instantly hydrates and validates the application state from any prior JSON backup without requiring server restarts.
