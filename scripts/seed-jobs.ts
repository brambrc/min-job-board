import { createClient } from '@supabase/supabase-js'
import { Database } from '../src/lib/supabase'

// This script requires environment variables to be set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

const sampleJobs = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    job_type: 'Full-Time' as const,
    description: `We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using modern technologies.

Key Responsibilities:
• Develop and maintain responsive web applications using React/Next.js
• Collaborate with design and backend teams to implement user interfaces
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers

Requirements:
• 5+ years of experience in frontend development
• Strong proficiency in JavaScript, TypeScript, React, and Next.js
• Experience with CSS frameworks like Tailwind CSS
• Knowledge of modern build tools and development workflows
• Excellent problem-solving skills and attention to detail

Benefits:
• Competitive salary and equity package
• Health, dental, and vision insurance
• Flexible work arrangements
• Professional development budget
• Modern office in downtown San Francisco`
  },
  {
    title: 'Data Scientist',
    company: 'DataFlow Analytics',
    location: 'Remote',
    job_type: 'Full-Time' as const,
    description: `Join our data science team to help drive insights and innovation through advanced analytics and machine learning.

What you'll do:
• Build and deploy machine learning models to solve business problems
• Analyze large datasets to extract meaningful insights
• Collaborate with product and engineering teams to implement data solutions
• Create data visualizations and reports for stakeholders
• Stay current with latest developments in data science and ML

Requirements:
• Master's degree in Data Science, Statistics, Computer Science, or related field
• 3+ years of experience in data science or analytics
• Proficiency in Python, R, SQL, and machine learning libraries
• Experience with cloud platforms (AWS, GCP, or Azure)
• Strong communication skills and ability to explain complex concepts

What we offer:
• Remote-first culture with flexible hours
• Competitive compensation package
• Learning and development opportunities
• Top-tier equipment and tools
• Annual company retreats`
  },
  {
    title: 'Product Manager',
    company: 'InnovateLab',
    location: 'New York, NY',
    job_type: 'Full-Time' as const,
    description: `We're seeking a Product Manager to drive the strategy and execution of our digital products.

Responsibilities:
• Define product vision, strategy, and roadmap
• Work closely with engineering, design, and marketing teams
• Conduct market research and competitive analysis
• Gather and prioritize product requirements
• Lead product launches and go-to-market strategies
• Analyze product metrics and user feedback

Qualifications:
• 4+ years of product management experience
• Strong analytical and problem-solving skills
• Experience with agile development methodologies
• Excellent communication and leadership abilities
• Bachelor's degree in Business, Engineering, or related field

Benefits:
• Competitive salary with performance bonuses
• Comprehensive health coverage
• 401(k) with company matching
• Unlimited PTO policy
• Central Manhattan office location`
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudScale Solutions',
    location: 'Austin, TX',
    job_type: 'Full-Time' as const,
    description: `Join our DevOps team to help build and maintain scalable infrastructure solutions.

Key Responsibilities:
• Design and implement CI/CD pipelines
• Manage cloud infrastructure on AWS/Azure/GCP
• Monitor system performance and reliability
• Automate deployment and operational processes
• Collaborate with development teams on infrastructure needs

Requirements:
• 3+ years of DevOps or Infrastructure experience
• Strong knowledge of containerization (Docker, Kubernetes)
• Experience with Infrastructure as Code (Terraform, CloudFormation)
• Proficiency in scripting languages (Bash, Python)
• Understanding of networking and security best practices

Perks:
• Hybrid work model
• Stock options
• Professional certification reimbursement
• State-of-the-art tech stack
• Collaborative team environment`
  },
  {
    title: 'UX/UI Designer',
    company: 'DesignStudio Pro',
    location: 'Los Angeles, CA',
    job_type: 'Contract' as const,
    description: `We're looking for a talented UX/UI Designer to create exceptional user experiences for our clients.

What you'll do:
• Create user-centered designs for web and mobile applications
• Conduct user research and usability testing
• Develop wireframes, prototypes, and high-fidelity mockups
• Collaborate with developers to ensure design implementation
• Maintain design systems and style guides

Skills needed:
• 3+ years of UX/UI design experience
• Proficiency in Figma, Sketch, Adobe Creative Suite
• Strong understanding of design principles and usability
• Experience with responsive and mobile-first design
• Portfolio demonstrating excellent design work

Contract Details:
• 6-month contract with potential for extension
• Competitive hourly rate
• Flexible schedule
• Opportunity to work with diverse clients
• Remote work options available`
  },
  {
    title: 'Backend Developer',
    company: 'ServerTech Corp',
    location: 'Seattle, WA',
    job_type: 'Full-Time' as const,
    description: `Join our backend team to build robust and scalable server-side applications.

Responsibilities:
• Develop and maintain RESTful APIs and microservices
• Design and optimize database schemas and queries
• Implement security best practices
• Write comprehensive tests and documentation
• Participate in architecture decisions and code reviews

Requirements:
• Bachelor's degree in Computer Science or equivalent experience
• 4+ years of backend development experience
• Strong proficiency in Node.js, Python, or Java
• Experience with databases (PostgreSQL, MongoDB)
• Knowledge of cloud services and containerization

Benefits:
• Competitive salary and benefits
• Equity participation
• Flexible PTO and parental leave
• Professional development budget
• Beautiful office in South Lake Union`
  },
  {
    title: 'Marketing Coordinator',
    company: 'GrowthHackers Inc.',
    location: 'Chicago, IL',
    job_type: 'Part-Time' as const,
    description: `We're seeking a part-time Marketing Coordinator to support our marketing initiatives.

Duties:
• Assist with social media management and content creation
• Support email marketing campaigns
• Coordinate marketing events and webinars
• Analyze marketing metrics and prepare reports
• Help with market research and competitor analysis

Qualifications:
• 1-2 years of marketing experience
• Strong written and verbal communication skills
• Familiarity with marketing tools (HubSpot, Mailchimp, etc.)
• Basic understanding of digital marketing concepts
• Creative mindset with attention to detail

Position Details:
• Part-time: 20-25 hours per week
• Flexible schedule
• Opportunity for growth to full-time
• Competitive hourly wage
• Downtown Chicago location`
  },
  {
    title: 'Mobile App Developer',
    company: 'MobileFirst Technologies',
    location: 'Remote',
    job_type: 'Contract' as const,
    description: `Looking for an experienced Mobile App Developer to build cross-platform mobile applications.

Project Scope:
• Develop iOS and Android applications using React Native
• Integrate with backend APIs and third-party services
• Implement responsive UI components
• Optimize app performance and user experience
• Submit apps to App Store and Google Play

Requirements:
• 3+ years of mobile app development experience
• Expertise in React Native and/or Flutter
• Knowledge of native iOS and Android development
• Experience with app store submission processes
• Strong problem-solving and debugging skills

Contract Terms:
• 3-month initial contract
• Full-time availability required
• Competitive contract rate
• Potential for ongoing projects
• Fully remote position`
  },
  {
    title: 'Cybersecurity Analyst',
    company: 'SecureNet Systems',
    location: 'Washington, DC',
    job_type: 'Full-Time' as const,
    description: `Join our cybersecurity team to protect our organization and clients from digital threats.

Key Duties:
• Monitor security systems and investigate potential threats
• Conduct vulnerability assessments and penetration testing
• Develop and implement security policies and procedures
• Respond to security incidents and breaches
• Stay updated on latest security threats and technologies

Qualifications:
• Bachelor's degree in Cybersecurity, IT, or related field
• 2+ years of cybersecurity experience
• Knowledge of security frameworks (NIST, ISO 27001)
• Experience with security tools (SIEM, IDS/IPS, firewalls)
• Security certifications (CISSP, CEH, etc.) preferred

Benefits:
• Excellent salary and benefits package
• Security clearance assistance
• Continuous learning opportunities
• Federal contracting experience
• Metro-accessible office location`
  },
  {
    title: 'Content Writer',
    company: 'ContentCrafters Agency',
    location: 'Remote',
    job_type: 'Part-Time' as const,
    description: `We're looking for a skilled Content Writer to create engaging content for various clients.

Responsibilities:
• Write blog posts, articles, and web copy
• Create social media content and captions
• Develop email newsletters and marketing materials
• Research industry topics and trends
• Edit and proofread content for accuracy

Requirements:
• 2+ years of content writing experience
• Excellent writing and editing skills
• SEO knowledge and keyword research experience
• Ability to write in different tones and styles
• Portfolio of published work

Work Details:
• Part-time: 15-20 hours per week
• Flexible schedule and deadlines
• Fully remote position
• Opportunity for additional projects
• Competitive per-word or per-project rates`
  }
]

