import { useParams, Link } from 'react-router-dom'
import { useGetBlogBySlugQuery, useGetLatestBlogsQuery, useGetRelatedBlogsQuery } from '@/features/blog/api/publicBlogApi'

import RelatedArticlesSidebar from '@/features/blog/components/RelatedArticlesSidebar'
import LatestBlogsSidebar from './LatestBlogsSidebar'
import BlogDetailsSkeleton from '@/features/blog/components/BlogDetailsSkeleton'

const BlogDetailsPage = () => {
    const { slug } = useParams()

    const { data: blogData, isLoading } = useGetBlogBySlugQuery(slug)
    const { data: relatedData } = useGetRelatedBlogsQuery(slug)
    const { data: latestData } = useGetLatestBlogsQuery()

    const blog = blogData?.blog
    const relatedBlogs = relatedData?.related || []
    const latestBlogs = latestData?.blogs || []

    if (isLoading) return <BlogDetailsSkeleton />

    if (!blog) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-semibold">Blog not found</h2>
                <Link
                    to="/blogs"
                    className="text-primary underline">
                    Go back
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-background py-12">
            <div className="container mx-auto grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <span className="bg-primary/10 px-4 py-1 rounded-full text-primary text-sm">{blog.category?.name}</span>

                    <h1 className="text-4xl font-bold">{blog.title}</h1>

                    <div className="text-sm text-muted-foreground flex gap-2">
                        <span>{blog.author?.fullname}</span>
                        <span>•</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>

                    {blog.featuredImage?.url && (
                        <img
                            src={blog.featuredImage.url}
                            alt={blog.title}
                            className="rounded-xl max-h-[420px] w-full object-cover"
                        />
                    )}

                    <article
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <Link
                        to="/blogs"
                        className="text-primary font-medium hover:underline">
                        ← Back to blogs
                    </Link>
                </div>

                <aside className="space-y-6">
                    <RelatedArticlesSidebar relatedArticle={relatedBlogs} />
                    <LatestBlogsSidebar latestBlogsArticle={latestBlogs} />
                </aside>
            </div>
        </div>
    )
}

export default BlogDetailsPage
