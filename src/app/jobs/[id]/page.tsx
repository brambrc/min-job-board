import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Calendar, ArrowLeft, Building } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import JobActions from '@/components/JobActions'

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const supabase = await createServerSupabaseClient()
  
  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </Link>

        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="w-5 h-5 text-red-600" />
                  <span className="text-xl text-red-600 font-semibold">{job.company}</span>
                </div>
              </div>
              <div className="md:ml-6">
                <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                  {job.job_type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>
                  Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>

          {/* Apply Section */}
          <div className="p-8 bg-gray-50 rounded-b-lg">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Interested in this position?
              </h3>
              <p className="text-gray-600 mb-6">
                This job was posted on our platform. Contact the company directly to apply.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Contact <strong>{job.company}</strong> to learn more about this opportunity.
                </p>
                <JobActions 
                  jobId={job.id}
                  jobTitle={job.title}
                  company={job.company}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Jobs */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Jobs You Might Like</h2>
          <div className="text-center py-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">
              <Link href="/jobs" className="text-red-600 hover:text-red-700 font-medium">
                Browse all jobs
              </Link>{' '}
              to find more opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}