import React from 'react'
import { Link } from 'react-router-dom'
import { BuildingIcon, Edit, MapPinIcon } from 'lucide-react'

const CompanyTable = ({ data, loading }) => {
    if (loading) {
        return (
            <div className="space-y-3 animate-pulse">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="h-16 rounded-2xl bg-muted border border-border"
                    />
                ))}
            </div>
        )
    }

    if (!data?.length) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-16 border border-border rounded-2xl bg-background">
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                    <BuildingIcon className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-semibold text-foreground">No companies found</p>
                <p className="text-xs text-muted-foreground">Create your first company to get started</p>
            </div>
        )
    }

    return (
        <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm">
            {data.map((company, idx) => (
                <div
                    key={company._id}
                    className={`flex items-center gap-4 px-5 py-4 hover:bg-primary/5 transition-colors ${
                        idx !== data.length - 1 ? 'border-b border-border' : ''
                    }`}>
                    {/* Logo */}
                    <div className="w-10 h-10 rounded-xl border border-border overflow-hidden shrink-0 bg-muted flex items-center justify-center">
                        {company?.logo ? (
                            <img
                                src={company.logo}
                                alt={company.companyname}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <BuildingIcon className="w-4 h-4 text-muted-foreground" />
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{company?.companyname}</p>
                        {company?.location && (
                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                <MapPinIcon className="w-3 h-3" />
                                {company.location}
                            </span>
                        )}
                    </div>

                    {/* Edit */}
                    <Link
                        to={`/recruiter/companies/edit/${company._id}`}
                        className="w-8 h-8 rounded-xl border border-border flex items-center justify-center hover:border-primary/40 hover:bg-primary/5 transition-colors shrink-0">
                        <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default CompanyTable
