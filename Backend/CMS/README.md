# 📊 Blog Platform CMS - Content Management System

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC?logo=tailwindcss)
![MUI](https://img.shields.io/badge/MUI-7.3.7-007FFF?logo=mui)
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
- [User Interface](#user-interface)
- [Components](#components)
- [Pages & Workflows](#pages--workflows)
- [Development](#development)
- [Testing](#testing)
- [Styling & Theming](#styling--theming)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **Blog Platform CMS** is a production-ready, feature-rich admin dashboard for managing blog content, media, and user subscriptions. Built with modern React and TypeScript, it provides an intuitive interface for content creators and administrators to:

- ✍️ **Create & Manage Blogs** - Write, edit, publish, and manage blog posts
- 📺 **Media Library** - Upload and organize images and media files
- 👥 **Subscriber Management** - View and manage platform subscribers
- 🔐 **Secure Authentication** - Protected routes with JWT-based auth
- 📱 **Responsive Design** - Works seamlessly on desktop and tablet
- ⚡ **Real-time Updates** - Live data synchronization with backend API

### Key Features

✅ Rich text editing for blog creation  
✅ Drag-and-drop image uploads  
✅ Publish/unpublish blog management  
✅ Subscriber list with filtering  
✅ Media library with preview  
✅ Fast, responsive UI with Vite  
✅ Type-safe React with TypeScript  
✅ Material UI + TailwindCSS components  
✅ React Router navigation  
✅ React Query for data fetching  
✅ Complete test coverage setup  

---

## Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Blog Platform API** running (Backend API)

### Setup

1. **Navigate to CMS folder**
   ```bash
   cd Blog-Project/Backend/CMS
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

   The CMS will be available at `http://localhost:5174` (or port shown in terminal)

5. **Build for production**
   ```bash
   npm run build
   ```

---

## Features

### 📝 Blog Management

- **Create Blogs** - Write with rich text editor, add images, set tags
- **Edit Drafts** - Modify unpublished blog posts
- **Publish/Unpublish** - Control blog visibility
- **View Analytics** - See blog statistics (ready for integration)
- **Batch Operations** - Delete multiple blogs at once
- **Auto-save** - Prevent loss of work with draft saving

### 🎨 Media Library

**Screenshot Space: [Add screenshot of Media Library interface showing image grid, upload button, filters]**

- **Upload Images** - Drag-and-drop or click to upload
- **Image Preview** - View images before using
- **Organized Grid** - Browse media in thumbnail view
- **Search & Filter** - Find images quickly
- **Cloudinary Integration** - Cloud-based storage

### 👥 Subscriber Management

**Screenshot Space: [Add screenshot of Subscribers table showing columns, sorting, pagination]**

- **View All Subscribers** - See complete subscriber list
- **Search Subscribers** - Filter by email or name
- **Sort by Column** - Name, email, join date
- **Export Data** - Download subscriber list (ready for integration)
- **Analytics** - Subscription trends

### 🔐 Authentication

- **Secure Login** - Email and password authentication
- **JWT Tokens** - Secure session management
- **Protected Routes** - Only authenticated users access CMS
- **Auto-redirect** - Unauthenticated users sent to login
- **Session Persistence** - Stay logged in across page refreshes

### 📊 Dashboard

**Screenshot Space: [Add screenshot of main dashboard showing stats, recent blogs, quick actions]**

Statistics available:
- Total blogs published
- Total subscribers
- Recent activity
- Quick action buttons

---

## Installation

### System Requirements

| Requirement | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| npm | 8+ | Package manager |
| Modern Browser | Latest | Chrome, Firefox, Safari, Edge |
| API Server | Running | Backend connectivity |

### Installation Steps

```bash
# 1. Clone and navigate
git clone <repository-url>
cd Blog-Project/Backend/CMS

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Update environment variables
# Edit .env.local with your settings

# 5. Start development
npm run dev
```

### Environment Variables

Create `.env.local` in the CMS root:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Environment
VITE_ENV=development

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id

# Feature Flags (optional)
VITE_ENABLE_MEDIA_LIBRARY=true
VITE_ENABLE_SUBSCRIBERS=true
```

---

## Project Structure

```
Backend/CMS/
├── src/
│   ├── App.tsx                     # Main app component with routes
│   ├── App.css                     # App-level styles
│   ├── main.tsx                    # React root entry point
│   ├── index.css                   # Global styles
│   │
│   ├── pages/                      # Page components (route views)
│   │   ├── Login.tsx               # Login page
│   │   ├── Blogs.tsx               # Blogs listing page
│   │   ├── Blog.tsx                # Blog detail view
│   │   ├── CreateBlog.tsx          # Create/edit blog page
│   │   ├── Subscribers.tsx         # Subscribers management
│   │   └── MediaLibrary.tsx        # Media library/gallery
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── BlogForms/              # Blog editing forms
│   │   │   ├── CreateForm.tsx
│   │   │   ├── EditForm.tsx
│   │   │   └── FieldsValidator.ts
│   │   ├── Sidebar.tsx             # Navigation sidebar
│   │   ├── Topbar.tsx              # Header/top navigation
│   │   ├── BlogsTable.tsx          # Blogs data table
│   │   ├── SubscribersTable.tsx    # Subscribers data table
│   │   ├── ImageGrid.tsx           # Media grid display
│   │   ├── UploadModal.tsx         # Image upload modal
│   │   ├── AutoSuggest.tsx         # Auto-complete component
│   │   ├── Buttons.tsx             # Custom button components
│   │   ├── Image.tsx               # Image component wrapper
│   │   ├── Brand.tsx               # Branding component
│   │   ├── PublishPills.tsx        # Publish status indicators
│   │   └── skeletons.tsx           # Loading skeleton UI
│   │
│   ├── layouts/                    # Layout wrappers
│   │   └── MainLayout.tsx          # Main authenticated layout
│   │
│   ├── utils/                      # Utility functions and hooks
│   │   ├── contexts.auth.tsx       # Auth context and provider
│   │   ├── protected.tsx           # Protected route component
│   │   ├── redirect.auth.tsx       # Auth redirect logic
│   │   ├── redirect.blog.tsx       # Blog redirect logic
│   │   └── hooks.tsx               # Custom React hooks
│   │
│   ├── config/                     # Configuration
│   │   └── env.ts                  # Environment config
│   │
│   ├── types/                      # TypeScript type definitions
│   │   └── [type definitions]
│   │
│   └── assets/                     # Static assets
│       ├── icons/
│       ├── images/
│       └── fonts/
│
├── public/                         # Static files
│   └── [favicon, etc]
│
├── tests/                          # Test files
│   └── [test specs]
│
├── .env.local                      # Local environment (git-ignored)
├── .env.example                    # Environment template
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.app.json               # App TypeScript config
├── tsconfig.node.json              # Node TypeScript config
├── vitest.config.ts                # Vitest configuration
├── test-setup.js                   # Test setup file
├── eslint.config.js                # ESLint configuration
├── tailwind.config.ts              # TailwindCSS configuration
├── package.json                    # Dependencies & scripts
└── README.md                       # This file
```

---

## User Interface

### Dashboard Layout

**Screenshot Space: [Add screenshot of main CMS dashboard/home page showing overall layout, sidebar, topbar, main content area]**

The CMS follows a standard admin dashboard layout:

```
┌─────────────────────────────────────────┐
│         Header / Top Bar              │
│  (Logo, User Profile, Logout)         │
├──────────────┬──────────────────────────┤
│              │                          │
│  Sidebar     │   Main Content Area      │
│  Navigation  │                          │
│              │                          │
│  • Blogs     │   Dynamic Content        │
│  • Media     │   Based on Route         │
│  • Subs      │                          │
│              │                          │
└──────────────┴──────────────────────────┘
```

### Color Scheme

- **Primary**: Blue (#007FFF - MUI default)
- **Secondary**: Gray (#666, #999)
- **Success**: Green (#4caf50)
- **Warning**: Orange (#ff9800)
- **Error**: Red (#f44336)
- **Background**: Light gray/white
- **Text**: Dark gray/black

### Responsive Breakpoints

| Breakpoint | Width | Device |
|------------|-------|--------|
| xs | < 600px | Mobile |
| sm | 600px | Tablet (small) |
| md | 960px | Tablet (large) |
| lg | 1280px | Desktop |
| xl | 1920px | Desktop (large) |

---

## Components

### Component Tree

```
App
├── AuthProvider (Context)
├── Routes
│   ├── Login (public)
│   ├── RedirectAuth (public)
│   └── MainLayout (protected)
│       ├── Sidebar
│       ├── Topbar
│       ├── Blogs
│       │   ├── BlogsTable
│       │   └── Buttons
│       ├── CreateBlog
│       │   └── BlogForm
│       │       ├── RichTextEditor
│       │       ├── ImageUpload
│       │       └── TagInput
│       ├── Blog (Detail)
│       │   ├── BlogContent
│       │   ├── Image
│       │   └── PublishPills
│       ├── MediaLibrary
│       │   ├── ImageGrid
│       │   └── UploadModal
│       └── Subscribers
│           └── SubscribersTable
```

### Reusable Components

#### Button Components
```typescript
<PrimaryButton>Save Blog</PrimaryButton>
<SecondaryButton>Cancel</SecondaryButton>
<DangerButton>Delete</DangerButton>
<LoadingButton isLoading={loading}>Upload</LoadingButton>
```

#### Input Components
```typescript
<TextInput 
  label="Blog Title"
  value={title}
  onChange={setTitle}
  error={titleError}
/>

<RichTextEditor
  value={content}
  onChange={setContent}
/>
```

#### Data Display
```typescript
<BlogsTable 
  blogs={blogs}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

<ImageGrid 
  images={media}
  onSelect={handleSelect}
/>
```

### Component Best Practices

- ✅ Use functional components with hooks
- ✅ Implement proper TypeScript typing
- ✅ Memoize expensive components
- ✅ Handle loading and error states
- ✅ Provide accessibility (a11y) attributes
- ✅ Include prop validation (PropTypes/TypeScript)
- ✅ Compose larger components from smaller ones

---

## Pages & Workflows

### 🔐 Login Page

**Screenshot Space: [Add screenshot of login form showing email/password fields, submit button, remember me checkbox]**

**Workflow:**
1. User enters email and password
2. Click "Login" button
3. Credentials sent to API
4. JWT token received
5. Redirected to blogs dashboard
6. Token stored in context/localStorage

**Features:**
- Email validation
- Password strength indicator (optional)
- Remember me toggle
- Error messages display
- Loading state with spinner

### 📝 Blogs Management

**Screenshot Space: [Add screenshot of blogs listing page showing table with blog titles, status, dates, action buttons]**

#### Blogs Listing
- View all blogs in table format
- Columns: Title, Author, Status, Date Created, Actions
- Sort by any column
- Filter by publish status
- Search blogs by title
- Pagination (e.g., 10 per page)
- Bulk select and delete
- Quick actions (Edit, Delete, Preview)

#### Create Blog

**Screenshot Space: [Add screenshot of create blog form showing title input, rich text editor, tags, publish button]**

**Form Fields:**
1. **Title** - Blog post title (required, max 200 chars)
2. **Content** - Rich text editor with formatting
3. **Tags** - Autocomplete tag selection
4. **Featured Image** - Image upload
5. **Meta Description** - SEO description (optional)
6. **Status** - Draft or Published

**Workflow:**
1. Fill in blog form
2. **Save as Draft** - Saves without publishing
3. **Preview** - See how blog will look
4. **Publish** - Makes blog visible to subscribers
5. **Auto-save** - Periodic auto-saves during editing

**Features:**
- Form validation
- Auto-save every 2 minutes
- Unsaved changes warning
- Image drag-and-drop
- Tag suggestions
- Word count display

#### Blog Detail

**Screenshot Space: [Add screenshot of blog detail/view page showing full blog content, publish status, edit/delete buttons]**

- View full blog content
- See publish status
- View creation/update dates
- Edit blog button
- Delete blog button
- View comments (if applicable)
- Share options (ready for integration)

### 🎨 Media Library

**Screenshot Space: [Add screenshot of media library showing image grid with thumbnails, search bar, upload area]**

**Features:**
- Grid of uploaded images
- Image thumbnail preview
- Search by filename
- Sort by date/size
- Upload new images via:
  - Click to upload
  - Drag and drop
  - Batch upload
- Delete images
- Copy image URL
- View image metadata

**Upload Modal:**
```
┌──────────────────────────┐
│   Upload Images          │
├──────────────────────────┤
│  [Drag files here]       │
│  or [Click to select]    │
│                          │
│ [Cancel]  [Upload (3)]   │
└──────────────────────────┘
```

### 👥 Subscribers Management

**Screenshot Space: [Add screenshot of subscribers table showing subscriber list with email, join date, status columns]**

**Features:**
- View all subscribers
- Sort by: Name, Email, Join Date
- Search by: Email, Name
- Filter options:
  - Verified / Unverified
  - Active / Inactive
- Pagination
- Export subscriber list
- View subscriber details
- Subscriber stats: Total, Active, New (this month)

**Table Columns:**
- Name
- Email
- Join Date
- Last Activity
- Status
- Actions

---

## Development

### Available Scripts

```bash
# Development
npm run dev                # Start dev server (http://localhost:5174)

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

# Type Checking
npx tsc --noEmit          # Check TypeScript errors
```

### Development Workflow

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Open in browser**
   Open `http://localhost:5174` (or port shown)

3. **Make changes**
   - Files auto-reload with Vite HMR
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
   ```

### Debugging

#### Browser DevTools
- Right-click → Inspect or F12
- React DevTools extension (recommended)
- Redux DevTools (if using Redux)

#### VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5174",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///src/*": "${webspaceRoot}/src/*"
      }
    }
  ]
}
```

#### Console Debugging
```typescript
console.log('Debug:', variable);
console.error('Error:', error);
debugger; // Pauses execution in DevTools
```

### Common Development Tasks

#### Adding a New Page

1. Create component in `src/pages/`
   ```typescript
   // src/pages/NewPage.tsx
   export default function NewPage() {
     return <div>New Page Content</div>;
   }
   ```

2. Add route in `src/App.tsx`
   ```typescript
   <Route path="/new-page" element={<NewPage />} />
   ```

3. Add navigation link in `src/components/Sidebar.tsx`
   ```typescript
   <SidebarLink to="/blog/new-page">New Page</SidebarLink>
   ```

#### Adding a New Component

1. Create in `src/components/`
   ```typescript
   // src/components/MyComponent.tsx
   interface Props {
     title: string;
     onClick: () => void;
   }

   export default function MyComponent({ title, onClick }: Props) {
     return <button onClick={onClick}>{title}</button>;
   }
   ```

2. Import and use in pages/components
   ```typescript
   import MyComponent from '@/components/MyComponent';
   
   <MyComponent title="Click me" onClick={handleClick} />
   ```

#### Using React Query

```typescript
import { useQuery } from '@tanstack/react-query';

export function useBlogs() {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/api/blogs');
      return res.json();
    },
  });
}
```

---

## Testing

### Test Types

| Type | Purpose | Location | Speed |
|------|---------|----------|-------|
| Unit | Test single functions | src/components/__tests__/ | Fast |
| Integration | Test component interactions | tests/integration/ | Medium |
| E2E | Test full workflows | tests/e2e/ | Slow |

### Running Tests

```bash
# Run all tests
npm test

# Watch mode (re-run on changes)
npm test -- --watch

# Coverage report
npm test -- --coverage

# Single test file
npm test -- Blog.test.tsx
```

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blogs from './Blogs';

describe('Blogs Page', () => {
  it('should render blogs list', () => {
    render(<Blogs />);
    expect(screen.getByText(/blogs/i)).toBeInTheDocument();
  });

  it('should handle create blog click', async () => {
    const user = userEvent.setup();
    render(<Blogs />);
    
    await user.click(screen.getByRole('button', { name: /create/i }));
    expect(screen.getByText(/create blog/i)).toBeInTheDocument();
  });
});
```

---

## Styling & Theming

### TailwindCSS

Utility-first CSS framework for rapid UI development:

```typescript
// Using TailwindCSS classes
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
  Styled with Tailwind
</div>
```

### Material UI (MUI)

Component library for pre-built UI elements:

```typescript
import { Button, TextField, Card } from '@mui/material';

<Button variant="contained" color="primary">
  Click Me
</Button>
```

### Custom Styles

CSS Modules for component-scoped styles:

```typescript
// Blog.module.css
.container {
  background: #f5f5f5;
  padding: 1rem;
}

// Blog.tsx
import styles from './Blog.module.css';
export function Blog() {
  return <div className={styles.container}>Content</div>;
}
```

### Theme Configuration

Customizable via `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#007FFF',
        secondary: '#666',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
      }
    }
  }
}
```

---

## API Integration

### Authentication Flow

```typescript
// 1. Login and get token
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { accessToken } = await loginResponse.json();

// 2. Store token
localStorage.setItem('accessToken', accessToken);

// 3. Use token in requests
fetch('http://localhost:3000/api/blogs', {
  headers: { 'Authorization': `Bearer ${accessToken}` }
});
```

### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/login` | POST | Author authentication |
| `/blogs` | GET | Fetch all blogs |
| `/blogs` | POST | Create new blog |
| `/blogs/:id` | GET | Fetch blog details |
| `/blogs/:id` | PUT | Update blog |
| `/blogs/:id` | DELETE | Delete blog |
| `/upload` | POST | Upload image |
| `/upload/:id` | DELETE | Delete image |
| `/subs` | GET | Fetch subscribers |
| `/tags` | GET | Fetch all tags |

### Error Handling

```typescript
try {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return await response.json();
} catch (error) {
  console.error('API Error:', error);
  // Show error toast to user
}
```

---

## State Management

### Context API (Authentication)

```typescript
// utils/contexts.auth.tsx
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Implementation...

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage in components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

### React Query (Data Fetching)

```typescript
// Fetching data
const { data: blogs, isLoading, error } = useQuery({
  queryKey: ['blogs'],
  queryFn: () => fetch('/api/blogs').then(r => r.json())
});

// Mutation
const mutation = useMutation({
  mutationFn: (newBlog) => fetch('/api/blogs', {
    method: 'POST',
    body: JSON.stringify(newBlog)
  }).then(r => r.json()),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['blogs'] })
});
```

---

## Performance Optimization

### Techniques Used

1. **Code Splitting** - Routes lazy-loaded with React.lazy()
   ```typescript
   const Blogs = lazy(() => import('./pages/Blogs'));
   ```

2. **Image Optimization** - Lazy load images
   ```typescript
   <img loading="lazy" src={url} />
   ```

3. **Memoization** - Prevent unnecessary re-renders
   ```typescript
   const MyComponent = memo(() => { /* ... */ });
   ```

4. **Virtual Scrolling** - For large lists (ready for integration)

5. **Request Deduplication** - React Query caches queries

6. **Build Optimization** - Vite automatically chunks code

---

## Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 5174
lsof -i :5174 | xargs kill -9  # macOS/Linux

# Windows
netstat -ano | findstr :5174
taskkill /PID <PID> /F
```

**API connection errors**
- Verify backend API is running: `http://localhost:3000`
- Check `VITE_API_URL` in `.env.local`
- Check CORS settings in backend

**Login not working**
- Verify credentials are correct
- Check browser console for errors
- Verify API is running and accessible

**Styles not applying**
- Rebuild Tailwind: `npm run build`
- Clear cache: `.next/` or `dist/`
- Restart dev server: `npm run dev`

**TypeScript errors**
```bash
# Type check without building
npx tsc --noEmit

# Fix common issues
npm install --save-dev typescript
```

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

1. **Branch naming**: `feature/feature-name` or `fix/bug-description`
2. **Commits**: Use conventional commits
   ```
   feat: Add blog search feature
   fix: Resolve image upload bug
   docs: Update README
   ```
3. **Code style**: Follow ESLint rules
4. **Testing**: Write tests for new features
5. **Documentation**: Update README if adding new features

### Pull Request Process

1. Create feature branch
2. Make changes and commit
3. Run code quality checks:
   ```bash
   npm run lint
   npm run lint -- --fix
   npm test
   ```
4. Push to remote
5. Create pull request
6. Address review feedback
7. Merge after approval

---

## Security Best Practices

🔒 **Security Checklist**

- ✅ Sanitize user inputs
- ✅ Validate forms before submission
- ✅ Use HTTPS in production
- ✅ Store tokens securely (httpOnly cookies preferred over localStorage)
- ✅ Implement CSRF protection
- ✅ Use environment variables for secrets
- ✅ Keep dependencies updated
- ✅ Validate API responses
- ✅ Handle errors properly (don't expose stack traces)
- ✅ Implement rate limiting (API-side)

---

## Accessibility (a11y)

### Features

- ✅ Semantic HTML
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Screen reader support

### Implementation Tips

```typescript
// Good accessibility practices
<button aria-label="Close dialog" onClick={onClose}>
  ✕
</button>

<input
  type="email"
  placeholder="Email"
  aria-required="true"
  aria-describedby="email-help"
/>
<p id="email-help">Enter a valid email address</p>
```

---

## Deployment

### Production Build

```bash
# Build for production
npm run build

# Output goes to dist/ folder
```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] API URL points to production API
- [ ] Build succeeds without errors
- [ ] All tests pass
- [ ] No console errors
- [ ] Performance optimized
- [ ] SEO configured
- [ ] Analytics integrated
- [ ] Error tracking setup (e.g., Sentry)

### Hosting Options

- **Vercel** - Optimized for React/Next.js
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting
- **AWS S3 + CloudFront** - Enterprise solution

---

## Support & Resources

📚 **Documentation & Links**

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Material UI](https://mui.com/material-ui/)
- [React Router](https://reactrouter.com/)
- [React Query](https://tanstack.com/query/latest)
- [Testing Library](https://testing-library.com/)

### Getting Help

- Check existing issues in repository
- Review browser console for errors
- Check GitHub discussions
- Create new issue with detailed description

---

## Screenshots Directory

Create a `docs/screenshots/` folder in the repository with the following:

```
docs/screenshots/
├── dashboard.png              # Main dashboard home
├── login.png                  # Login page
├── blogs-list.png             # Blogs management page
├── create-blog.png            # Blog creation form
├── blog-detail.png            # Blog detail/view
├── media-library.png          # Media library with images
├── subscribers.png            # Subscribers list
├── sidebar.png                # Navigation sidebar
├── responsive-mobile.png      # Mobile responsive view
└── features/
    ├── rich-editor.png        # Rich text editor
    ├── drag-drop-upload.png   # Drag and drop upload
    └── publish-workflow.png   # Publish status flow
```

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