async function seedJobs() {
  console.log('Starting job seeding process...')

  try {
    // First, let's create a dummy user for the jobs if one doesn't exist
    // In a real scenario, you'd have actual users who posted these jobs
    const { data: existingUsers, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)

    if (userError) {
      console.error('Error checking for existing users:', userError)
      return
    }

    let userId: string

    if (existingUsers && existingUsers.length > 0) {
      userId = existingUsers[0].id
      console.log('Using existing user:', userId)
    } else {
      // Create a dummy user
      const { data: authUser, error: authError } = await supabase.auth.signUp({
        email: 'demo@jobboard.com',
        password: 'demo123456',
        options: {
          data: {
            full_name: 'Demo User'
          }
        }
      })

      if (authError || !authUser.user) {
        console.error('Error creating demo user:', authError)
        return
      }

      userId = authUser.user.id
      console.log('Created demo user:', userId)

      // Wait a bit for the profile to be created by the trigger
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    // Clear existing jobs
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (deleteError) {
      console.log('Note: Could not clear existing jobs (this is normal if table is empty)')
    } else {
      console.log('Cleared existing jobs')
    }

    // Insert sample jobs
    const jobsWithUser = sampleJobs.map(job => ({
      ...job,
      user_id: userId
    }))

    const { data: insertedJobs, error: insertError } = await supabase
      .from('jobs')
      .insert(jobsWithUser)
      .select()

    if (insertError) {
      console.error('Error inserting jobs:', insertError)
      return
    }

    console.log(`Successfully seeded ${sampleJobs.length} jobs!`)
    console.log('Job titles added:')
    sampleJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company} (${job.job_type})`)
    })

    console.log('\nSeeding completed successfully! 🎉')
    console.log('You can now browse these jobs at http://localhost:3000/jobs')

  } catch (error) {
    console.error('Unexpected error during seeding:', error)
  }
}

// Run the seeder
seedJobs().then(() => {
  console.log('Seeder script finished')
  process.exit(0)
}).catch((error) => {
  console.error('Seeder script failed:', error)
  process.exit(1)
})