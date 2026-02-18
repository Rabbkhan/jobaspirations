import { Card, CardHeader, CardContent } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { Separator } from '@/shared/ui/separator'

const JobDetailsSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <Card className="shadow-lg border border-border rounded-xl">
                    {/* HEADER */}
                    <CardHeader className="space-y-4">
                        {/* Title */}
                        <Skeleton className="h-8 w-3/4" />

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <Separator />

                        {/* Description */}
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>

                        {/* Requirements */}
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>

                        <Separator />

                        {/* Salary + Button */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-12 w-full md:w-40 rounded-lg" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default JobDetailsSkeleton
