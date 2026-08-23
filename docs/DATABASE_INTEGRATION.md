# Guia de Integração com Bancos de Dados Reais

O **NextBlog CMS** foi projetado para operar perfeitamente em modo *In-Memory/LocalStorage* durante o desenvolvimento rápido e se conectar a bancos de dados relacionais e NoSQL em produção.

---

## 1. Provedores Suportados

| Banco de Dados | ORM / Driver | Arquivo de Schema | Casos de Uso Recomendados |
|---|---|---|---|
| **PostgreSQL** | Prisma ORM / Drizzle | `prisma/schema.prisma` / `lib/db/drizzle/schema.ts` | Supabase, Neon, AWS RDS, Railway |
| **SQLite / Turso** | Prisma ORM / Drizzle | `prisma/schema.prisma` | Desenvolvimento local e Edge Deployments |
| **MongoDB Atlas** | Mongoose | `lib/db/mongoose/models.ts` | Arquiteturas orientadas a documentos NoSQL |

---

## 2. Configurando Prisma ORM (PostgreSQL / SQLite)

### Passo 1: Definir Variável de Ambiente
No seu arquivo `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nextblog_db?schema=public"
```

### Passo 2: Executar Migrações
```bash
# Gerar o cliente Prisma
npx prisma generate

# Executar as migrações no banco
npx prisma migrate dev --name init_cms_schema
```

### Passo 3: Visualizar Dados no Prisma Studio
```bash
npx prisma studio
```

---

## 3. Configurando Drizzle ORM (Alta Performance)

### Passo 1: Instalar Dependências
```bash
npm install drizzle-orm pg
npm install -D drizzle-kit @types/pg
```

### Passo 2: Sincronizar Schema
```bash
npx drizzle-kit push
```

---

## 4. Configurando MongoDB com Mongoose

### Passo 1: Definir String de Conexão
No seu `.env`:
```env
MONGODB_URI="mongodb+srv://admin:senha@cluster.mongodb.net/nextblog?retryWrites=true&w=majority"
```

### Passo 2: Utilizar Modelos
Importe os schemas de `lib/db/mongoose/models.ts` nas suas rotas de API para operações de CRUD.

---

## 5. Exportação e Importação de Dados

No painel administrativo, acesse **Banco de Dados**:
* **Exportar Backup (JSON)**: Gera um arquivo contendo toda a árvore de dados (posts, páginas, blocos, configurações, usuários e mídias).
* **Importar Backup**: Restaura instantaneamente um snapshot JSON anterior com revalidação automática de dados.
