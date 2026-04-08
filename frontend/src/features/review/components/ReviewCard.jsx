// src/features/review/components/ReviewCard.jsx
import { StarIcon } from 'lucide-react'

const StarRating = ({ rating }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
                key={star}
                className={`w-3.5 h-3.5 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
            />
        ))}
    </div>
)

const languageLabel = {
    english: 'EN',
    hindi: 'HI',
    bengali: 'BN',
    other: 'OT'
}

const ReviewCard = ({ review }) => {
    const { student, placedAs, placedAt, rating, review: reviewText, language, createdAt, isEdited } = review

    return (
        <div className="group flex flex-col gap-4 p-5 border border-border rounded-2xl bg-background hover:border-primary/40 hover:bg-primary/5 transition-all shadow-sm">
            {/* Header — avatar + name + language */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    {student?.profile?.profilePhoto ? (
                        <img
                            src={student.profile.profilePhoto}
                            alt={student.fullname}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <span className="text-sm font-bold text-primary">{student?.fullname?.charAt(0)?.toUpperCase() ?? '?'}</span>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{student?.fullname ?? 'Anonymous'}</p>
                    <p className="text-xs text-muted-foreground truncate">
                        {placedAs} — {placedAt}
                    </p>
                </div>

                {/* Language badge */}
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
                    {languageLabel[language] ?? 'EN'}
                </span>
            </div>

            {/* Star rating */}
            <StarRating rating={rating} />

            {/* Review text */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">{reviewText}</p>

            {/* Footer — date + edited badge */}
            <div className="flex items-center justify-between pt-1 border-t border-border">
                <p className="text-[11px] text-muted-foreground">
                    {new Date(createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })}
                </p>
                {isEdited && <span className="text-[10px] text-muted-foreground italic">edited</span>}
            </div>
        </div>
    )
}

export default ReviewCard
