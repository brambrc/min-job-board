'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Heart, HeartOff, ExternalLink } from 'lucide-react'

interface JobActionsProps {
  jobId: string
  jobTitle: string
  company: string
}

export default function JobActions({ jobId, jobTitle, company }: JobActionsProps) {
  const { user, supabase } = useAuth()
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  // Check if job is already saved
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user) {
        setCheckingStatus(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('saved_jobs')
          .select('id')
          .eq('user_id', user.id)
          .eq('job_id', jobId)
          .single()

        if (data) {
          setIsSaved(true)
        }
      } catch (error) {
        // Job is not saved (expected for new jobs)
      } finally {
        setCheckingStatus(false)
      }
    }

    checkSavedStatus()
  }, [user, jobId, supabase])

  const handleApply = () => {
    if (!user) {
      // Redirect to login if not authenticated
      router.push('/auth/login')
      return
    }

    // For now, we'll simulate applying by opening a mailto link
    // In a real application, this would integrate with an ATS or application system
    const subject = encodeURIComponent(`Application for ${jobTitle} position`)
    const body = encodeURIComponent(`Hello ${company} team,

I am interested in applying for the ${jobTitle} position that I found on your job board.

I would like to learn more about this opportunity and discuss how my skills and experience align with your requirements.

Looking forward to hearing from you.

Best regards,
${user.email}`)

    window.open(`mailto:jobs@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com?subject=${subject}&body=${body}`)
  }

  const handleSaveJob = async () => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    setIsLoading(true)

    try {
      if (isSaved) {
        // Remove from saved jobs
        const { error } = await supabase
          .from('saved_jobs')
          .delete()
          .eq('user_id', user.id)
          .eq('job_id', jobId)

        if (error) {
          throw error
        }

        setIsSaved(false)
        alert('Job removed from saved jobs.')
      } else {
        // Add to saved jobs
        const { error } = await supabase
          .from('saved_jobs')
          .insert({
            user_id: user.id,
            job_id: jobId
          })

        if (error) {
          throw error
        }

        setIsSaved(true)
        alert('Job saved successfully! You can view your saved jobs in your dashboard.')
      }
    } catch (error) {
      console.error('Error saving job:', error)
      alert('Failed to save job. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={handleApply}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
      >
        <ExternalLink className="w-4 h-4" />
        <span>Apply for this Job</span>
      </button>
      
      <button
        onClick={handleSaveJob}
        disabled={isLoading || checkingStatus}
        className={`border px-6 py-3 rounded-md transition-all duration-200 font-medium flex items-center justify-center space-x-2 ${
          isSaved
            ? 'border-red-600 bg-red-50 text-red-600'
            : 'border-red-600 text-red-600 hover:bg-red-50'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSaved ? (
          <HeartOff className="w-4 h-4" />
        ) : (
          <Heart className="w-4 h-4" />
        )}
        <span>
          {checkingStatus ? 'Loading...' : isLoading ? 'Saving...' : isSaved ? 'Saved' : 'Save Job'}
        </span>
      </button>
    </div>
  )
}