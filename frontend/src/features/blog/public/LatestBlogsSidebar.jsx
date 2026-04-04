import { Card, CardContent, CardHeader } from '@/shared/ui/card'
import { Avatar } from '@/shared/ui/avatar'
import { CalendarIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const LatestBlogsSidebar = ({ latestBlogsArticle = [] }) => {
    if (latestBlogsArticle.length === 0) {
        return (
            <Card className="w-full rounded-2xl border border-border bg-background shadow-none">
                <CardHeader className="border-b border-border px-4 py-3">
                    <h3 className="text-xs font-bold text-foreground tracking-wide uppercase">Latest Blogs</h3>
                </CardHeader>
                <CardContent className="px-4 py-5">
                    <p className="text-xs text-muted-foreground">No latest blogs found.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full rounded-2xl border border-border bg-background shadow-none">
            <CardHeader className="border-b border-border px-4 py-3">
                <h3 className="text-xs font-bold text-foreground tracking-wide uppercase">Latest Blogs</h3>
            </CardHeader>

            <CardContent className="px-2 py-2 space-y-0.5">
                {latestBlogsArticle.map((blog) => (
                    <Link
                        key={blog._id}
                        to={`/blog/${blog.slug}`}
                        className="group flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted transition-colors duration-150">
                        <Avatar className="w-10 h-10 rounded-lg shrink-0 overflow-hidden bg-muted border border-border">
                            {blog.featuredImage?.url ? (
                                <img
                                    src={blog.featuredImage.url}
                                    alt={blog.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                                />
                            ) : (
                                <span className="text-sm flex items-center justify-center w-full h-full">📝</span>
                            )}
                        </Avatar>

                        <div className="flex-1 min-w-0 space-y-0.5">
                            <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                {blog.title}
                            </p>
                            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                <CalendarIcon className="w-3 h-3" />
                                {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>
    )
}

export default LatestBlogsSidebar
