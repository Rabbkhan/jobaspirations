// BlogDetailsSkeleton.jsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const BlogDetailsSkeleton = () => {
    return (
        <div className="bg-background py-12 animate-pulse">
            <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
                {/* Main Content Skeleton */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Category */}
                    <div className="h-5 w-24 bg-gray-300 rounded-full" />

                    {/* Title */}
                    <div className="h-10 w-3/4 bg-gray-300 rounded" />

                    {/* Meta */}
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-24 bg-gray-300 rounded" />
                        <div className="h-4 w-4 bg-gray-300 rounded" />
                        <div className="h-4 w-20 bg-gray-300 rounded" />
                        <div className="h-4 w-10 bg-gray-300 rounded" />
                    </div>

                    {/* Featured Image */}
                    <div className="h-72 w-full bg-gray-200 rounded-xl" />

                    {/* Content */}
                    <div className="space-y-4 mt-4">
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    </div>

                    {/* Author Section */}
                    <div className="mt-12 flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-gray-300" />
                        <div className="space-y-2">
                            <div className="h-4 w-32 bg-gray-300 rounded" />
                            <div className="h-3 w-28 bg-gray-200 rounded" />
                        </div>
                    </div>

                    {/* Back Link */}
                    <div className="mt-8 h-4 w-32 bg-gray-300 rounded" />
                </div>

                {/* Sidebar Skeleton */}
                <aside className="lg:col-span-1 space-y-6">
                    {/* Related Articles Skeleton */}
                    <Card className="w-full border border-gray-200 shadow-sm">
                        <CardHeader className="h-8 bg-gray-300 rounded mb-2" />
                        <CardContent className="space-y-4 p-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-300 rounded" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-full bg-gray-200 rounded" />
                                        <div className="h-3 w-20 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Latest Blogs Skeleton */}
                    <Card className="w-full border border-gray-200 shadow-sm">
                        <CardHeader className="h-8 bg-gray-300 rounded mb-2" />
                        <CardContent className="space-y-3 p-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2">
                                    <div className="w-12 h-12 bg-gray-300 rounded" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-full bg-gray-200 rounded" />
                                        <div className="h-3 w-16 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    )
}

export default BlogDetailsSkeleton
