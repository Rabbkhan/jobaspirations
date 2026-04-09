// src/features/review/pages/AdminReviewsPage.jsx
import { useState } from 'react'
import { CheckCircleIcon, XCircleIcon, Trash2Icon, StarIcon, ClockIcon, Users } from 'lucide-react'
import { toast } from 'sonner'
import {
    useGetAllReviewsAdminQuery,
    useApproveReviewMutation,
    useRejectReviewMutation,
    useDeleteReviewMutation,
    useMarkStudentAsPlacedMutation
} from '@/features/review/api/reviewApi.js'

const dummyReviews = [
    {
        _id: 'demo-1',
        status: 'pending',
        language: 'english',
        rating: 5,
        review: 'Job Aspirations helped me with mock interviews and resume feedback. The structure and mentorship made me job-ready.',
        placedAs: 'Frontend Developer',
        placedAt: 'TechNova Pvt Ltd',
        createdAt: new Date().toISOString(),
        student: {
            _id: 'demo-student-1',
            fullname: 'Demo Student',
            email: 'student1@example.com',
            isPlaced: true
        }
    },
    {
        _id: 'demo-2',
        status: 'approved',
        language: 'hindi',
        rating: 4,
        review: 'Mentors were supportive and gave clear weekly goals. This helped me stay focused and crack interviews confidently.',
        placedAs: 'Software Engineer',
        placedAt: 'InnoByte Solutions',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        student: {
            _id: 'demo-student-2',
            fullname: 'Placed Candidate',
            email: 'student2@example.com',
            isPlaced: true
        }
    }
]

// ── Status badge ─────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const config = {
        pending: { icon: ClockIcon, cls: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
        approved: { icon: CheckCircleIcon, cls: 'bg-green-500/10  text-green-600  border-green-500/20' },
        rejected: { icon: XCircleIcon, cls: 'bg-red-500/10    text-red-500    border-red-500/20' }
    }
    const { icon: Icon, cls } = config[status] || config.pending
    return (
        <div className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${cls} capitalize`}>
            <Icon className="w-3 h-3" />
            {status}
        </div>
    )
}

// ── Star rating ───────────────────────────────────────────────
const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
                key={star}
                className={`w-3 h-3 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
            />
        ))}
    </div>
)

