# Database Seeder Scripts

This directory contains scripts to populate your job board with sample data for testing and demonstration purposes.

## Available Seeders

### 1. JavaScript Seeder (Recommended)
**File:** `seed-jobs.js`

This is the easiest way to populate your database with sample jobs.

#### Prerequisites
- Supabase project set up
- Environment variables configured in `.env.local`
- At least one user account created (sign up through the app first)

#### Usage
```bash
npm run seed
```

#### What it does:
- Checks for existing users in your database
- Clears existing job data (optional)
- Inserts 10 diverse sample job postings
- Assigns all jobs to the first available user

### 2. SQL Seeder
**File:** `seed-jobs.sql`

Run this directly in your Supabase SQL Editor if you prefer SQL.

#### Prerequisites
- Access to Supabase SQL Editor
- At least one user in your `profiles` table

#### Usage
1. Open your Supabase dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `seed-jobs.sql`
4. Replace `'YOUR_USER_ID_HERE'` with an actual user ID from your `profiles` table
5. Run the query

### 3. TypeScript Seeder
**File:** `seed-jobs.ts`

Advanced option using TypeScript with full type safety.

#### Usage
```bash
npx tsx scripts/seed-jobs.ts
```

## Sample Data Included

The seeder creates 10 diverse job postings across different:

### Job Types
- **Full-Time** (7 jobs)
- **Part-Time** (2 jobs) 
- **Contract** (2 jobs)

### Industries & Roles
1. **Senior Frontend Developer** - TechCorp Inc. (San Francisco, CA)
2. **Data Scientist** - DataFlow Analytics (Remote)
3. **Product Manager** - InnovateLab (New York, NY)
4. **DevOps Engineer** - CloudScale Solutions (Austin, TX)
5. **UX/UI Designer** - DesignStudio Pro (Los Angeles, CA)
6. **Backend Developer** - ServerTech Corp (Seattle, WA)
7. **Marketing Coordinator** - GrowthHackers Inc. (Chicago, IL)
8. **Mobile App Developer** - MobileFirst Technologies (Remote)
9. **Cybersecurity Analyst** - SecureNet Systems (Washington, DC)
10. **Content Writer** - ContentCrafters Agency (Remote)

### Locations
- San Francisco, CA
- Remote (3 jobs)
- New York, NY
- Austin, TX
- Los Angeles, CA
- Seattle, WA
- Chicago, IL
- Washington, DC

## Important Notes

### User Requirements
Before running any seeder, make sure you have at least one user account:

1. Start your application: `npm run dev`
2. Visit: `http://localhost:3000/auth/signup`
3. Create a user account
4. Then run the seeder

### Environment Variables
Make sure your `.env.local` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Data Reset
The JavaScript seeder will clear existing jobs before inserting new ones. If you want to preserve existing data, comment out the delete operation in the script.

## Troubleshooting

### Common Issues

**"Missing Supabase environment variables"**
- Ensure `.env.local` exists and contains the correct Supabase credentials

**"No existing users found"**
- Create a user account through the signup process first

**"Error inserting jobs"**
- Check that your database schema is set up correctly
- Verify RLS policies allow the user to insert jobs
- Ensure the user exists in the `profiles` table

### Getting Help

If you encounter issues:
1. Check the database schema is properly set up using `supabase-setup.sql`
2. Verify your environment variables are correct
3. Ensure you have at least one user account created
4. Check the browser console and terminal for detailed error messages

## Sample Job Details

Each job includes:
- Realistic job titles and company names
- Detailed job descriptions with responsibilities and requirements
- Varied locations (including remote options)
- Different employment types
- Professional formatting with bullet points
- Benefits and perks sections
- Salary information where appropriate

This provides a realistic dataset for testing all features of your job board application.