// pages/company/CompanyList.jsx
import React from 'react'
import { Button } from '@/shared/ui/button'
import { Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import CompanyTable from '@/features/company/components/CompanyTable'
import { useGetAllCompaniesQuery } from '@/features/company/api/companyApi'

const CompanyList = () => {
    const navigate = useNavigate()

    // ✅ RTK Query
    const { data, isLoading, isError, refetch } = useGetAllCompaniesQuery()

    const companies = data?.companies || data || []

    if (isError) {
        return (
            <div className="p-6 text-red-500">
                Failed to load companies
                <Button
                    variant="outline"
                    className="ml-4"
                    onClick={refetch}>
                    Retry
                </Button>
            </div>
        )
    }

    return (
        <div className="h-[calc(100vh-64px)] p-6 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Companies</h1>

                <Button
                    className="flex items-center gap-2"
                    onClick={() => navigate('/recruiter/companies/create')}>
                    <Plus size={18} />
                    Add Company
                </Button>
            </div>

            {/* Scrollable Table */}
            <div className="flex-1 overflow-y-auto rounded border">
                <CompanyTable
                    data={companies}
                    loading={isLoading}
                />
            </div>
        </div>
    )
}

export default CompanyList
