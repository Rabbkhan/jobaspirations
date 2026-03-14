import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import {
    useGetRecruiterCompaniesQuery,
    useGetRecruiterJobFiltersQuery,
    useGetRecruiterJobByIdQuery,
    useUpdateRecruiterJobMutation
} from '../api/recruiterApi'
import JobForm from '../components/JobForm'
import { useMemo } from 'react'

const RecruiterJobEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: companyData } = useGetRecruiterCompaniesQuery()
    const { data: filterData } = useGetRecruiterJobFiltersQuery()
    const { data: jobData, isLoading: loadingJob } = useGetRecruiterJobByIdQuery(id)
    const [updateJob, { isLoading: isUpdating }] = useUpdateRecruiterJobMutation()

    const handleUpdate = async (data) => {
        const payload = {
            title: data.title,
            description: data.description,
            requirements: data.skills.split(',').map((s) => s.trim()),
            salary: { min: Number(data.salaryMin), max: Number(data.salaryMax) },
            experience: { min: Number(data.expMinMonths), max: Number(data.expMaxMonths) },
            location: data.location,
            industry: data.industry,
            jobType: data.jobType,
            company: jobData?.job?.company?._id // company is fixed, cannot edit
        }

        try {
            await updateJob({ jobId: id, payload }).unwrap()
            toast.success('Job updated successfully')
            navigate('/recruiter/jobs')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update job')
        }
    }

    // Prepare default values for JobForm
    const defaultValues = useMemo(() => {
        if (!jobData?.job) return {} // return empty defaults until data loads

        return {
            title: jobData.job.title,
            position: jobData.job.position ?? '',
            company: jobData.job.company?._id,
            companyName: jobData.job.company?.companyname,
            location: jobData.job.location,
            industry: jobData.job.industry,
            jobType: jobData.job.jobType,
            salaryMin: jobData.job.salary?.min ?? '',
            salaryMax: jobData.job.salary?.max ?? '',
            expMinMonths: jobData.job.experience?.min ?? '',
            expMaxMonths: jobData.job.experience?.max ?? '',
            description: jobData.job.description,
            skills: jobData.job.requirements?.join(', ') || ''
        }
    }, [jobData])

    return (
        <JobForm
            defaultValues={defaultValues}
            companies={companyData?.companies || []}
            filters={filterData?.filters || {}}
            onSubmit={handleUpdate}
            isSubmitting={isUpdating || loadingJob}
            mode="edit"
        />
    )
}

export default RecruiterJobEdit
