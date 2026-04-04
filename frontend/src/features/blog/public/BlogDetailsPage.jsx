import { useParams, Link } from 'react-router-dom'
import { useGetBlogBySlugQuery, useGetLatestBlogsQuery, useGetRelatedBlogsQuery } from '@/features/blog/api/publicBlogApi'
import { ArrowLeftIcon, CalendarIcon, UserIcon } from 'lucide-react'
import { Badge } from '@/shared/ui/badge'

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
            <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 text-center px-4">
                <span className="text-5xl">📭</span>
                <h2 className="text-xl font-bold text-foreground">Blog not found</h2>
                <p className="text-sm text-muted-foreground">This article may have been moved or deleted.</p>
                <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline underline-offset-4 transition-colors">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to blogs
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-background py-12 px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-10">
                {/* ── Main Content ── */}
                <div className="lg:col-span-2 space-y-7">
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium group">
                        <ArrowLeftIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Back to blogs
                    </Link>

                    {blog.category?.name && (
                        <Badge className="bg-primary/10 text-primary border-0 text-xs font-medium rounded-full px-3 py-1">{blog.category.name}</Badge>
                    )}

                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight">{blog.title}</h1>

                    <div className="flex items-center gap-4 pt-1 border-t border-border pb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <UserIcon className="w-3.5 h-3.5" />
                            {blog.author?.fullname ?? 'Anonymous'}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    {blog.featuredImage?.url ? (
                        <div className="w-full rounded-2xl overflow-hidden border border-border max-h-[420px]">
                            <img
                                src={blog.featuredImage.url}
                                alt={blog.title}
                                className="w-full h-full max-h-[420px] object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full rounded-2xl border border-border bg-muted h-52 flex items-center justify-center">
                            <span className="text-4xl">📝</span>
                        </div>
                    )}

                    <article
                        className="prose prose-sm max-w-none
                            prose-headings:font-bold prose-headings:text-foreground
                            prose-p:text-muted-foreground prose-p:leading-relaxed
                            prose-a:text-primary prose-a:underline-offset-4
                            prose-strong:text-foreground
                            prose-blockquote:border-primary/40 prose-blockquote:text-muted-foreground
                            prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:text-sm
                            prose-img:rounded-xl prose-img:border prose-img:border-border"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <div className="pt-4 border-t border-border">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline underline-offset-4 transition-colors group">
                            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                            Back to all blogs
                        </Link>
                    </div>
                </div>

                {/* ── Sidebar ── */}
                <aside className="space-y-6">
                    <RelatedArticlesSidebar relatedArticle={relatedBlogs} />
                    <LatestBlogsSidebar latestBlogsArticle={latestBlogs} />
                </aside>
            </div>
        </div>
    )
}

export default BlogDetailsPage
