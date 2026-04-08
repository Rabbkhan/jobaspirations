// src/features/review/pages/WriteReviewPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StarIcon, UploadCloudIcon, CheckCircleIcon, ArrowLeftIcon, Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { useSubmitReviewMutation, useGetMyReviewQuery } from '../api/reviewApi'
import { Input } from '@/shared/ui/input'

// ── Star picker ──────────────────────────────────────────────
const StarPicker = ({ rating, onChange }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onClick={() => onChange(star)}
                className="transition-transform hover:scale-110">
                <StarIcon
                    className={`w-7 h-7 transition-colors ${
                        star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground hover:text-yellow-400'
                    }`}
                />
            </button>
        ))}
    </div>
)

const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
}

// ── Main page ────────────────────────────────────────────────
const WriteReviewPage = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [submitReview, { isLoading }] = useSubmitReviewMutation()

    const { data: myReviewData } = useGetMyReviewQuery(undefined, {
        skip: !user?.isPlaced
    })
    const myReview = myReviewData?.review

    const [formData, setFormData] = useState({
        placedAs: myReview?.placedAs || '',
        placedAt: myReview?.placedAt || '',
        rating: myReview?.rating || 0,
        review: myReview?.review || '',
        language: myReview?.language || 'english'
    })
    const [offerLetter, setOfferLetter] = useState(null)

    // Guards
    if (!user) {
        navigate('/login', { state: { redirect: '/review/write' } })
        return null
    }
    if (!user.isPlaced) {
        return (
            <div className="max-w-xl mx-auto my-20 px-4 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto">
                    <StarIcon className="w-6 h-6 text-yellow-500" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Not Eligible Yet</h2>
                <p className="text-sm text-muted-foreground">Our team will notify you once your placement is confirmed.</p>
                <button
                    onClick={() => navigate('/reviews')}
                    className="text-sm text-primary underline underline-offset-2">
                    Back to Reviews
                </button>
            </div>
        )
    }

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async () => {
        if (!formData.placedAs.trim()) return toast.error('Please enter your job title')
        if (!formData.placedAt.trim()) return toast.error('Please enter company name')
        if (!formData.rating) return toast.error('Please select a rating')
        if (formData.review.trim().length < 20) return toast.error('Review must be at least 20 characters')

        const data = new FormData()
        Object.keys(formData).forEach((key) => data.append(key, formData[key]))
        if (offerLetter) data.append('offerLetterImage', offerLetter)

        try {
            await submitReview(data).unwrap()
            toast.success('Review submitted! Pending admin approval.')
            navigate('/reviews')
        } catch (err) {
            toast.error(err?.data?.message || 'Submission failed')
        }
    }

    const inputClass =
        'w-full bg-muted/40 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

    const isResubmit = myReview?.status === 'rejected'

    return (
        <div className="max-w-2xl mx-auto my-10 px-4 space-y-8">
            {/* ── Header ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {isResubmit ? 'Edit review' : 'Write a review'}
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">{isResubmit ? 'Edit Your Review' : 'Share Your Story'}</h1>
                        <p className="text-xs text-muted-foreground">Your experience helps other students trust their journey</p>
                    </div>
                    <button
                        onClick={() => navigate('/reviews')}
                        className="inline-flex items-center gap-2 border border-border text-xs font-semibold px-4 py-2 rounded-xl hover:bg-muted transition-colors text-foreground">
                        <ArrowLeftIcon className="w-3.5 h-3.5" />
                        Back
                    </button>
                </div>
            </div>

            {/* ── Rejection notice ── */}
            {isResubmit && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <p className="text-xs font-semibold text-red-500">Rejection reason: {myReview.adminNote || 'Did not meet our guidelines'}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Please update your review and resubmit.</p>
                </div>
            )}

            {/* ── Form fields ── */}
            <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                {/* Placed as */}
                <div className="px-5 py-4 space-y-1.5">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Job title you got placed as</p>
                    <Input
                        placeholder="e.g. React Developer"
                        className={inputClass}
                        value={formData.placedAs}
                        onChange={(e) => handleChange('placedAs', e.target.value)}
                    />
                </div>

                {/* Placed at */}
                <div className="px-5 py-4 space-y-1.5">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Company you got placed at</p>
                    <Input
                        placeholder="e.g. TCS, Kolkata"
                        className={inputClass}
                        value={formData.placedAt}
                        onChange={(e) => handleChange('placedAt', e.target.value)}
                    />
                </div>

                {/* Rating */}
                <div className="px-5 py-4 space-y-2">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Your rating</p>
                    <div className="flex items-center gap-3">
                        <StarPicker
                            rating={formData.rating}
                            onChange={(val) => handleChange('rating', val)}
                        />
                        {formData.rating > 0 && <span className="text-xs font-semibold text-yellow-600">{ratingLabels[formData.rating]}</span>}
                    </div>
                </div>

                {/* Language */}
                <div className="px-5 py-4 space-y-2">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Write in</p>
                    <div className="flex flex-wrap gap-2">
                        {['english', 'hindi', 'bengali', 'other'].map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => handleChange('language', lang)}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors capitalize
                                    ${
                                        formData.language === lang
                                            ? 'bg-primary/10 text-primary border-primary/20'
                                            : 'bg-background text-muted-foreground border-border hover:border-primary/40'
                                    }`}>
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Review text */}
                <div className="px-5 py-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Your review</p>
                        <span className="text-[10px] text-muted-foreground">{formData.review.length}/1000</span>
                    </div>
                    <textarea
                        rows={5}
                        maxLength={1000}
                        placeholder="Share your experience — how did Job Aspirations help your career journey?"
                        className={inputClass}
                        value={formData.review}
                        onChange={(e) => handleChange('review', e.target.value)}
                    />
                    {formData.review.length > 0 && formData.review.length < 20 && (
                        <p className="text-xs text-red-500">Minimum 20 characters ({20 - formData.review.length} more needed)</p>
                    )}
                </div>

                {/* Offer letter upload */}
                <div className="px-5 py-4 space-y-2">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Offer letter (optional)</p>
                    {offerLetter ? (
                        <div className="flex items-center gap-3 p-3 border border-border rounded-xl bg-muted/40">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 shrink-0" />
                            <p className="text-xs font-semibold text-foreground flex-1 truncate">{offerLetter.name}</p>
                            <button
                                type="button"
                                onClick={() => setOfferLetter(null)}
                                className="text-xs text-red-500 hover:underline shrink-0">
                                Remove
                            </button>
                        </div>
                    ) : (
                        <label className="flex items-center gap-3 cursor-pointer border border-dashed border-border rounded-xl px-4 py-3 bg-muted/40 hover:bg-muted/70 hover:border-primary/40 transition-colors">
                            <UploadCloudIcon className="w-4 h-4 text-primary shrink-0" />
                            <div>
                                <p className="text-xs font-semibold text-foreground">Upload offer letter</p>
                                <p className="text-[11px] text-muted-foreground">PNG, JPG or PDF. Max 2MB.</p>
                            </div>
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={(e) => setOfferLetter(e.target.files[0])}
                            />
                        </label>
                    )}
                </div>
            </div>

            {/* ── Submit ── */}
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 min-w-[160px] justify-center">
                    {isLoading ? (
                        <>
                            <Loader2Icon className="w-4 h-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <CheckCircleIcon className="w-4 h-4" />
                            {isResubmit ? 'Resubmit Review' : 'Submit Review'}
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default WriteReviewPage
