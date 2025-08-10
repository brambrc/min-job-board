'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2, MapPin, Calendar, Briefcase } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Database } from '@/lib/supabase'

type Job = Database['public']['Tables']['jobs']['Row']

export default function DashboardPage() {
  const { user, loading: authLoading, supabase } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [savedJobs, setSavedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'posted' | 'saved'>('posted')
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  const fetchUserJobs = useCallback(async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching jobs:', error)
      } else {
        setJobs(data || [])
      }
    } catch (error) {
      console.error('Unexpected error:', error)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    if (user) {
      fetchUserJobs()
    }
  }, [user, fetchUserJobs])

  const fetchSavedJobs = useCallback(async () => {
    if (!user) return

    try {
      // First get the saved job IDs
      const { data: savedJobIds, error: savedError } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', user.id)

      if (savedError) {
        console.error('Error fetching saved job IDs:', savedError)
        return
      }

      if (!savedJobIds || savedJobIds.length === 0) {
        setSavedJobs([])
        return
      }

      // Then get the job details
      const jobIds = savedJobIds.map(item => item.job_id)
      const { data: jobs, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .in('id', jobIds)

      if (jobsError) {
        console.error('Error fetching saved jobs details:', jobsError)
      } else {
        setSavedJobs(jobs || [])
      }
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }, [user, supabase])

  useEffect(() => {
    if (user) {
      fetchSavedJobs()
    }
  }, [user, fetchSavedJobs])

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job posting?')) {
      return
    }

    try {
      const { error } = await supabase.from('jobs').delete().eq('id', jobId)

      if (error) {
        alert('Error deleting job: ' + error.message)
      } else {
        setJobs(jobs.filter(job => job.id !== jobId))
        alert('Job deleted successfully!')
      }
    } catch {
      alert('An unexpected error occurred')
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-gray-600">
              Manage your job postings and track their performance
            </p>
          </div>
          <Link
            href="/jobs/post"
            className="mt-4 md:mt-0 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center space-x-2 w-fit"
          >
            <Plus className="w-5 h-5" />
            <span>Post New Job</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full">
                <Briefcase className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs Posted</p>
                <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobs.filter(job => 
                    new Date(job.created_at).getMonth() === new Date().getMonth()
                  ).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Locations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(jobs.map(job => job.location)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 p-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('posted')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'posted'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Posted Jobs ({jobs.length})
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'saved'
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Saved Jobs ({savedJobs.length})
              </button>
            </nav>
          </div>

          {/* Posted Jobs Tab */}
          {activeTab === 'posted' && (
            <>
              {jobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start by posting your first job to attract talented candidates.
                  </p>
                  <Link
                    href="/jobs/post"
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-200 inline-flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Post Your First Job</span>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 mb-4 md:mb-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              {job.job_type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="text-gray-600 hover:text-red-600 px-3 py-1 text-sm transition-colors"
                          >
                            View
                          </Link>
                          <Link
                            href={`/jobs/${job.id}/edit`}
                            className="text-gray-600 hover:text-blue-600 px-3 py-1 text-sm transition-colors flex items-center space-x-1"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </Link>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="text-gray-600 hover:text-red-600 px-3 py-1 text-sm transition-colors flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Saved Jobs Tab */}
          {activeTab === 'saved' && (
            <>
              {savedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved jobs yet</h3>
                  <p className="text-gray-600 mb-6">
                    Browse jobs and save the ones you&apos;re interested in to view them here.
                  </p>
                  <Link
                    href="/jobs"
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-200 inline-flex items-center space-x-2"
                  >
                    <Briefcase className="w-5 h-5" />
                    <span>Browse Jobs</span>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {savedJobs.map((job) => (
                    <div key={job.id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 mb-4 md:mb-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              {job.job_type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{job.company}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="text-gray-600 hover:text-red-600 px-3 py-1 text-sm transition-colors"
                          >
                            View Job
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}