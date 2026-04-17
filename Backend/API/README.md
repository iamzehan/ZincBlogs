# 📚 Blog Platform API Documentation

![Node.js](https://img.shields.io/badge/Node.js-v20+-green)
![Express](https://img.shields.io/badge/Express-5.2.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![Prisma](https://img.shields.io/badge/Prisma-7.2.0-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791)
![Status](https://img.shields.io/badge/Status-Production-brightgreen)

**Version:** 1.0.0  
**Last Updated:** April 17, 2026

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **Blog Platform API** is a production-grade, RESTful backend service for a comprehensive blogging platform. It provides secure, scalable APIs for managing:

- 👤 **Authors & Subscribers** - User authentication and profile management
- 📝 **Blogs** - Content creation, retrieval, and management
- 💬 **Comments** - User-generated comments on blog posts
- ❤️ **Likes** - Like system for blogs
- 🏷️ **Tags** - Content classification and organization
- ✉️ **Email Verification** - Secure email-based account verification

### Key Features

✅ JWT-based stateless authentication  
✅ Email verification workflow  
✅ PostgreSQL with Prisma ORM  
✅ Role-based access control (RBAC-ready)  
✅ Cloudinary integration for image uploads  
✅ Background job processing (cron jobs)  
✅ Session management with secure cookies  
✅ Comprehensive error handling  
✅ CORS support for multi-origin access  
✅ Request logging with Morgan  

---

## Quick Start

### Prerequisites

- **Node.js** v20 or higher
- **PostgreSQL** 12+
- **npm** or **yarn**
- **Docker** (optional)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blog-Project/Backend/API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   See [Environment Variables](#environment-variables) section below.

4. **Setup database**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3000`

---

## Installation

### Dependencies

Core dependencies:
- **express** - Web framework
- **@prisma/client** - ORM for database
- **jsonwebtoken** - JWT authentication
- **bcrypt** - Password hashing
- **nodemailer** - Email sending
- **cloudinary** - Image upload service
- **postgres** - Database driver
- **express-session** - Session management
- **helmet** - Security headers
- **compression** - Response compression
- **cors** - Cross-origin resource sharing
- **zod** - Schema validation

### Environment Variables

Create a `.env.local` file in the API root with the following:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/blog_db

# JWT Secrets
JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_key_min_32_chars

# Session
SESSION_SECRET=your_session_secret_key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# URLs
CLIENT_URL=http://localhost:5173
CMS_URL=http://localhost:5174

# Cloudinary
CL_NAME=your_cloudinary_name
CL_API_KEY=your_cloudinary_api_key
CL_API_SECRET=your_cloudinary_api_secret
```

---

## Architecture

### Core Principles

🏗️ **RESTful API Design** - Standard HTTP methods and status codes  
🔐 **Stateless Authentication** - JWT tokens for session management  
📊 **Normalized Schema** - PostgreSQL with relational data model  
🧩 **Modular Structure** - Separated concerns (routes, controllers, services)  
🛡️ **Secure by default** - Helmet, CORS, input validation  
⚡ **Performance optimized** - Compression, caching-ready  

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Node.js + TypeScript | Typed JavaScript runtime |
| **Framework** | Express 5.x | Web framework |
| **Database** | PostgreSQL | Relational data storage |
| **ORM** | Prisma 7.x | Type-safe database access |
| **Auth** | JWT | Stateless authentication |
| **Validation** | Zod | Schema validation |
| **File Storage** | Cloudinary | Cloud image hosting |
| **Email** | Nodemailer | Transactional emails |
| **Security** | Helmet, Bcrypt | Security headers & hashing |
| **Logging** | Morgan, Winston | Request & application logs |

---

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication Routes
```
POST   /auth/register          - Register new author
POST   /auth/login             - Author login
POST   /auth/refresh           - Refresh access token
POST   /auth/logout            - Logout (clear session)
```

### Subscriber Routes
```
POST   /subs/auth/register     - Register new subscriber
POST   /subs/auth/login        - Subscriber login
POST   /subs/auth/verify       - Verify email token
```

### Profile Routes
```
GET    /profile                - Get current user profile (auth)
PUT    /profile                - Update profile (auth)
GET    /profile/:id            - Get profile by ID
```

### Blog Routes
```
GET    /blogs                  - List all blogs (paginated)
POST   /blogs                  - Create new blog (auth)
GET    /blogs/:id              - Get blog by ID
PUT    /blogs/:id              - Update blog (auth, owner only)
DELETE /blogs/:id              - Delete blog (auth, owner only)
GET    /blogs/:id/comments     - Get blog comments
```

### Comment Routes
```
POST   /blogs/:id/comments     - Add comment (auth)
PUT    /comments/:id           - Update comment (auth, owner only)
DELETE /comments/:id           - Delete comment (auth, owner only)
```

### Tag Routes
```
GET    /tags                   - List all tags
POST   /tags                   - Create new tag
GET    /tags/:id/blogs         - Get blogs by tag
```

### Upload Routes
```
POST   /upload                 - Upload image to Cloudinary (auth)
DELETE /upload/:id             - Delete image from Cloudinary (auth)
```

### Health Check
```
GET    /health                 - API health status
```

---

## Authentication

### JWT Strategy

The API uses **JWT (JSON Web Tokens)** for stateless authentication with a dual-token approach.

#### Token Types

**Access Token**
- Short-lived (15 minutes)
- Included in Authorization header
- Used for API requests
- Header: `Authorization: Bearer <access_token>`

**Refresh Token**
- Long-lived (7 days)
- Stored as httpOnly cookie
- Used to obtain new access tokens
- Automatically sent with requests

#### Authentication Flow

1. **Registration/Login**
   ```bash
   POST /auth/login
   Content-Type: application/json
   
   {
     "email": "author@example.com",
     "password": "secure_password"
   }
   
   Response:
   {
     "success": true,
     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": { ... }
   }
   ```

2. **Authenticated Requests**
   ```bash
   GET /api/profile
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Token Refresh**
   ```bash
   POST /auth/refresh
   
   Response: New access token
   ```

4. **Logout**
   ```bash
   POST /auth/logout
   
   Response: Clears refresh token cookie
   ```

### Email Verification

New subscribers must verify email:

1. User registers with email
   ```bash
   POST /subs/auth/register
   ```

2. Verification email sent with unique token

3. User clicks verification link or calls:
   ```bash
   POST /subs/auth/verify?token=<verification_token>
   ```

4. Email confirmed, subscriber account activated

### Protected Routes

Routes marked `(auth)` require valid JWT in Authorization header:

```bash
Authorization: Bearer <your_access_token>
```

---

## Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  },
  "statusCode": 400
}
```

### HTTP Status Codes

| Code | Meaning | Typical Cause |
|------|---------|---------------|
| **200** | OK | Successful request |
| **201** | Created | Resource created successfully |
| **204** | No Content | Successful deletion |
| **400** | Bad Request | Invalid input/validation error |
| **401** | Unauthorized | Missing/invalid authentication token |
| **403** | Forbidden | Insufficient permissions |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Resource already exists |
| **422** | Unprocessable | Validation error details |
| **500** | Server Error | Internal server error |
| **503** | Service Unavailable | Service down/maintenance |

### Common Error Codes

| Code | HTTP | Description |
|------|------|-------------|
| `INVALID_CREDENTIALS` | 401 | Email or password incorrect |
| `EMAIL_ALREADY_EXISTS` | 409 | Email address already registered |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource doesn't exist |
| `UNAUTHORIZED` | 401 | User not authenticated |
| `FORBIDDEN` | 403 | User lacks permission |
| `VALIDATION_ERROR` | 422 | Input validation failed |
| `EMAIL_NOT_VERIFIED` | 401 | Email verification required |
| `TOKEN_EXPIRED` | 401 | JWT token expired |
| `INVALID_TOKEN` | 401 | JWT token invalid/malformed |
| `DUPLICATE_ENTRY` | 409 | Duplicate resource entry |

---

## Database Schema

### Core Models

#### Author
```prisma
model Author {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   # bcrypt hashed
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  profile   Profile?
}
```

#### Profile
```prisma
model Profile {
  id        String    @id @default(uuid())
  username  String    @unique
  firstName String
  lastName  String
  authorId  String    @unique
  
  author    Author    @relation(fields: [authorId], references: [id], onDelete: Cascade)
  blogs     Blog[]
}
```

#### Subscriber
```prisma
model Subscriber {
  id         String   @id @default(uuid())
  email      String   @unique
  password   String   # bcrypt hashed
  firstName  String
  lastName   String
  username   String   @unique
  isVerified Boolean  @default(false)
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
  
  comments   Comments[]
  likes      Likes[]
}
```

#### Blog
```prisma
model Blog {
  id        String   @id @default(uuid())
  title     String
  content   String
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  author    Profile  @relation(fields: [authorId], references: [authorId])
  tags      TagsOnBlogs[]
  comments  Comments[]
  likes     Likes[]
}
```

#### Comments
```prisma
model Comments {
  id          String   @id @default(uuid())
  content     String
  rating      Int      # 1-5 stars
  subscriberId String
  blogId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  subscriber  Subscriber @relation(fields: [subscriberId], references: [id])
  blog        Blog @relation(fields: [blogId], references: [id])
}
```

#### Tags & Blog Association
```prisma
model Tags {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  
  blogs       TagsOnBlogs[]
}

model TagsOnBlogs {
  tagId  String
  blogId String
  
  tag    Tags @relation(fields: [tagId], references: [id])
  blog   Blog @relation(fields: [blogId], references: [id])
  
  @@id([tagId, blogId])
}
```

#### Email Verification
```prisma
model PendingUser {
  id        String @id @default(uuid())
  email     String @unique
  password  String
  firstName String
  lastName  String
  username  String @unique
  createdAt DateTime @default(now())
  
  token     EmailToken?
}

model EmailToken {
  id        String   @id @default(uuid())
  pendingId String   @unique
  tokenHash String
  expiresAt DateTime
  
  pending   PendingUser @relation(fields: [pendingId], references: [id], onDelete: Cascade)
}
```

#### Session
```prisma
model Session {
  id        String   @id @default(cuid())
  sid       String   @unique
  data      String   # JSON session data
  expiresAt DateTime # Session expiry
}
```

### Entity Relationships

```
Author (1) ─────── (1) Profile
  │
  └─ (1) ───── (M) Blog

Subscriber (1) ─────── (M) Comments
Subscriber (1) ─────── (M) Likes

Blog (1) ─────── (M) Comments
Blog (1) ─────── (M) Likes  
Blog (M) ─────── (M) Tags (via TagsOnBlogs)

PendingUser (1) ─────── (1) EmailToken
```

---

## Project Structure

```
Backend/API/
├── src/
│   ├── app.ts                      # Express app configuration
│   ├── server.ts                   # Server entry point
│   │
│   ├── config/                     # Configuration modules
│   │   ├── env.ts                  # Environment validation (Zod)
│   │   ├── session.ts              # Express-session setup
│   │   ├── prisma.ts               # Prisma client instance
│   │   └── cloudinary.ts           # Cloudinary SDK config
│   │
│   ├── controllers/                # Route handlers/business logic
│   │   ├── auth.controller.ts      # Author authentication
│   │   ├── subs.auth.controller.ts # Subscriber authentication
│   │   ├── subs.controller.ts      # Subscriber profile ops
│   │   ├── blog.controller.ts      # Blog CRUD operations
│   │   ├── profile.controller.ts   # Author profile management
│   │   ├── tags.controller.ts      # Tag management
│   │   ├── image.controller.ts     # Image upload handling
│   │   ├── health.controller.ts    # Health check endpoint
│   │   └── [more controllers]
│   │
│   ├── middlewares/                # Custom Express middlewares
│   │   ├── auth.middleware.ts      # JWT verification
│   │   ├── error.middleware.ts     # Global error handler
│   │   ├── cloudinary.middleware.ts # Image upload/multer
│   │   └── verification.middleware.ts # Email verification
│   │
│   ├── routes/                     # API route definitions
│   │   ├── index.ts                # Route aggregator
│   │   ├── auth.routes.ts          # Author auth routes
│   │   ├── blog.routes.ts          # Blog resource routes
│   │   ├── profile.routes.ts       # Profile routes
│   │   ├── subs.routes.ts          # Subscriber routes
│   │   ├── subs.auth.routes.ts     # Subs auth routes
│   │   ├── tag.routes.ts           # Tag routes
│   │   └── upload.routes.ts        # Image upload routes
│   │
│   ├── mail/                       # Email service
│   │   ├── transporter.ts          # Nodemailer setup
│   │   └── sendVerification.ts     # Verification email sender
│   │
│   ├── jobs/                       # Background jobs/cron
│   │   ├── index.ts                # Job scheduler setup
│   │   └── token.cleanup.ts        # Token expiry cleanup
│   │
│   ├── types/                      # TypeScript type definitions
│   │   └── [custom types]
│   │
│   ├── utils/                      # Utility functions
│   │   └── [helper functions]
│   │
│   ├── prisma/                     # Database
│   │   ├── schema.prisma           # Data model definition
│   │   └── migrations/             # Database migrations
│   │
│   └── generated/
│       └── prisma/                 # Auto-generated Prisma Client
│
├── tests/
│   ├── health.test.ts              # API health tests
│   ├── integration/                # Integration tests
│   └── unit/                       # Unit tests
│
├── .env.local                      # Local environment (git-ignored)
├── .env.example                    # Environment template
├── prisma.config.ts                # Prisma configuration
├── jest.config.ts                  # Jest test configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.build.json             # Build TypeScript config
├── nodemon.json                    # Nodemon watch config
├── package.json                    # Dependencies & scripts
├── package-lock.json               # Lockfile
└── README.md                       # This file
```

---

## Development

### Available Scripts

```bash
# Development
npm run dev                # Start with nodemon (watch mode)

# Building
npm run build              # Compile TypeScript to dist/
npm run prisma:generate    # Generate Prisma Client

# Running
npm start                  # Run compiled JavaScript

# Database
npm run prisma:migrate     # Run pending migrations
npm run create-views       # Create database views

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Testing
npm test                   # Run Jest tests
npm test -- --watch       # Watch mode
npm test -- --coverage    # With coverage report
```

### Development Workflow

1. **Start the dev server**
   ```bash
   npm run dev
   ```
   Server auto-reloads on file changes via nodemon

2. **Make changes**
   - Edit files in `src/`
   - Server auto-restarts

3. **Check for errors**
   ```bash
   npm run lint
   npm run format
   ```

4. **Test changes**
   ```bash
   npm test
   ```

### Database Migrations

When modifying `schema.prisma`:

```bash
# Create new migration
npm run prisma:migrate

# Name: describe the change (e.g., "add user bio field")

# Review the migration
ls src/prisma/migrations/

# Sync development database
npm run prisma:migrate dev
```

### Adding New Features

#### New Route

1. Create controller in `src/controllers/`
   ```typescript
   export const myController = async (req, res) => {
     // Logic here
   };
   ```

2. Create routes in `src/routes/`
   ```typescript
   router.post('/path', authMiddleware, myController);
   ```

3. Register in `src/routes/index.ts`
   ```typescript
   app.use('/api/resource', routes);
   ```

#### New Database Entity

1. Add model to `src/prisma/schema.prisma`
2. Create migration:
   ```bash
   npm run prisma:migrate
   ```
3. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (re-run on changes)
npm test -- --watch

# Coverage report
npm test -- --coverage

# Specific test file
npm test -- health.test.ts
```

### Test Structure

```
tests/
├── unit/                  # Unit tests
│   ├── controllers/
│   ├── middlewares/
│   └── utils/
├── integration/           # API integration tests
│   ├── auth.test.ts
│   ├── blog.test.ts
│   └── ...
└── e2e/                   # End-to-end workflows
    └── user-flow.test.ts
```

### Example Test

```typescript
import request from 'supertest';
import app from '../src/app';

describe('Health Check', () => {
  it('should return 200 OK', async () => {
    const response = await request(app)
      .get('/api/health');
    
    expect(response.status).toBe(200);
  });
});
```

---

## Security Best Practices

🔒 **Security Checklist**

- ✅ Use HTTPS in production
- ✅ Validate & sanitize all inputs (Zod)
- ✅ Hash passwords with bcrypt (10 rounds)
- ✅ Use Helmet for security headers
- ✅ Implement rate limiting
- ✅ Use httpOnly cookies for refresh tokens
- ✅ Keep dependencies updated (`npm audit`)
- ✅ Monitor logs for suspicious activity
- ✅ Use environment variables for secrets
- ✅ Enable PostgreSQL SSL connections
- ✅ Configure CORS properly
- ✅ Implement request size limits

---

## Performance Considerations

🚀 **Optimization Tips**

- Database queries: Use Prisma select/include efficiently
- Create indexes on frequently queried columns
- Paginate large result sets (blogs, comments)
- Use connection pooling for database
- Enable gzip compression (already configured)
- Implement caching for static data
- Monitor with `npm audit`
- Use Prisma Studio for query analysis: `npx prisma studio`

---

## Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets (min 32 chars, random)
- [ ] Configure PostgreSQL with backups
- [ ] Set up monitoring & error tracking
- [ ] Enable rate limiting
- [ ] Configure CORS for production origins only
- [ ] Set up CI/CD pipeline
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up logging aggregation

### Environment Setup (Production)

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://[user]:[pass]@[host]:[port]/[db]?sslmode=require
JWT_SECRET=[32+ random characters]
JWT_REFRESH_SECRET=[32+ random characters]
SESSION_SECRET=[32+ random characters]
CLIENT_URL=https://blog.yourdomain.com
CMS_URL=https://cms.yourdomain.com
```

---

## Troubleshooting

### Common Issues

**Port 3000 already in use**
```bash
# Find process on port
lsof -i :3000

# Kill process (macOS/Linux)
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Database connection refused**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists: `createdb blog_db`
- Run migrations: `npm run prisma:migrate`

**JWT token errors**
- Verify JWT_SECRET is set in .env
- Check token hasn't expired
- Verify Authorization header format

**Email not sending**
- Check EMAIL_HOST, EMAIL_PORT in .env
- Verify email credentials
- Check spam/junk folder
- Review Winston logs

**Prisma generation errors**
```bash
npm run prisma:generate -- --force
```

---

## Contributing

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-type` - Documentation
- `refactor/area` - Code refactoring

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add blog search functionality
fix: Resolve comment deletion error
docs: Update API authentication section
refactor: Extract email validation logic
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and commit with meaningful messages
3. Run tests and linting:
   ```bash
   npm run lint
   npm run format
   npm test
   ```
4. Push to remote
5. Create pull request with clear description
6. Address review feedback
7. Merge after approval

---

## Support & Resources

📚 **Documentation & Links**

- [Express.js](https://expressjs.com/) - Web framework
- [Prisma](https://www.prisma.io/docs/) - ORM documentation
- [JWT.io](https://jwt.io/) - JWT information
- [PostgreSQL](https://www.postgresql.org/docs/) - Database
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [RESTful API Design](https://restfulapi.net/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Getting Help

- Check existing issues in repository
- Review error logs and stack traces
- Enable debug logging: `DEBUG=* npm run dev`
- Check `.env.local` configuration

---

## License

This project is licensed under the ISC License. See [LICENSE](../../LICENSE) for details.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-17 | Initial production release |

---

**Last Updated:** April 17, 2026  
**Maintained By:** Development Team
