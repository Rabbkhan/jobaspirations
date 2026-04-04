import { Link } from 'react-router-dom'
import { Badge } from '@/shared/ui/badge'
import { CalendarIcon, UserIcon } from 'lucide-react'

const BlogCard = ({ blog }) => {
    const snippet = blog.content?.replace(/<[^>]+>/g, '')?.slice(0, 120)

    return (
        <Link
            to={`/blog/${blog.slug}`}
            className="group flex flex-col w-full rounded-2xl overflow-hidden border border-border bg-background hover:border-primary/40 hover:shadow-md transition-all duration-200">
            {/* image */}
            {blog.featuredImage?.url ? (
                <div className="h-44 w-full overflow-hidden bg-muted shrink-0">
                    <img
                        src={blog.featuredImage.url}
                        alt={blog.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            ) : (
                <div className="h-44 w-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-3xl">📝</span>
                </div>
            )}

            {/* content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                {/* category badge */}
                {blog.category?.name && (
                    <Badge className="self-start bg-primary/10 text-primary border-0 text-xs font-medium rounded-full px-3 py-1">
                        {blog.category.name}
                    </Badge>
                )}

                {/* title */}
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                </h3>

                {/* snippet */}
                {snippet && <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed flex-1">{snippet}...</p>}

                {/* footer */}
                <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <UserIcon className="w-3 h-3" />
                        {blog.author?.name ?? 'Anonymous'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarIcon className="w-3 h-3" />
                        {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
