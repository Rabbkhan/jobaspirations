import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

const BlogCard = ({ blog }) => {
    return (
        <Link
            to={`/blog/${blog.slug}`}
            className="group block w-full max-w-xs rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            {blog.featuredImage?.url && (
                <div className="h-36 w-full overflow-hidden">
                    <img
                        src={blog.featuredImage.url}
                        alt={blog.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-4 space-y-2">
                {/* Category */}
                {blog.category?.name && (
                    <Badge className="bg-primary/10 text-primary px-2 py-1 text-xs font-medium rounded-full">{blog.category.name}</Badge>
                )}

                {/* Title */}
                <h3 className="text-md font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {blog.title}
                </h3>

                {/* Snippet */}
                <p className="text-sm text-gray-600 line-clamp-3">{blog.content.replace(/<[^>]+>/g, '').slice(0, 150)}...</p>

                {/* Footer: Author & Date */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{blog.author?.name}</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
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
