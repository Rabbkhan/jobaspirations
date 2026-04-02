import React, { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Badge } from '@/shared/ui/badge'
import { Card, CardHeader, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { useGetAppliedJobsQuery } from '@/features/job/api/jobApi.js'

const AppliedJobs = () => {
    const [statusFilter, setStatusFilter] = useState('All')
    const [page, setPage] = useState(1)

    const { data, isLoading } = useGetAppliedJobsQuery({
        page,
        limit: 10
    })

    const totalPages = data?.pagination?.totalPages || 1

    /* ---------------- Filter Jobs ---------------- */

    const filteredJobs = useMemo(() => {
        const applications = data?.applications || []
        if (statusFilter === 'All') return applications
        return applications.filter((job) => job.status === statusFilter)
    }, [data?.applications, statusFilter])

    /* ---------------- Date Format ---------------- */
    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })

    return (
        <div className="min-h-screen w-full bg-muted/20 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <Card className="shadow-xl border">
                    <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <h2 className="text-xl font-bold">Applied Jobs</h2>

                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardHeader>

                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Applied On</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {isLoading
                                    ? Array.from({ length: 10 }).map((_, idx) => (
                                          <TableRow
                                              key={idx}
                                              className="animate-pulse">
                                              <TableCell>
                                                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                                              </TableCell>
                                              <TableCell>
                                                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                                              </TableCell>
                                              <TableCell>
                                                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                                              </TableCell>
                                              <TableCell>
                                                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                                              </TableCell>
                                              <TableCell>
                                                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                                              </TableCell>
                                          </TableRow>
                                      ))
                                    : filteredJobs.map((item) => (
                                          <TableRow key={item._id}>
                                              <TableCell>{item?.job?.title}</TableCell>

                                              <TableCell>{item?.job?.company?.companyname || 'N/A'}</TableCell>

                                              <TableCell>{item?.job?.jobType || 'Full Time'}</TableCell>

                                              <TableCell>
                                                  <Badge
                                                      className={
                                                          item.status === 'pending'
                                                              ? 'bg-yellow-500/10 text-yellow-500'
                                                              : item.status === 'accepted'
                                                                ? 'bg-green-500/10 text-green-500'
                                                                : 'bg-red-500/10 text-red-500'
                                                      }>
                                                      {item.status}
                                                  </Badge>
                                              </TableCell>

                                              <TableCell>{formatDate(item?.createdAt)}</TableCell>
                                          </TableRow>
                                      ))}
                            </TableBody>
                        </Table>
                    </CardContent>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-6 mt-6">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 1 || isLoading}
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}>
                            ← Prev
                        </Button>

                        <span className="text-sm font-medium">
                            {page} / {totalPages}
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === totalPages || isLoading}
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}>
                            Next →
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AppliedJobs
