import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import CompanyForm from '@/features/company/components/CompanyForm'
import { useGetCompanyByIdQuery, useUpdateCompanyMutation } from '@/features/company/api/companyApi'
import { Loader2 } from 'lucide-react'

const CompanyEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data: company, isLoading } = useGetCompanyByIdQuery(id)
    const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation()

    if (isLoading) {
        return <Loader2 className="animate-spin m-10" />
    }

    const handleUpdate = async (formData) => {
        try {
            await updateCompany({ id, data: formData }).unwrap()
            toast.success('Company updated successfully')
            navigate('/recruiter/companies')
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to update company')
        }
    }

    return (
        <CompanyForm
            key={company._id} // 🔥 IMPORTANT
            title="Edit Company"
            submitLabel="Update Company"
            initialData={company}
            isLoading={isUpdating}
            onSubmit={handleUpdate}
        />
    )
}

export default CompanyEdit
