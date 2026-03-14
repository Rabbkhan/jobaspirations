import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useGetRecruiterCompaniesQuery, useGetRecruiterJobFiltersQuery, useCreateRecruiterJobMutation } from '../api/recruiterApi'
import JobForm from '../components/JobForm'

const JobCreate = () => {
    const navigate = useNavigate()
    const { data: companyData } = useGetRecruiterCompaniesQuery()
    const { data: filterData } = useGetRecruiterJobFiltersQuery()
    const [createJob, { isLoading }] = useCreateRecruiterJobMutation()

    const handleCreate = async (data) => {
        const payload = {
            title: data.title,
            position: data.position,
            description: data.description,
            requirements: data.skills.split(',').map((s) => s.trim()),
            salary: { min: Number(data.salaryMin), max: Number(data.salaryMax) },
            experience: { min: Number(data.expMinMonths), max: Number(data.expMaxMonths) },
            location: data.location,
            industry: data.industry,
            jobType: data.jobType,
            company: data.company
        }

        try {
            await createJob(payload).unwrap()
            toast.success('Job created successfully')
            navigate('/recruiter/jobs')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to create job')
        }
    }

    return (
        <JobForm
            companies={companyData?.companies || []}
            filters={filterData?.filters || {}}
            onSubmit={handleCreate}
            isSubmitting={isLoading}
            mode="create"
        />
    )
}

export default JobCreate
