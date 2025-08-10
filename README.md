# Mini Job Board

A full-stack job board application where companies can post job opportunities and job seekers can browse and apply for positions. Built with Next.js, Supabase, and Tailwind CSS.

## Features

**For Job Seekers:**
- Browse job listings with search and filtering
- Save jobs for later viewing
- Apply to jobs via email
- View detailed job descriptions

**For Employers:**
- Post and manage job listings
- Edit or delete your postings
- Dashboard to track all your posted jobs

**Technical Features:**
- User authentication and registration
- Responsive design that works on all devices
- Real-time data with Supabase
- Form validation and error handling
- Clean, professional interface

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Supabase for database and authentication
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18 or higher
- A Supabase account (free tier available)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/brambrc/min-job-board.git
cd mini-job-board
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Go to [supabase.com](https://supabase.com) and create a new project
   - Copy your project URL and anon key from Settings > API
   - Run the SQL commands from `scripts/supabase-setup.sql` in your Supabase SQL Editor

4. Configure environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Adding Sample Data

To populate the job board with sample listings for testing:

1. Create an account by visiting `http://localhost:3000/auth/signup`
   - **Important**: Use a real email address as Supabase will send a confirmation email
   - Check your inbox and click the confirmation link
2. Run the seeder script:
```bash
npm run seed
```

This adds 10 sample job postings to your database.

## User Registration

**Please use a real email address when signing up.** Supabase requires email verification for security:

1. Enter your real email and create a password
2. Check your email inbox for a confirmation message from Supabase
3. Click the confirmation link in the email
4. You'll be redirected back to the application and can start using it

If you don't confirm your email, you won't be able to log in or use the full features of the application.

## Database Schema

The application uses three main tables:

**profiles**
- User information linked to Supabase auth
- Stores email and full name

**jobs**
- Job postings with title, company, description, location, and type
- Linked to the user who posted it

**saved_jobs**
- Junction table for users to save jobs they're interested in
- Prevents duplicate saves

All tables include Row Level Security policies to ensure users can only access and modify their own data.

## Application Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── auth/              # Login and signup pages
│   ├── jobs/              # Job browsing and management
│   └── dashboard/         # User dashboard
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Supabase configuration
└── scripts/               # Database setup and seeding
```

## Key Features Explained

**Authentication Flow**
Users sign up with email and password. Supabase handles the authentication and sends a confirmation email. Once confirmed, users can post jobs and save listings.

**Job Management**
Authenticated users can create, edit, and delete their job postings through the dashboard. All job data is stored securely with proper access controls.

**Job Saving**
Users can save interesting job listings to review later. Saved jobs appear in a dedicated tab on the dashboard.

**Search and Filtering**
The job browsing page includes real-time search and filtering by location and job type, making it easy to find relevant opportunities.

## Deployment

This application is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your Supabase environment variables in the Vercel dashboard
4. Deploy

Make sure to set the same environment variables on Vercel that you used locally.

## Required API Keys

You'll need these from your Supabase project:

- **Project URL**: Found in Settings > API
- **Anon Key**: Found in Settings > API (this is safe to use in client-side code)

Both values should be added to your `.env.local` file for local development and to your deployment platform's environment variables.

## What I Would Improve Given More Time

**Performance Enhancements**
- Add pagination for job listings to handle large datasets
- Implement caching for frequently accessed data
- Add image optimization for company logos

**Feature Additions**
- Advanced search with salary ranges and remote work filters
- Email notifications for new job postings matching saved searches
- Direct messaging between employers and candidates
- Resume upload and application tracking system

**User Experience**
- Rich text editor for job descriptions with formatting options
- Drag and drop file uploads
- Mobile app for iOS and Android
- Dark mode theme option

**Business Features**
- Premium job posting options with featured listings
- Analytics dashboard for employers to track posting performance
- Integration with popular job boards and career sites
- Automated job expiration and renewal system

**Technical Improvements**
- Comprehensive testing suite with Jest and Cypress
- Error monitoring and performance tracking
- Multi-language support for international users
- Advanced security features like rate limiting and CAPTCHA

## Contributing

This project was created as a technical assessment. If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is for demonstration purposes as part of a technical interview process.