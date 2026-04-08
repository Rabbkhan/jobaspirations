// src/features/review/components/ReviewFilter.jsx
import { StarIcon } from 'lucide-react'

const languages = [
    { value: 'all', label: 'All' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'other', label: 'Other' }
]

const ratings = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Star' },
    { value: '4', label: '4 Star' },
    { value: '3', label: '3 Star' },
    { value: '2', label: '2 Star' },
    { value: '1', label: '1 Star' }
]

const ReviewFilter = ({ language, rating, onLanguageChange, onRatingChange }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            {/* Language filter */}
            <div className="space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Language</p>
                <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                        <button
                            key={lang.value}
                            onClick={() => onLanguageChange(lang.value)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors
                                ${
                                    language === lang.value
                                        ? 'bg-primary/10 text-primary border-primary/20'
                                        : 'bg-background text-muted-foreground border-border hover:border-primary/40 hover:bg-primary/5'
                                }`}>
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px bg-border" />

            {/* Rating filter */}
            <div className="space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Rating</p>
                <div className="flex flex-wrap gap-2">
                    {ratings.map((r) => (
                        <button
                            key={r.value}
                            onClick={() => onRatingChange(r.value)}
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors
                                ${
                                    rating === r.value
                                        ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                                        : 'bg-background text-muted-foreground border-border hover:border-yellow-500/20 hover:bg-yellow-500/5'
                                }`}>
                            {r.value !== 'all' && <StarIcon className="w-3 h-3 fill-yellow-500 text-yellow-500" />}
                            {r.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReviewFilter
