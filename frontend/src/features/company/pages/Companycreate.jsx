import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import CompanyForm from '@/features/company/components/CompanyForm'
import { useCreateCompanyMutation } from '@/features/company/api/companyApi'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const [createCompany, { isLoading }] = useCreateCompanyMutation()

    const handleCreate = async (formData) => {
        try {
            await createCompany(formData).unwrap()
            toast.success('Company created successfully')
            navigate('/recruiter/companies')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to create company')
        }
    }

    return (
        <CompanyForm
            title="Create Company"
            submitLabel="Create Company"
            isLoading={isLoading}
            onSubmit={handleCreate}
        />
    )
}

export default CompanyCreate