// ── Reject modal ──────────────────────────────────────────────
const RejectModal = ({ onConfirm, onClose, isLoading }) => {
    const [reason, setReason] = useState('')
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative z-10 w-full max-w-sm border border-border rounded-2xl bg-background shadow-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-border bg-muted/40">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Action</p>
                    <h3 className="text-sm font-semibold text-foreground mt-0.5">Reject Review</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                    <p className="text-xs text-muted-foreground">Provide a reason so the student can improve and resubmit.</p>
                    <textarea
                        rows={3}
                        placeholder="e.g. Review contains inappropriate language..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full bg-muted/40 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="flex-1 text-xs font-semibold px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={() => onConfirm(reason)}
                            disabled={isLoading}
                            className="flex-1 text-xs font-semibold px-4 py-2 rounded-xl bg-red-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                            {isLoading ? 'Rejecting...' : 'Reject'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ── Main page ─────────────────────────────────────────────────
const AdminReviewsPage = () => {
    const [activeTab, setActiveTab] = useState('pending')
    const [rejectingId, setRejectingId] = useState(null)
    const [showRejectModal, setShowRejectModal] = useState(false)

    const { data, isLoading } = useGetAllReviewsAdminQuery(activeTab)
    const [approveReview, { isLoading: isApproving }] = useApproveReviewMutation()
    const [rejectReview, { isLoading: isRejecting }] = useRejectReviewMutation()
    const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation()
    const [markStudentAsPlaced, { isLoading: isMarkingPlaced }] = useMarkStudentAsPlacedMutation()

    const reviews = data?.reviews || []
    const showDummy = !isLoading && reviews.length === 0
    const visibleReviews = showDummy ? dummyReviews : reviews

    const tabs = [
        { value: 'all', label: 'All' },
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' }
    ]

    const handleApprove = async (id) => {
        try {
            await approveReview(id).unwrap()
            toast.success('Review approved!')
        } catch {
            toast.error('Failed to approve review')
        }
    }

    const handleRejectConfirm = async (reason) => {
        try {
            await rejectReview({ id: rejectingId, reason }).unwrap()
            toast.success('Review rejected')
            setShowRejectModal(false)
            setRejectingId(null)
        } catch {
            toast.error('Failed to reject review')
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteReview(id).unwrap()
            toast.success('Review deleted')
        } catch {
            toast.error('Failed to delete review')
        }
    }

    const handleMarkPlaced = async (studentId) => {
        try {
            await markStudentAsPlaced(studentId).unwrap()
            toast.success('Student marked as placed')
        } catch {
            toast.error('Failed to mark student as placed')
        }
    }

    return (
        <div className="max-w-5xl mx-auto my-10 px-4 space-y-8">
            {/* ── Reject modal ── */}
            {showRejectModal && (
                <RejectModal
                    onConfirm={handleRejectConfirm}
                    onClose={() => {
                        setShowRejectModal(false)
                        setRejectingId(null)
                    }}
                    isLoading={isRejecting}
                />
            )}

            {/* ── Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Admin panel
                    </div>
                    <h1 className="text-xl font-bold text-foreground leading-tight">Manage Reviews</h1>
                    <p className="text-xs text-muted-foreground mt-1">Approve or reject student reviews before they go live</p>
                </div>
            </div>

            {/* ── Tabs ── */}
            <div className="flex items-center gap-2 border-b border-border pb-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={`text-xs font-semibold px-4 py-2.5 border-b-2 transition-colors ${
                            activeTab === tab.value ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ── Loading ── */}
            {isLoading ? (
                <div className="space-y-3 animate-pulse">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="h-24 rounded-2xl bg-muted border border-border"
                        />
                    ))}
                </div>
            ) : (
                <>
                    {showDummy && (
                        <div className="px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <p className="text-xs font-semibold text-amber-600">No live reviews found for this filter.</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Showing demo placeholders for UI preview.</p>
                        </div>
                    )}
                    <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm">
                        {visibleReviews.map((review, idx) => (
                            <div
                                key={review._id}
                                className={`px-5 py-4 space-y-3 ${idx !== visibleReviews.length - 1 ? 'border-b border-border' : ''}`}>
                                {/* Top row */}
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                        <span className="text-[11px] font-bold text-primary">
                                            {review.student?.fullname?.charAt(0)?.toUpperCase() ?? '?'}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="text-sm font-semibold text-foreground">{review.student?.fullname}</p>
                                            <StatusBadge status={review.status} />
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground capitalize">
                                                {review.language}
                                            </span>
                                            {review.student?.isPlaced && (
                                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600">
                                                    Placed
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">{review.student?.email}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Placed as <span className="font-semibold text-foreground">{review.placedAs}</span> at{' '}
                                            <span className="font-semibold text-foreground">{review.placedAt}</span>
                                        </p>
                                    </div>

                                    {/* Date */}
                                    <p className="text-[11px] text-muted-foreground shrink-0">
                                        {new Date(review.createdAt).toLocaleDateString('en-IN')}
                                    </p>
                                </div>

                                {/* Star rating */}
                                <StarRating rating={review.rating} />

                                {/* Review text */}
                                <p className="text-sm text-muted-foreground leading-relaxed">{review.review}</p>

                                {/* Admin note if rejected */}
                                {review.status === 'rejected' && review.adminNote && (
                                    <div className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20">
                                        <p className="text-xs text-red-500">
                                            <span className="font-semibold">Rejection reason:</span> {review.adminNote}
                                        </p>
                                    </div>
                                )}

                                {/* Offer letter */}
                                {review.offerLetterImage && (
                                    <a
                                        href={review.offerLetterImage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-primary border border-primary/20 bg-primary/5 px-2.5 py-1 rounded-full hover:bg-primary/10 transition-colors">
                                        View offer letter
                                    </a>
                                )}

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-1">
                                    {review.status !== 'approved' && (
                                        <button
                                            onClick={() => handleApprove(review._id)}
                                            disabled={isApproving || showDummy}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-green-500/10 text-green-600 border border-green-500/20 hover:bg-green-500/20 transition-colors disabled:opacity-50">
                                            <CheckCircleIcon className="w-3.5 h-3.5" />
                                            Approve
                                        </button>
                                    )}
                                    {review.status !== 'rejected' && (
                                        <button
                                            onClick={() => {
                                                setRejectingId(review._id)
                                                setShowRejectModal(true)
                                            }}
                                            disabled={showDummy}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50">
                                            <XCircleIcon className="w-3.5 h-3.5" />
                                            Reject
                                        </button>
                                    )}
                                    {!review.student?.isPlaced && (
                                        <button
                                            onClick={() => handleMarkPlaced(review.student?._id)}
                                            disabled={isMarkingPlaced || !review.student?._id || showDummy}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 hover:bg-blue-500/20 transition-colors disabled:opacity-50">
                                            Mark Placed
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        disabled={isDeleting || showDummy}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-border text-muted-foreground hover:border-red-500/20 hover:text-red-500 hover:bg-red-500/5 transition-colors disabled:opacity-50">
                                        <Trash2Icon className="w-3.5 h-3.5" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default AdminReviewsPage
