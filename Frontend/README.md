# 📱 Blog Platform Frontend - Public User Interface

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC?logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-7.14.0-F26522?logo=react-router)
![Status](https://img.shields.io/badge/Status-Production-brightgreen)

**Version:** 1.0.0  
**Last Updated:** April 17, 2026

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Pages](#pages)
- [Components](#components)
- [Routes](#routes)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [Development](#development)
- [Testing](#testing)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **Blog Platform Frontend** is a modern, responsive public-facing web application for reading and engaging with blog content. Built with React and TypeScript, it allows subscribers to:

- 📖 **Browse Blogs** - View all published blog posts
- 🔍 **Read Blog Details** - View full blog content with rich text
- 💬 **Comment** - Leave comments on blog posts
- ❤️ **Like Blogs** - Like and unlike blog posts
- 👤 **User Accounts** - Sign up, log in, and manage profiles
- ✉️ **Email Verification** - Verify email during signup
- 📱 **Responsive Design** - Seamless experience on all devices

### Key Features

✅ Fast, modern React 19 with TypeScript  
✅ Server-side rendering ready with Vite  
✅ React Query for efficient data fetching  
✅ Protected authentication routes  
✅ Rich markdown rendering for blog content  
✅ Real-time comments and likes  
✅ TailwindCSS for responsive design  
✅ MUI icons for consistent UI  
✅ Complete test setup with Vitest  
✅ Dark mode aesthetic design  

---

## Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Blog Platform API** running (Backend API)

### Setup

1. **Navigate to Frontend folder**
   ```bash
   cd Blog-Project/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   See [Environment Variables](#environment-variables) below.

4. **Start development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or port shown in terminal)

5. **Build for production**
   ```bash
   npm run build
   ```

---

## Features

### 🏠 Home Page

**Screenshot Space: [Add screenshot of home page showing hero section, welcome message, and content overview]**

- Hero section with welcome message
- Featured content highlights
- Call-to-action buttons (Browse Blogs, Sign Up)
- Navigation to blogs section
- Responsive design for all devices

### 📖 Blogs Listing Page

**Screenshot Space: [Add screenshot of blogs list showing blog cards with titles, snippets, metadata like date, likes, comments]**

- Display all published blogs
- Blog cards with:
  - Blog title
  - Author information
  - Publication date
  - Excerpt/snippet
  - Like count
  - Comment count
- Pagination or infinite scroll
- Search functionality (ready)
- Filter by tags (ready)

### 📄 Blog Detail Page

<img width="1079" height="1774" alt="image" src="https://github.com/user-attachments/assets/29011e77-a746-416a-a9a5-f3c5c794d7c5" />


- Full blog content with rich markdown rendering
  <img width="1066" height="1778" alt="image" src="https://github.com/user-attachments/assets/df982350-03ec-47e0-a4aa-4f7166a79c03" />
  <img width="1079" height="1781" alt="image" src="https://github.com/user-attachments/assets/119dc620-2f95-4277-a768-13ee4dc60151" />

- Blog metadata:
  - Title
  - Author name and avatar
  - Publication date
  - Tags
  - Featured image
- Like button (authenticated users only)
- 
  <img width="1076" height="1777" alt="image" src="https://github.com/user-attachments/assets/1f95814e-5d3b-4903-ab8f-f1f922361532" />

- Comments section:
 <img width="783" height="392" alt="image" src="https://github.com/user-attachments/assets/08aab631-9a46-4428-8ba8-757583b98749" />

  - View all comments
  - Add new comment (authenticated)
  - Comment author and timestamp
- Up/down navigation to other blogs

### 🔐 Login Page

<img width="1079" height="1781" alt="image" src="https://github.com/user-attachments/assets/ad850a26-71a6-4d7b-82de-8741a76ca60c" />

- Email input field
- Password input field
- Submit button

### 📝 Signup Page

<img width="1079" height="1781" alt="image" src="https://github.com/user-attachments/assets/0f9b7fcb-1f5f-4cb9-8f17-abc8dc4ec216" />

- First name input
- Last name input
- Email input
- Password input
- Confirm password input
- Terms and conditions checkbox
- Submit button
- Link to login page
- Form validation

### ✉️ Email Verification Page

<img width="748" height="603" alt="image" src="https://github.com/user-attachments/assets/21b35f53-bc49-4bee-af2f-28b7bfcdedc4" />

<img width="475" height="211" alt="image" src="https://github.com/user-attachments/assets/54bc93de-6317-4779-bf9f-dc37069be145" />

<img width="748" height="532" alt="image" src="https://github.com/user-attachments/assets/73722276-c244-44a6-ae2d-3614d3f02869" />

<img width="757" height="476" alt="image" src="https://github.com/user-attachments/assets/38a576c2-6e9e-4220-9b2c-581b5716d6cf" />

<img width="226" height="191" alt="image" src="https://github.com/user-attachments/assets/b5fb1995-4b8e-4e56-af96-26ffb53e3616" />


- Email verification confirmation
- Status message (success/pending/error)
- Resend verification link button (ready)
- Return to home link
- Countdown timer (ready)

---

## Installation

### System Requirements

| Requirement | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| npm | 8+ | Package manager |
| Modern Browser | Latest | Chrome, Firefox, Safari, Edge |
| API Server | Running | Backend connectivity |

### Install Steps

```bash
# 1. Navigate to project
cd Blog-Project/Frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Edit .env.local with your settings
# VITE_BACKEND_URL=http://localhost:3000/api
# VITE_NODE_ENV=development

# 5. Start development server
npm run dev
```

### Environment Variables

Create `.env.local`:

```env
# Backend API
VITE_BACKEND_URL=http://localhost:3000/api

# Environment
VITE_NODE_ENV=development
```

**Environment Template (.env.example):**

```env
VITE_BACKEND_URL=http://localhost:3000/api
VITE_NODE_ENV=development
```

---

## Project Structure

```
Frontend/
├── src/
│   ├── App.tsx                     # Main app component with routes
│   ├── App.css                     # App-level styles
│   ├── main.tsx                    # React entry point
│   ├── index.css                   # Global CSS styles
│   │
│   ├── pages/                      # Page components (route views)
│   │   ├── Home.tsx                # Landing/home page
│   │   ├── Blogs.tsx               # Blogs listing page
│   │   ├── BlogDetail.tsx          # Individual blog page
│   │   ├── Login.tsx               # Login page
│   │   ├── Signup.tsx              # Signup/registration page
│   │   └── VerifyEmail.tsx         # Email verification page
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── TopBar.tsx              # Navigation/header bar
│   │   ├── Footer.tsx              # Footer component
│   │   ├── BlogBody.tsx            # Blog content display
│   │   ├── Comments.tsx            # Comments section wrapper
│   │   ├── Comment.tsx             # Single comment component
│   │   ├── CommentBtn.tsx          # Add comment button
│   │   ├── Like.tsx                # Like button/counter
│   │   ├── LikeCommentWrapper.tsx  # Like & comment actions wrapper
│   │   ├── Markdown.tsx            # Markdown content renderer
│   │   ├── LoginRequired.tsx       # Auth-required message
│   │   ├── NameAvatar.tsx          # User avatar display
│   │   ├── Input.tsx               # Custom input component
│   │   ├── Background.tsx          # Background decoration
│   │   └── Skeletons.tsx           # Loading skeleton UI
│   │
│   ├── layouts/                    # Layout wrappers
│   │   └── MainLayout.tsx          # Main layout with header/footer
│   │
│   ├── utils/                      # Utility functions and hooks
│   │   ├── contexts.auth.tsx       # Auth context and provider
│   │   ├── hooks.tsx               # Custom React hooks
│   │   ├── helpers.ts              # Helper functions (formatting, etc)
│   │   ├── requests.auth.ts        # Auth API requests
│   │   ├── requests.blog.ts        # Blog API requests
│   │   └── query.tsx               # React Query utilities
│   │
│   ├── config/                     # Configuration
│   │   └── env.ts                  # Environment validation (Zod)
│   │
│   ├── types/                      # TypeScript type definitions
│   │   ├── blog.d.ts               # Blog types
│   │   └── setter.d.ts             # Setter/state types
│   │
│   └── assets/                     # Static assets
│       └── [images, icons, etc]
│
├── public/                         # Static files
│   └── [favicon, etc]
│
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.app.json               # App TypeScript config
├── tsconfig.node.json              # Node TypeScript config
├── vitest.config.ts                # Vitest test configuration
├── test-setup.js                   # Test setup file
├── eslint.config.js                # ESLint configuration
├── tailwind.config.ts              # TailwindCSS configuration
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

---

## Pages

### Home Page (`pages/Home.tsx`)

**Route:** `/`

**Features:**
- Hero section with platform branding
- Welcome message and tagline
- Featured sections (Minimalism, Tech, Design)
- Call-to-action buttons:
  - Browse all blogs
  - Sign up to subscribe
- Authentication status check
- Responsive design with background effects

### Blogs Page (`pages/Blogs.tsx`)

**Route:** `/blogs`

**Features:**
- Fetch all published blogs from API
- Display blogs in card format
- Each card shows:
  - Blog title
  - Author info
  - Publish date (formatted)
  - Content snippet (markdown stripped, truncated)
  - Like icon and count
  - Comment icon and count
- Loading skeleton while fetching
- Error handling
- Click to view blog detail

**Data Processing:**
- Strips markdown from content for preview
- Truncates long content to 160 characters
- Formats dates for display
- Handles loading and error states

### Blog Detail Page (`pages/BlogDetail.tsx`)

**Route:** `/blogs/:id`

**Features:**
- Fetch specific blog by ID
- Display full blog content with markdown rendering
- Show blog metadata:
  - Title
  - Author information
  - Publication date
  - Tags (if available)
  - Featured image
- Comments section:
  - View existing comments
  - Add new comment (authenticated only)
  - Comment author and timestamp
- Like button with counter
- Related blogs navigation (ready)
- Loading states
- Error handling for not found blogs

### Login Page (`pages/Login.tsx`)

**Route:** `/login`

**Features:**
- Email input field with validation
- Password input field
- Submit button
- Login error handling
- Link to signup page
- Loading state during authentication
- Redirect to home on successful login
- Form validation

**Workflow:**
1. User enters credentials
2. Click login button
3. API validation
4. JWT token storage
5. Redirect to home or previous page

### Signup Page (`pages/Signup.tsx`)

**Route:** `/signup`

**Features:**
- First name input
- Last name input
- Email input with validation
- Password input with validation
- Confirm password field
- Terms and conditions checkbox
- Submit button
- Error messages (email exists, validation errors)
- Link to login page
- Form validation
- Loading state during submission

**Workflow:**
1. User fills signup form
2. Click signup button
3. API validates and creates account
4. Pending user stored
5. Verification email sent
6. Redirect to verification page or prompt

### Email Verification Page (`pages/VerifyEmail.tsx`)

**Route:** `/api/subscribe/verify-email`

**Features:**
- Receives verification token from URL
- Validates token with API
- Shows success/error message
- Option to resend verification email (ready)
- Link back to home
- Status feedback to user

**Workflow:**
1. User clicks email verification link
2. Token extracted from URL
3. API validates token
4. Account activated
5. User can now log in

---

## Components

### Layout Components

#### TopBar
- Navigation header
- Logo/branding
- Navigation links (Home, Blogs, etc)
- Authentication links (Login/Signup or Logout)
- Mobile menu toggle (responsive)
- Sticky positioning

#### Footer
- Footer information
- Copyright notice
- Social links (ready)
- Useful links
- Contact info (ready)
- Responsive layout

#### MainLayout
- Wraps all main content pages
- Includes TopBar and Footer
- Outlet for route content
- Consistent spacing

### Content Components

#### BlogBody
- Renders full blog content
- Markdown formatting support
- Code syntax highlighting
- Image rendering
- Responsive text layout

#### Markdown
- Custom markdown renderer
- Supports:
  - Headers
  - Lists
  - Code blocks
  - Links
  - Images
  - Tables
  - Blockquotes
- Syntax highlighting for code

### Interaction Components

#### Like
- Like button with counter
- Shows like count
- Toggle like/unlike
- Requires authentication
- Visual feedback (heart icon)

#### Comments
- Comments section wrapper
- List all comments
- Pagination/infinite scroll (ready)
- Aggregate comment count

#### Comment
- Single comment display
- Author information
- Comment text
- Timestamp
- Delete option (owner only, ready)
- Edit option (owner only, ready)

#### CommentBtn
- Add comment button
- Opens comment form (ready)
- Requires authentication
- Form validation

#### LoginRequired
- Message for authenticated-only features
- Prompts to login/signup
- Link to login page

### Input Components

#### Input
- Custom input component
- Text, email, password types
- Validation support
- Error messages
- Accessible labels

### Display Components

#### NameAvatar
- User avatar display
- Shows initials or image
- Used in comments and author info
- Consistent styling

#### Background
- Decorative background elements
- Gradient blobs
- Animated effects
- Accessibility (pointer-events-none)

#### Skeletons
- Loading skeleton UI
- Skeleton card component
- Matches actual content layout
- Prevents layout shift during loading

---

## Routes

```
/                          # Home page
/blogs                     # All blogs listing
/blogs/:id                 # Blog detail page
/login                     # Login page
/signup                    # Signup page
/api/subscribe/verify-email # Email verification
```

All routes except `/login` and `/signup` are wrapped in MainLayout (header + footer).

---

## Authentication

### Context API (`utils/contexts.auth.tsx`)

Auth context provides:
- Current user information
- Authentication status
- Login function
- Signup function
- Logout function
- Loading states

### Usage

```typescript
import { useAuth } from '../utils/hooks';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return isAuthenticated ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <a href="/login">Login</a>
  );
}
```

### Token Management

- JWT access token stored after login
- Refresh token stored as httpOnly cookie
- Token included in API request headers
- Auto-logout on token expiry
- Token refresh on app load

---

## API Integration

### Custom Hooks

#### `useBlogs()`
```typescript
const { data: blogs, isLoading, error } = useBlogs();
```

#### `useBlogDetail(id)`
```typescript
const { data: blog, isLoading, error } = useBlogDetail(id);
```

#### `useAuth()`
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

### API Requests

#### Blog Requests (`utils/requests.blog.ts`)
- `fetchAllBlogs()` - GET all blogs
- `fetchBlogById(id)` - GET blog by ID
- `createComment(blogId, data)` - POST comment
- `likeUnlikeBlog(blogId)` - POST like/unlike

#### Auth Requests (`utils/requests.auth.ts`)
- `login(email, password)` - POST login
- `signup(userData)` - POST signup
- `verifyEmail(token)` - POST verify email
- `logout()` - POST logout

### API Error Handling

- Try-catch blocks around fetch requests
- Display user-friendly error messages
- Toast notifications (ready)
- Retry logic (ready)
- Network error detection

---

## Development

### Available Scripts

```bash
# Development
npm run dev                # Start dev server (http://localhost:5173)

# Building
npm run build              # Build for production (to dist/)
npm run preview            # Preview production build

# Code Quality
npm run lint               # Run ESLint
npm run lint -- --fix      # Fix linting errors

# Testing
npm test                   # Run all tests
npm test -- --watch       # Watch mode
npm test -- --coverage    # Coverage report
```

### Development Workflow

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Open in browser**
   - Navigate to `http://localhost:5173`

3. **Make changes**
   - Files auto-reload with Vite HMR (Hot Module Replacement)
   - TypeScript errors shown in terminal

4. **Check code quality**
   ```bash
   npm run lint
   ```

5. **Run tests**
   ```bash
   npm test
   ```

6. **Build for production**
   ```bash
   npm run build
   npm run preview  # Preview prod build locally
   ```

### Debugging

#### Browser DevTools
- F12 or Right-click → Inspect
- React DevTools browser extension (recommended)
- Console for debugging
- Network tab for API calls

#### Useful Patterns

```typescript
// Debug API calls
console.log('API Response:', data);

// Debug render performance
-React.memo() for expensive components
- useMemo() for expensive calculations

// Debug component state
console.log('State:', state);
```

---

## Testing

### Test Setup

- Vitest for unit/integration tests
- React Testing Library for component tests
- jsdom for DOM testing
- @testing-library/user-event for user interactions

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# Specific file
npm test -- Home.test.tsx
```

### Test Example

```typescript
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home Page', () => {
  it('should render welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });
});
```

---

## Styling

### TailwindCSS

Utility-first CSS framework:

```typescript
<div className="bg-blue-500 text-white p-4 rounded-lg">
  Styled with Tailwind
</div>
```

### MUI Icons

Material UI icon library:

```typescript
import { FavoriteBorder, Comment } from '@mui/icons-material';

<FavoriteBorder /> {/* Like icon */}
<Comment />        {/* Comment icon */}
```

### Custom CSS

CSS modules and global styles:

```typescript
import './App.css';  // Global styles
import styles from './App.module.css';  // Module styles

<div className={styles.container}>Content</div>
```

### Design System

- **Colors**: Dark theme with zink/gray palette
- **Typography**: Modern sans-serif
- **Spacing**: Consistent padding/margin scale
- **Breakpoints**: Mobile-first responsive design

---

## Performance

### Optimization Techniques Used

1. **React Query** - Caching and deduplication of API requests
2. **Code Splitting** - Lazy load route components (ready)
3. **Image Optimization** - Lazy loading images
4. **Memoization** - memo() for expensive components
5. **Vite** - Fast development and optimized production builds
6. **Compression** - Gzip compression in production

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| IE 11 | N/A | ❌ Not supported |

---

## Contributing

### Guidelines

1. **Branch naming**: `feature/name` or `fix/description`
2. **Commits**: Use conventional commits
   ```
   feat: Add blog search
   fix: Resolve comment bug
   docs: Update README
   ```
3. **Code style**: Follow ESLint rules
4. **Testing**: Write tests for new features
5. **Documentation**: Update README if needed

### Pull Request Process

1. Create feature branch
2. Make changes
3. Run checks:
   ```bash
   npm run lint
   npm run lint -- --fix
   npm test
   ```
4. Push to remote
5. Create pull request
6. Address feedback
7. Merge after approval

---

## Troubleshooting

### Common Issues

**Port already in use**
```bash
# macOS/Linux
lsof -i :5173 | xargs kill -9

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**API connection errors**
- Verify backend API running: `http://localhost:3000`
- Check `VITE_BACKEND_URL` in `.env.local`
- Check browser network tab
- Check CORS settings on backend

**Login not working**
- Verify API is running
- Check credentials
- Check browser console for errors
- Verify JWT token in localStorage

**Styles not loading**
- Restart dev server
- Clear browser cache
- Rebuild: `npm run build`

**TypeScript errors**
```bash
npx tsc --noEmit
npm install --save-dev typescript
```

---

## Support & Resources

📚 **Documentation**

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest)
- [React Testing Library](https://testing-library.com/)

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
