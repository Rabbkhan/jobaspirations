// src/features/review/components/ReviewStats.jsx
import { StarIcon, UsersIcon, TrendingUpIcon } from 'lucide-react'

const StarRatingBar = ({ star, count, total }) => {
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-4">{star}</span>
            <StarIcon className="w-3 h-3 text-yellow-500 fill-yellow-500 shrink-0" />
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                    className="h-full bg-yellow-500 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
        </div>
    )
}

const ReviewStats = ({ stats }) => {
    if (!stats) return null

    const { totalReviews = 0, averageRating = 0, totalPlaced = 0, fiveStar = 0, fourStar = 0, threeStar = 0, twoStar = 0, oneStar = 0 } = stats

    return (
        <div className="border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
            <div className="h-2 w-full bg-primary/20" />
            <div className="px-6 py-5 grid md:grid-cols-3 gap-6">
                {/* Average rating */}
                <div className="flex flex-col items-center justify-center gap-2 border-r border-border pr-6">
                    <p className="text-5xl font-extrabold text-foreground">{averageRating.toFixed(1)}</p>
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                                key={star}
                                className={`w-4 h-4 ${
                                    star <= Math.round(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'
                                }`}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {totalReviews} review{totalReviews !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Rating breakdown */}
                <div className="flex flex-col justify-center gap-2 border-r border-border pr-6">
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase mb-1">Breakdown</p>
                    <StarRatingBar
                        star={5}
                        count={fiveStar}
                        total={totalReviews}
                    />
                    <StarRatingBar
                        star={4}
                        count={fourStar}
                        total={totalReviews}
                    />
                    <StarRatingBar
                        star={3}
                        count={threeStar}
                        total={totalReviews}
                    />
                    <StarRatingBar
                        star={2}
                        count={twoStar}
                        total={totalReviews}
                    />
                    <StarRatingBar
                        star={1}
                        count={oneStar}
                        total={totalReviews}
                    />
                </div>

                {/* Placed students */}
                <div className="flex flex-col justify-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                            <UsersIcon className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-foreground">{totalPlaced}</p>
                            <p className="text-xs text-muted-foreground">Students placed</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <TrendingUpIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-foreground">{totalReviews}</p>
                            <p className="text-xs text-muted-foreground">Verified reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewStats
