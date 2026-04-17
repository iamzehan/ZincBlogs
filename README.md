# <img src="./Frontend/public/icon2.png" alt="ZincBlogs Logo" width="40" height="40" style="vertical-align: middle;"> ZincBlogs - Production-Grade Blogging Platform

<div align="center">

**A complete, enterprise-ready blogging platform with CMS, API, and modern frontend**

[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.2.0-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[![Status](https://img.shields.io/badge/Status-Production-brightgreen)](https://github.com/iamzehan/ZincBlogs)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue)](./LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Cross--Platform-blueviolet)]()

</div>

**ZincBlogs Version:** 1.0.0  
**Project ID:** ZincBlogs  
**Repository:** [iamzehan/ZincBlogs](https://github.com/iamzehan/ZincBlogs)  
**Last Updated:** April 17, 2026

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture & Structure](#architecture--structure)
- [Technology Stack](#technology-stack)
- [Core Features](#core-features)
- [Project Setup](#project-setup)
- [Coding Standards & Best Practices](#coding-standards--best-practices)
- [Development Workflow](#development-workflow)
- [Directory Structure](#directory-structure)
- [Individual Component Documentation](#individual-component-documentation)
- [Technology Credits](#technology-credits)
- [Room for Improvements](#room-for-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

**ZincBlogs** is a production-grade, full-stack blogging platform designed to provide a complete content management solution. It combines a robust backend API, a powerful CMS dashboard for administrators, and a beautiful public-facing frontend for readers.

The platform enables:

- ✍️ **Content Creation & Management** - Authors can write and publish blog posts
- 👥 **User Management** - Comprehensive authentication and profile management
- 💬 **Community Engagement** - Commenting and liking system for interaction
- 📊 **Administration** - Full CMS dashboard for content and subscriber management
- 🔐 **Security** - JWT-based authentication, email verification, and role-based access control
- ☁️ **Cloud Integration** - Cloudinary for scalable image management

---

## 🏗️ Architecture & Structure

The project follows a **three-tier architecture** pattern:

```
Blog-Project/
├── Backend/
│   ├── API/              (Express.js REST API - Core backend service)
│   └── CMS/              (React administration dashboard)
└── Frontend/             (Public-facing React application)
```

### Tier 1: Backend API (`/Backend/API`)

The core RESTful API service built with Express.js and TypeScript, powering ZincBlogs.

**Key Responsibilities:**
- User authentication and authorization
- Blog content management
- Comment and like system
- Email verification and notifications
- Media upload handling via Cloudinary
- Database operations with Prisma ORM
- Background job processing (cleanup tasks)

**Technology:** Node.js, Express, TypeScript, Prisma, PostgreSQL, JWT, Cloudinary

📖 [View API Documentation](./Backend/API/README.md)

---

### Tier 2: CMS Dashboard (`/Backend/CMS`)

Admin dashboard for ZincBlogs content creators and platform administrators.

**Key Responsibilities:**
- Blog post creation and management
- Media library management
- Subscriber management and analytics
- Dashboard metrics and analytics
- Secure admin authentication

**Technology:** React 19, TypeScript, Vite, TailwindCSS, Material UI, React Query

📖 [View CMS Documentation](./Backend/CMS/README.md)

---

### Tier 3: Frontend Application (`/Frontend`)

Public-facing web application for ZincBlogs readers and content consumers.

**Key Responsibilities:**
- Blog discovery and reading
- User authentication (signup/login)
- Comment and interaction features
- Responsive design for all devices
- User profile management

**Technology:** React 19, TypeScript, Vite, TailwindCSS, React Router, React Query

📖 [View Frontend Documentation](./Frontend/README.md)

---

## 🛠️ Technology Stack

### Backend Technologies

| Technology | Version | Logo | Purpose |
|-----------|---------|------|---------|
| **Node.js** | 20+ | [![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/) | JavaScript runtime |
| **Express.js** | 5.2.1 | [![Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)](https://expressjs.com/) | Web framework |
| **TypeScript** | 5.9.3 | [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | Type-safe development |
| **Prisma ORM** | 7.2.0 | [![Prisma](https://img.shields.io/badge/Prisma-7.2.0-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/) | Database toolkit & ORM |
| **PostgreSQL** | Latest | [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/) | Relational database |
| **JWT** | 9.0.3 | [![JWT](https://img.shields.io/badge/JWT-9.0.3-000000?logo=json-web-tokens&logoColor=white)](https://jwt.io/) | Secure authentication |
| **Cloudinary** | 2.9.0 | [![Cloudinary](https://img.shields.io/badge/Cloudinary-2.9.0-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/) | Cloud media management |
| **Nodemailer** | 7.0.12 | [![Nodemailer](https://img.shields.io/badge/Nodemailer-7.0.12-00A4EF?logo=mailtrap&logoColor=white)](https://nodemailer.com/) | Email notifications |
| **node-cron** | 4.2.1 | [![node-cron](https://img.shields.io/badge/node--cron-4.2.1-2DA620?logo=npm&logoColor=white)](https://www.npmjs.com/package/node-cron) | Job scheduling |
| **Helmet** | 8.1.0 | [![Helmet](https://img.shields.io/badge/Helmet-8.1.0-3D5E74?logo=npm&logoColor=white)](https://helmetjs.github.io/) | Security headers |
| **Morgan** | 1.10.1 | [![Morgan](https://img.shields.io/badge/Morgan-1.10.1-E8E8E8?logo=npm&logoColor=black)](https://www.npmjs.com/package/morgan) | HTTP logging |
| **Zod** | 4.3.5 | [![Zod](https://img.shields.io/badge/Zod-4.3.5-3068B7?logo=npm&logoColor=white)](https://zod.dev/) | Schema validation |
| **Jest** | Latest | [![Jest](https://img.shields.io/badge/Jest-Latest-C63D14?logo=jest&logoColor=white)](https://jestjs.io/) | Testing framework |

### Frontend Technologies

| Technology | Version | Logo | Purpose |
|-----------|---------|------|---------|
| **React** | 19.2.0 | [![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/) | UI framework |
| **TypeScript** | 5.9.3 | [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | Type-safe development |
| **Vite** | 7.2.4 | [![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) | Build tool & dev server |
| **TailwindCSS** | 4.1.17 | [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) | Utility-first CSS |
| **Material UI** | 7.3.7 | [![MUI](https://img.shields.io/badge/MUI-7.3.7-007FFF?logo=mui&logoColor=white)](https://mui.com/) | Component library |
| **React Router** | 7.13-7.14 | [![React Router](https://img.shields.io/badge/React%20Router-7.14-F26522?logo=reactrouter&logoColor=white)](https://reactrouter.com/) | Client-side routing |
| **React Query** | 5.x | [![React Query](https://img.shields.io/badge/React%20Query-5.x-FF4154?logo=react-query&logoColor=white)](https://tanstack.com/query/) | Server state management |
| **Vitest** | 4.0.13 | [![Vitest](https://img.shields.io/badge/Vitest-4.0.13-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/) | Unit testing |
| **React Markdown** | 10.1.0 | [![React Markdown](https://img.shields.io/badge/React%20Markdown-10.1.0-083FA1?logo=markdown&logoColor=white)](https://github.com/remarkjs/react-markdown) | Markdown rendering |
| **Zod** | 4.3.6 | [![Zod](https://img.shields.io/badge/Zod-4.3.6-3068B7?logo=npm&logoColor=white)](https://zod.dev/) | Schema validation |

### Shared Technologies

- **TypeScript 5.9.3** - Strict mode enabled across all projects
- **ESLint** - Code quality and consistency
- **Prettier** - Automatic code formatting
- **Vite** - Modern build tooling (Frontend & CMS)
- **Zod** - Runtime schema validation

---

## ✨ Core Features

### 🔐 Authentication & Authorization
- JWT-based stateless authentication
- Email verification workflow
- Secure password hashing with bcrypt
- Session management with PostgreSQL store
- Role-based access control (RBAC)
- HTTP-only cookies for enhanced security

### 📝 Content Management
- Rich blog post creation and editing
- Draft and publish workflow
- Tag-based content organization
- Full-text search capabilities
- Markdown support with syntax highlighting
- Media integration with Cloudinary

### 💬 Community Features
- Nested commenting system
- Like/unlike functionality
- Real-time notification support
- Subscriber management

### 📱 User Experience
- Responsive design for all screen sizes
- Fast loading with optimized bundles
- Dark mode aesthetic design
- Accessible UI components
- Smooth animations and transitions

### 🔒 Security
- CORS protection with configurable origins
- Helmet.js for security headers
- Input validation with Zod
- SQL injection prevention via Prisma
- CSRF protection via session tokens
- Rate limiting ready architecture

### 📊 Administration
- Comprehensive dashboard metrics
- Subscriber analytics
- Content performance tracking
- Admin-only routes and views

---

## 🚀 Project Setup

### Prerequisites

- **Node.js** v20 or higher
- **npm** or **yarn** package manager
- **PostgreSQL** 12 or higher
- **Git** for version control
- **Docker** (optional, for containerization)

### Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/iamzehan/ZincBlogs.git
cd Blog-Project
```

#### 2. Backend API Setup

```bash
cd Backend/API

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run dev
```

The API will be available at `http://localhost:3000`

#### 3. CMS Dashboard Setup

```bash
cd Backend/CMS

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

The CMS will be available at `http://localhost:5174`

#### 4. Frontend Setup

```bash
cd Frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

The Frontend will be available at `http://localhost:5173`

### Environment Configuration

Each component requires environment variables. See individual README files for specific configurations:
- [API Environment Setup](./Backend/API/README.md#environment-variables)
- [CMS Environment Setup](./Backend/CMS/README.md#environment-variables)
- [Frontend Environment Setup](./Frontend/README.md#environment-variables)

---

## 📋 Coding Standards & Best Practices

### 1. **TypeScript Strict Mode**

All projects are configured with TypeScript strict mode enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

This ensures:
- Type safety across all codebase
- Reduced runtime errors
- Better IDE support and autocomplete
- Easier code refactoring

### 2. **Code Quality & Linting**

- **ESLint** - Enforces consistent code style
- **Prettier** - Automatic code formatting

```bash
# Lint code
npm run lint

# Format code
npm run format
```

### 3. **Module System**

All projects use **ES Modules** (ESM):
- `"type": "module"` in package.json
- Modern import/export syntax
- Better tree-shaking and bundle optimization

### 4. **File Naming Conventions**

- **Components/Controllers**: `PascalCase` (e.g., `BlogController.ts`)
- **Services/Utilities**: `camelCase` (e.g., `emailService.ts`)
- **Types/Interfaces**: `PascalCase` with `.d.ts` extension (e.g., `blog.d.ts`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`)

### 5. **Folder Structure Organization**

#### Backend API Structure
```
Backend/API/src/
├── config/          (Configuration files)
├── controllers/     (Request handlers)
├── middlewares/     (Express middlewares)
├── routes/          (API route definitions)
├── services/        (Business logic)
├── types/           (TypeScript definitions)
├── utils/           (Utility functions)
├── mail/            (Email services)
├── jobs/            (Background jobs)
└── prisma/          (Database schema & migrations)
```

#### Frontend/CMS Structure
```
src/
├── components/      (Reusable UI components)
├── pages/           (Page-level components)
├── layouts/         (Layout wrappers)
├── hooks/           (Custom React hooks)
├── utils/           (Helper functions)
├── types/           (TypeScript definitions)
├── config/          (Configuration)
└── assets/          (Static assets)
```

### 6. **Error Handling**

- Centralized error middleware
- Custom error classes
- Comprehensive error messages
- Proper HTTP status codes

```typescript
// Example: Consistent error handling
try {
  // Business logic
} catch (error) {
  next(error); // Pass to error middleware
}
```

### 7. **Validation**

- **Zod** for schema validation
- Input validation on all API endpoints
- Form validation in frontend
- Type-safe validation with TypeScript

### 8. **Testing**

- **Jest** for backend unit tests
- **Vitest** for frontend unit tests
- Test files colocated with source code
- Aim for >70% code coverage

```bash
npm run test          # Run tests
npm run test --watch  # Watch mode
```

### 9. **Database Standards**

- **Prisma ORM** for type-safe database access
- Migrations tracked in version control
- Schema versioning and audit trails
- Connection pooling for performance

### 10. **Security Best Practices**

- Environment variables for sensitive data
- No secrets in version control (.gitignore)
- HTTPS in production
- Secure cookie settings (HttpOnly, Secure, SameSite)
- Input sanitization and validation
- SQL injection prevention
- XSS protection with proper escaping

---

## 💻 Development Workflow

### For Backend API

```bash
cd Backend/API

# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run tests
npm run test

# Database operations
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio   # Launch Prisma Studio
```

### For CMS Dashboard

```bash
cd Backend/CMS

# Development
npm run dev

# Build for production
npm run build

# Testing
npm run test

# Linting
npm run lint
```

### For Frontend

```bash
cd Frontend

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Testing
npm run test

# Linting
npm run lint
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: describe your changes"

# Push to remote
git push origin feature/your-feature-name

# Create pull request and await review
```

---

## 📁 Directory Structure

```
Blog-Project/
│
├── Backend/
│   ├── API/
│   │   ├── src/
│   │   │   ├── app.ts              (Express app setup)
│   │   │   ├── server.ts           (Server entry point)
│   │   │   ├── config/             (Configuration files)
│   │   │   ├── controllers/        (Route handlers)
│   │   │   ├── middlewares/        (Custom middlewares)
│   │   │   ├── routes/             (API routes)
│   │   │   ├── services/           (Business logic)
│   │   │   ├── types/              (TypeScript types)
│   │   │   ├── utils/              (Utilities)
│   │   │   ├── mail/               (Email services)
│   │   │   ├── jobs/               (Background jobs)
│   │   │   └── prisma/             (Database schema)
│   │   ├── tests/                  (Unit tests)
│   │   ├── jest.config.ts          (Jest configuration)
│   │   ├── tsconfig.json           (TypeScript config)
│   │   ├── nodemon.json            (Nodemon config)
│   │   ├── package.json            (Dependencies)
│   │   └── README.md               (API documentation)
│   │
│   └── CMS/
│       ├── src/
│       │   ├── components/         (Reusable components)
│       │   ├── pages/              (Page components)
│       │   ├── layouts/            (Layout components)
│       │   ├── hooks/              (Custom hooks)
│       │   ├── utils/              (Helper utilities)
│       │   ├── types/              (TypeScript types)
│       │   ├── config/             (Configuration)
│       │   ├── assets/             (Static assets)
│       │   ├── App.tsx             (Root component)
│       │   └── main.tsx            (Entry point)
│       ├── vite.config.ts          (Vite configuration)
│       ├── tsconfig.json           (TypeScript config)
│       ├── package.json            (Dependencies)
│       └── README.md               (CMS documentation)
│
├── Frontend/
│   ├── src/
│   │   ├── components/             (Reusable components)
│   │   ├── pages/                  (Page components)
│   │   ├── layouts/                (Layout components)
│   │   ├── hooks/                  (Custom hooks)
│   │   ├── utils/                  (Helper utilities)
│   │   ├── types/                  (TypeScript types)
│   │   ├── config/                 (Configuration)
│   │   ├── assets/                 (Static assets)
│   │   ├── App.tsx                 (Root component)
│   │   └── main.tsx                (Entry point)
│   ├── public/                     (Public assets)
│   ├── vite.config.ts              (Vite configuration)
│   ├── tsconfig.json               (TypeScript config)
│   ├── package.json                (Dependencies)
│   └── README.md                   (Frontend documentation)
│
├── .git/                           (Git repository)
├── LICENSE                         (ISC License)
└── README.md                       (This file)
```

---

## 📚 Individual Component Documentation

For detailed information about each component, refer to their individual documentation:

### Backend API
- **Full API Documentation**: [Backend/API/README.md](./Backend/API/README.md)
- **Includes**: Quick Start, Installation, Architecture, API Endpoints, Authentication, Database Schema, Testing, Contributing

### CMS Dashboard
- **Full CMS Documentation**: [Backend/CMS/README.md](./Backend/CMS/README.md)
- **Includes**: Quick Start, Installation, Project Structure, Components, Pages, API Integration, State Management

### Frontend Application
- **Full Frontend Documentation**: [Frontend/README.md](./Frontend/README.md)
- **Includes**: Quick Start, Installation, Project Structure, Pages, Components, Routes, Authentication

---

## 🙏 Technology Credits

This project leverages exceptional open-source technologies and their communities:

### Backend
- **[Express.js](https://expressjs.com/)** - Minimal and flexible Node.js web application framework
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Powerful, open-source relational database
- **[JWT](https://jwt.io/)** - JSON Web Tokens for secure authentication
- **[Cloudinary](https://cloudinary.com/)** - Cloud-based image and video management
- **[Helmet.js](https://helmetjs.github.io/)** - Security middleware for Express
- **[Morgan](https://www.npmjs.com/package/morgan)** - HTTP request logger
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Jest](https://jestjs.io/)** - JavaScript testing framework

### Frontend
- **[React](https://react.dev/)** - JavaScript library for building user interfaces
- **[Vite](https://vitejs.dev/)** - Next-generation frontend build tool
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Material UI (MUI)](https://mui.com/)** - React components library
- **[React Router](https://reactrouter.com/)** - Declarative routing for React
- **[React Query](https://tanstack.com/query/)** - Server state management library
- **[Vitest](https://vitest.dev/)** - Unit testing framework for Vite
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown component

### Development Tools
- **[ESLint](https://eslint.org/)** - JavaScript linting utility
- **[Prettier](https://prettier.io/)** - Code formatter
- **[Nodemon](https://nodemon.io/)** - Development file watcher
- **[Rimraf](https://www.npmjs.com/package/rimraf)** - Cross-platform rm command
- **[TSX](https://tsx.is/)** - TypeScript execution runtime

---

## 🚧 Room for Improvements

### Immediate Priorities

1. **API Documentation**
   - [ ] Implement Swagger/OpenAPI documentation
   - [ ] Add API endpoint examples and response schemas
   - [ ] Generate auto-documentation from code

2. **Testing Coverage**
   - [ ] Increase backend unit test coverage to >80%
   - [ ] Add integration tests for API endpoints
   - [ ] Implement E2E tests for critical workflows
   - [ ] Add component tests for React applications

3. **Performance Optimization**
   - [ ] Implement caching strategy (Redis)
   - [ ] Add database query optimization and indexing
   - [ ] Implement pagination for large datasets
   - [ ] Lazy loading for images and components
   - [ ] Bundle size optimization

4. **Monitoring & Observability**
   - [ ] Implement structured logging (Winston/Pino)
   - [ ] Add error tracking (Sentry integration)
   - [ ] Performance monitoring and metrics
   - [ ] API response time analytics

### Medium-term Enhancements

5. **Search & Analytics**
   - [ ] Full-text search implementation
   - [ ] Blog content search indexing (Elasticsearch)
   - [ ] User activity analytics dashboard
   - [ ] Content engagement metrics

6. **Advanced Features**
   - [ ] Blog series and collections
   - [ ] Social media sharing integration
   - [ ] Reading time estimation
   - [ ] Table of contents generation
   - [ ] Author follow/notification system
   - [ ] Comment moderation tools
   - [ ] Multi-language support (i18n)

7. **Developer Experience**
   - [ ] Docker & Docker Compose setup
   - [ ] Development environment automation
   - [ ] Pre-commit hooks for linting
   - [ ] API client code generation
   - [ ] Database seeding scripts

8. **Deployment & Infrastructure**
   - [ ] CI/CD pipeline setup (GitHub Actions)
   - [ ] Automated testing on PR
   - [ ] Docker containerization
   - [ ] Kubernetes deployment specs
   - [ ] Environment-specific configurations
   - [ ] Database backup strategies

### Long-term Vision

9. **Scalability**
   - [ ] Microservices architecture consideration
   - [ ] Database sharding for large datasets
   - [ ] Event-driven architecture
   - [ ] Message queue implementation (RabbitMQ/Kafka)

10. **Mobile & Progressive Web App**
    - [ ] React Native mobile app
    - [ ] PWA implementation
    - [ ] Offline-first capabilities

11. **Content Enhancement**
    - [ ] Video upload and streaming
    - [ ] Audio/podcast support
    - [ ] Code snippet highlighting enhancements
    - [ ] Interactive content support

12. **Community Features**
    - [ ] Collaboration between authors
    - [ ] Content versioning and history
    - [ ] Peer-review workflow
    - [ ] Badge and achievement system

---

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

1. **Fork the Repository** - Create your own fork
2. **Create a Feature Branch** - `git checkout -b feature/AmazingFeature`
3. **Make Your Changes** - Follow coding standards
4. **Commit with Clear Messages** - `git commit -m 'Add AmazingFeature'`
5. **Push to Branch** - `git push origin feature/AmazingFeature`
6. **Open a Pull Request** - Describe your changes in detail

### Contribution Areas
- Bug fixes and improvements
- Documentation enhancements
- Feature implementations
- Performance optimizations
- Testing improvements

---

## 📄 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](./LICENSE) file for details.

```
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

## 📞 Support & Contact

For questions, issues, or suggestions:
- Open an issueApache 2.0 GitHub
- Check existing documentation in component README files
- Review the technologies' official documentation

---

## 🎉 ZincBlogs Statistics

- **Total Components**: 3 major applications (API, CMS, Frontend)
- **Technology Stack**: 20+ production-grade libraries
- **Code Language**: TypeScript (100% type-safe)
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest & Vitest
- **Build Tools**: Vite & TypeScript Compiler
- **License**: Apache 2.0 (Open Source)
- **Status**: Production Ready ✅

---

<div align="center">

## 🌟 ZincBlogs

**Enterprise-Grade Blogging Platform Built with Modern Technologies**

<img src="./Frontend/public/icon2.png" alt="ZincBlogs Logo" width="80" height="80">

### Empowering Content Creators and Readers

[🚀 Get Started](#project-setup) • [📚 Documentation](#individual-component-documentation) • [🤝 Contribute](#contributing) • [GitHub Repository](https://github.com/iamzehan/ZincBlogs)

---

**Made with ❤️ by [iamzehan](https://github.com/iamzehan)**

Copyright © 2026 ZincBlogs. Licensed under Apache License 2.0.

[⬆ Back to Top](#-zincblogs---production-grade-blogging-platform)

</div>
