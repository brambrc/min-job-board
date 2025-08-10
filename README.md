# Mini Job Board App

A modern, full-stack job board application built with Next.js, Supabase, and Tailwind CSS. This platform allows companies to post job opportunities and job seekers to browse and discover career opportunities.

## 🚀 Features

### Core Functionality
- **Authentication**: Secure user registration and login powered by Supabase Auth
- **Job Posting**: Authenticated users can create detailed job listings
- **Job Browsing**: Public access to browse all job postings with advanced filtering
- **Job Details**: Comprehensive job detail pages with full descriptions
- **User Dashboard**: Personal dashboard for managing posted jobs (view, edit, delete)

### Key Features
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Data**: Powered by Supabase for real-time database operations
- **Advanced Filtering**: Filter jobs by location, job type, and search terms
- **Clean UI**: Modern interface with red-to-white gradient theme
- **Form Validation**: Robust client-side validation using Zod
- **Type Safety**: Full TypeScript implementation for better developer experience

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (Database + Authentication)
- **UI Components**: Custom components with Lucide React icons
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom gradient themes
- **Deployment**: Ready for Vercel deployment

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account and project

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mini-job-board
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project settings and copy the following:
   - Project URL
   - Anon (public) key
3. In the Supabase SQL Editor, run the SQL commands from `supabase-setup.sql` to create the necessary tables and policies

### 4. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Seed Sample Data (Optional)

To populate your job board with sample job postings for testing:

1. First, create a user account by signing up at http://localhost:3000/auth/signup
2. Then run the seeder:
```bash
npm run seed
```

This will add 10 diverse sample job postings to your database. See `scripts/README.md` for more details.

## 🗄️ Database Schema

### Tables

#### `profiles`
- `id` (uuid, primary key) - References auth.users
- `email` (text, unique) - User email
- `full_name` (text) - User's full name
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### `jobs`
- `id` (uuid, primary key) - Unique job identifier
- `title` (text) - Job title
- `company` (text) - Company name
- `description` (text) - Job description
- `location` (text) - Job location
- `job_type` (enum) - Full-Time, Part-Time, or Contract
- `user_id` (uuid) - Foreign key to profiles
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Row Level Security (RLS)

The database implements comprehensive RLS policies:
- Public read access to all jobs
- Users can only create, edit, and delete their own job postings
- Automatic profile creation on user registration

## 🎨 Design Philosophy

### Color Scheme
- Primary: Red gradients (red-500 to red-600)
- Background: Subtle red-to-white gradients
- Accents: Clean whites and grays for content areas

### User Experience
- **Clean and Professional**: Minimal design focused on usability
- **Intuitive Navigation**: Clear navigation with visual feedback
- **Responsive Layout**: Optimized for all screen sizes
- **Fast Loading**: Optimized with Next.js 14 app router

## 📱 Application Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx          # Login page
│   │   └── signup/page.tsx         # Registration page
│   ├── jobs/
│   │   ├── [id]/
│   │   │   ├── page.tsx            # Job detail page
│   │   │   └── edit/page.tsx       # Edit job page
│   │   ├── post/page.tsx           # Create job page
│   │   ├── page.tsx                # Browse jobs (server component)
│   │   └── JobsClient.tsx          # Client-side job browsing
│   ├── dashboard/page.tsx          # User dashboard
│   ├── layout.tsx                  # Root layout with navigation
│   └── page.tsx                    # Homepage
├── components/
│   └── Navigation.tsx              # Main navigation component
├── hooks/
│   └── useAuth.ts                  # Authentication hook
├── lib/
│   ├── supabase.ts                 # Supabase client configuration
│   ├── supabase-server.ts          # Server-side Supabase client
│   └── supabase-client.ts          # Client-side Supabase client
└── scripts/
    ├── seed-jobs.js                # Node.js seeder script
    ├── seed-jobs.sql               # SQL seeder script
    ├── seed-jobs.ts                # TypeScript seeder script
    └── README.md                   # Seeder documentation
```

## 🔐 Authentication Flow

1. **Registration**: Users sign up with email and password
2. **Email Verification**: Supabase sends confirmation email
3. **Profile Creation**: Automatic profile creation via database trigger
4. **Session Management**: Persistent sessions with automatic refresh
5. **Protected Routes**: Dashboard and job posting require authentication

## 🚦 API Routes & Data Flow

The application uses Supabase's real-time capabilities:

- **Server Components**: Fetch initial data server-side for SEO
- **Client Components**: Handle user interactions and real-time updates
- **Optimistic Updates**: Immediate UI feedback for better UX
- **Error Handling**: Comprehensive error handling with user feedback

## 🔍 Key Features Explained

### Job Filtering
- **Search**: Full-text search across job titles and company names
- **Location Filter**: Filter by specific locations
- **Job Type Filter**: Filter by employment type
- **Real-time Results**: Instant filtering without page reloads

### Dashboard Functionality
- **Job Management**: View, edit, and delete posted jobs
- **Statistics**: Overview of posting activity
- **Quick Actions**: Easy access to common tasks

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Friendly**: Adapted layouts for tablet screens
- **Desktop Enhanced**: Full features on desktop displays

## 🚀 Deployment Instructions

### Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔑 Required API Keys

To run this application, you'll need the following from Supabase:

1. **Supabase Project URL**: Available in your project settings
2. **Supabase Anon Key**: Available in your project API settings

### How to Obtain Supabase Keys:
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy the Project URL and anon/public key
5. Add them to your `.env.local` file

## 🎯 What Would I Improve Given More Time?

### Performance Optimizations
- **Image Optimization**: Add company logo uploads with Next.js Image optimization
- **Caching Strategy**: Implement Redis caching for frequently accessed job listings
- **Database Indexing**: Add more sophisticated database indexes for complex queries
- **Pagination**: Implement virtual scrolling for large job lists

### Enhanced Features
- **Advanced Search**: Full-text search with elasticsearch integration
- **Job Applications**: Complete application system with file uploads
- **Email Notifications**: Real-time notifications for job applications
- **Analytics Dashboard**: Detailed analytics for job posting performance
- **Saved Jobs**: Allow users to bookmark and save interesting positions

### User Experience Improvements
- **Rich Text Editor**: WYSIWYG editor for job descriptions
- **Drag & Drop**: Drag and drop file uploads for resumes
- **Real-time Chat**: Direct messaging between employers and candidates
- **Social Login**: OAuth integration with Google, LinkedIn, GitHub
- **Dark Mode**: Theme switching capability

### Technical Enhancements
- **Testing Suite**: Comprehensive unit and integration tests with Jest/Cypress
- **API Rate Limiting**: Implement rate limiting for API endpoints
- **Error Monitoring**: Integration with Sentry for error tracking
- **Performance Monitoring**: Add performance monitoring and optimization
- **Internationalization**: Multi-language support

### Business Features
- **Payment Integration**: Premium job posting features
- **Company Profiles**: Detailed company pages with branding
- **Job Categories**: Hierarchical job categorization system
- **Salary Information**: Salary ranges and compensation details
- **Application Tracking**: ATS-like features for managing applications

### Security Improvements
- **Advanced RLS**: More granular row-level security policies
- **Input Sanitization**: Enhanced XSS protection
- **API Security**: Request validation and sanitization
- **Audit Logging**: Comprehensive audit trail for all actions

## 📄 License

This project is created for interview assessment purposes.

## 🤝 Contributing

This is a take-home assignment project. For any questions or clarifications, please contact the project maintainer.

---

**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**