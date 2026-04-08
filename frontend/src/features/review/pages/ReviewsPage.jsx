// src/features/review/pages/ReviewsPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StarIcon, ClockIcon, CheckCircleIcon, XCircleIcon, SparklesIcon, XIcon } from 'lucide-react'
import { useGetApprovedReviewsQuery, useGetReviewStatsQuery, useGetMyReviewQuery } from '../api/reviewApi'
import ReviewCard from '../components/ReviewCard'
import ReviewStats from '../components/ReviewStats'
import ReviewFilter from '../components/ReviewFilter'

// ── Status banners ────────────────────────────────────────────

const LoginBanner = ({ onLogin }) => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border border-border rounded-2xl bg-background">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <SparklesIcon className="w-4 h-4 text-primary" />
            </div>
            <div>
                <p className="text-sm font-semibold text-foreground">Got placed through us?</p>
                <p className="text-xs text-muted-foreground">Share your story and inspire others 🌟</p>
            </div>
        </div>
        <button
            onClick={onLogin}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
            Login to Write a Review
        </button>
    </div>
)

const NotPlacedBanner = () => (
    <div className="flex items-center gap-4 p-5 border border-border rounded-2xl bg-background">
        <div className="w-9 h-9 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
            <SparklesIcon className="w-4 h-4 text-yellow-500" />
        </div>
        <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Your Success Story Matters 🌟</p>
            <p className="text-xs text-muted-foreground mt-0.5">
                Our team will notify you once your placement is confirmed. Got placed? Contact us at{' '}
                <a
                    href="mailto:info@jobaspirations.in"
                    className="text-primary underline underline-offset-2">
                    info@jobaspirations.in
                </a>
            </p>
        </div>
    </div>
)

const WriteReviewBanner = ({ onWrite }) => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 border border-green-500/20 rounded-2xl bg-green-500/5">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <CheckCircleIcon className="w-4 h-4 text-green-600" />
            </div>
            <div>
                <p className="text-sm font-semibold text-foreground">Congratulations on your placement! 🎉</p>
                <p className="text-xs text-muted-foreground">Your story can inspire other students</p>
            </div>
        </div>
        <button
            onClick={onWrite}
            className="inline-flex items-center gap-2 bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
            Share Your Story →
        </button>
    </div>
)

const PendingBanner = () => (
    <div className="flex items-center gap-4 p-5 border border-yellow-500/20 rounded-2xl bg-yellow-500/5">
        <div className="w-9 h-9 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
            <ClockIcon className="w-4 h-4 text-yellow-500" />
        </div>
        <div>
            <p className="text-sm font-semibold text-foreground">Review Under Review ⏳</p>
            <p className="text-xs text-muted-foreground mt-0.5">
                Your review has been submitted and is pending admin approval. We'll notify you once it's live.
            </p>
        </div>
    </div>
)

const ApprovedBanner = () => (
    <div className="flex items-center gap-4 p-5 border border-green-500/20 rounded-2xl bg-green-500/5">
        <div className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
            <CheckCircleIcon className="w-4 h-4 text-green-600" />
        </div>
        <div>
            <p className="text-sm font-semibold text-foreground">Your Review is Live! ✅</p>
            <p className="text-xs text-muted-foreground mt-0.5">Thank you for inspiring other students with your story 💙</p>
        </div>
    </div>
)

const RejectedBanner = ({ reason, onEdit }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border border-red-500/20 rounded-2xl bg-red-500/5">
        <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <XCircleIcon className="w-4 h-4 text-red-500" />
            </div>
            <div>
                <p className="text-sm font-semibold text-foreground">Review Not Approved</p>
                <p className="text-xs text-muted-foreground mt-0.5">Reason: {reason || 'Did not meet our guidelines'}</p>
            </div>
        </div>
        <button
            onClick={onEdit}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
            Edit & Resubmit →
        </button>
    </div>
)

const ReviewStatusBanner = ({ user, myReview, onLogin, onWrite, onEdit }) => {
    if (!user) return <LoginBanner onLogin={onLogin} />
    if (!user.isPlaced) return <NotPlacedBanner />
    if (!user.hasReviewed) return <WriteReviewBanner onWrite={onWrite} />
    if (myReview?.status === 'pending') return <PendingBanner />
    if (myReview?.status === 'approved') return <ApprovedBanner />
    if (myReview?.status === 'rejected')
        return (
            <RejectedBanner
                reason={myReview.adminNote}
                onEdit={onEdit}
            />
        )
    return null
}

// ── Main page ────────────────────────────────────────────

const ReviewsPage = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const [language, setLanguage] = useState('all')
    const [rating, setRating] = useState('all')
    const [page, setPage] = useState(1)

    const { data: reviewsData, isLoading: reviewsLoading } = useGetApprovedReviewsQuery({
        language: language !== 'all' ? language : undefined,
        rating: rating !== 'all' ? rating : undefined,
        page,
        limit: 9
    })

    const { data: statsData } = useGetReviewStatsQuery()

    const { data: myReviewData } = useGetMyReviewQuery(undefined, {
        skip: !user || !user.isPlaced
    })

    const reviews = reviewsData?.reviews || []
    const total = reviewsData?.total || 0
    const totalPages = reviewsData?.totalPages || 1
    const stats = statsData?.stats
    const myReview = myReviewData?.review

    // ✅ Fixed: was /reviews/write — now matches the actual route /review/write
    const handleLogin = () => navigate('/login', { state: { redirect: '/review/write' } })
    const handleWrite = () => navigate('/review/write')
    const handleEdit = () => navigate('/review/write')

    return (
        <div className="max-w-5xl mx-auto my-10 px-4 space-y-8">
            {/* ── Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-2">
                        <SparklesIcon className="w-3 h-3" />
                        Student reviews
                    </div>
                    <h1 className="text-xl font-bold text-foreground leading-tight">What Our Students Say</h1>
                    <p className="text-xs text-muted-foreground mt-1">Real reviews from real placed students — verified by our team</p>
                </div>
            </div>

            {/* ── Status banner ── */}
            <ReviewStatusBanner
                user={user}
                myReview={myReview}
                onLogin={handleLogin}
                onWrite={handleWrite}
                onEdit={handleEdit}
            />

            {/* ── Stats ── */}
            {stats && <ReviewStats stats={stats} />}

            {/* ── Section divider ── */}
            <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">
                    {total} review{total !== 1 ? 's' : ''}
                </p>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* ── Filters ── */}
            <ReviewFilter
                language={language}
                rating={rating}
                onLanguageChange={(val) => {
                    setLanguage(val)
                    setPage(1)
                }}
                onRatingChange={(val) => {
                    setRating(val)
                    setPage(1)
                }}
            />

            {/* ── Reviews grid ── */}
            {reviewsLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-48 rounded-2xl bg-muted border border-border animate-pulse"
                        />
                    ))}
                </div>
            ) : reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-16 border border-border rounded-2xl bg-background">
                    <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center">
                        <StarIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No reviews yet</p>
                    <p className="text-xs text-muted-foreground">Be the first to share your success story 🚀</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            review={review}
                        />
                    ))}
                </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="text-xs font-semibold px-4 py-2 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Previous
                    </button>
                    <span className="text-xs text-muted-foreground">
                        {page} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="text-xs font-semibold px-4 py-2 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}

export default ReviewsPage
