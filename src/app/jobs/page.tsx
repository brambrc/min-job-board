import { createServerSupabaseClient } from '@/lib/supabase-server'
import JobsClient from './JobsClient'

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; type?: string; search?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const supabase = await createServerSupabaseClient()
  
  let query = supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  // Apply filters
  if (resolvedSearchParams.location) {
    query = query.ilike('location', `%${resolvedSearchParams.location}%`)
  }
  
  if (resolvedSearchParams.type) {
    query = query.eq('job_type', resolvedSearchParams.type)
  }

  if (resolvedSearchParams.search) {
    query = query.or(`title.ilike.%${resolvedSearchParams.search}%,company.ilike.%${resolvedSearchParams.search}%`)
  }

  const { data: jobs, error } = await query

  if (error) {
    console.error('Error fetching jobs:', error)
  }

  return <JobsClient initialJobs={jobs || []} />
}