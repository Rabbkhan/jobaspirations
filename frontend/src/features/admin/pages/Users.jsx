import { useGetAdminStudentsQuery } from '@/features/admin/api/adminAuthApi'
import { useMarkStudentAsPlacedMutation } from '@/features/review/api/reviewApi'
import { toast } from 'sonner'
import { CheckCircleIcon, UsersIcon } from 'lucide-react'

const Users = () => {
    const { data, isLoading, refetch } = useGetAdminStudentsQuery()
    const [markStudentAsPlaced, { isLoading: isMarking }] = useMarkStudentAsPlacedMutation()
    const students = data?.students || []

    const handleMarkPlaced = async (studentId) => {
        try {
            await markStudentAsPlaced(studentId).unwrap()
            toast.success('Student marked as placed')
            refetch()
        } catch (err) {
            toast.error(err?.data?.message || 'Failed to mark as placed')
        }
    }

    return (
        <div className="space-y-6 max-w-5xl mx-auto px-4 py-8">
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Admin panel
                    </div>
                    <h1 className="text-xl font-bold text-foreground leading-tight">Students</h1>
                    <p className="text-xs text-muted-foreground mt-1">Mark placed students to enable review submission.</p>
                </div>
            </div>

            {isLoading ? (
                <div className="space-y-3 animate-pulse">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-20 rounded-2xl bg-muted border border-border"
                        />
                    ))}
                </div>
            ) : students.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 border border-border rounded-2xl bg-background">
                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                        <UsersIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No students found</p>
                </div>
            ) : (
                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm">
                    {students.map((student, idx) => (
                        <div
                            key={student._id}
                            className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                idx !== students.length - 1 ? 'border-b border-border' : ''
                            }`}>
                            <div className="space-y-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">{student.fullname}</p>
                                <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                            student.isPlaced
                                                ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                                        }`}>
                                        {student.isPlaced ? 'Placed' : 'Not placed'}
                                    </span>
                                    {student.placedAt && <span className="text-[10px] text-muted-foreground">on {new Date(student.placedAt).toLocaleDateString('en-IN')}</span>}
                                </div>
                            </div>

                            <button
                                onClick={() => handleMarkPlaced(student._id)}
                                disabled={student.isPlaced || isMarking}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500/20 transition-colors disabled:opacity-50">
                                <CheckCircleIcon className="w-3.5 h-3.5" />
                                {student.isPlaced ? 'Already Placed' : 'Mark Placed'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Users
