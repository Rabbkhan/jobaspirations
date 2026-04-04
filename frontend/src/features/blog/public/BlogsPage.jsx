import { useState } from 'react'
import BlogCard from '@/features/blog/components/BlogCard'
import BlogCardSkeleton from '@/features/blog/components/BlogCardSkeleton'
import { useGetBlogsQuery } from '@/features/blog/api/publicBlogApi'
import { useGetCategoriesQuery } from '@/features/blog/api/categoryApi'
import { BookOpenIcon, RssIcon } from 'lucide-react'

const BlogsPage = () => {
    const [category, setCategory] = useState('')

    const { data: blogData, isLoading } = useGetBlogsQuery({ page: 1, limit: 10, category })
    const { data: categoryData } = useGetCategoriesQuery()

    const blogs = blogData?.blogs || []
    const categories = categoryData?.categories || []
    const isEmpty = !isLoading && blogs.length === 0

    return (
        <div className="min-h-screen bg-background">
            {/* ── Hero Band ── */}
            <div className="relative overflow-hidden border-b border-border bg-muted/40">
                {/* Decorative layer — full bleed intentionally */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-[15%] top-0 h-full w-px bg-border opacity-40" />
                    <div className="absolute left-[30%] top-0 h-full w-px bg-border opacity-20" />
                    <div className="absolute right-[15%] top-0 h-full w-px bg-border opacity-40" />
                    <div className="absolute top-1/3 left-0 w-full h-px bg-border opacity-25" />
                    <div className="absolute top-2/3 left-0 w-full h-px bg-border opacity-15" />
                    <div className="absolute -right-14 -top-14 w-64 h-64 rounded-full border border-border opacity-50" />
                    <div className="absolute -right-4 -top-4 w-40 h-40 rounded-full border border-border opacity-40" />
                    <div
                        className="absolute right-10 top-8 w-20 h-14 opacity-[.12]"
                        style={{
                            backgroundImage: 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)',
                            backgroundSize: '12px 12px'
                        }}
                    />
                </div>

                {/* ← constrained content width */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 py-14">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
                        {/* Left — headline */}
                        <div className="space-y-5">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full border border-primary/20">
                                <RssIcon className="w-3 h-3" />
                                Our Blog
                            </div>

                            <div>
                                <h1 className="text-5xl font-extrabold text-foreground tracking-tight leading-[1.05] m-0">Insights &amp;</h1>
                                <h1 className="text-5xl font-extrabold text-foreground tracking-tight leading-[1.05] m-0 flex items-center gap-4 flex-wrap">
                                    Updates
                                    <span className="inline-block h-[6px] w-20 rounded-full bg-primary/25 mb-1" />
                                </h1>
                            </div>

                            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                                Tutorials, deep-dives, and product news — written for builders and curious minds.
                            </p>
                        </div>

                        {/* Right — live stat */}
                        <div className="inline-flex items-center gap-3 bg-background border border-border rounded-2xl px-5 py-4 shrink-0 self-start sm:self-auto">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <BookOpenIcon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground leading-none m-0">{isLoading ? '—' : blogs.length}</p>
                                <p className="text-xs text-muted-foreground mt-0.5 m-0">{category ? 'in this category' : 'articles published'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Sticky Toolbar ── */}
            <div className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-xs text-muted-foreground">
                        {isLoading
                            ? 'Loading…'
                            : isEmpty
                              ? 'No articles found'
                              : `Showing ${blogs.length} article${blogs.length !== 1 ? 's' : ''}${category ? ' in this category' : ''}`}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => setCategory('')}
                            className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                                !category
                                    ? 'bg-primary/10 text-primary border-primary/20 font-medium'
                                    : 'bg-transparent text-muted-foreground border-border hover:bg-muted'
                            }`}>
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() => setCategory(cat._id)}
                                className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                                    category === cat._id
                                        ? 'bg-primary/10 text-primary border-primary/20 font-medium'
                                        : 'bg-transparent text-muted-foreground border-border hover:bg-muted'
                                }`}>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Card Grid ── */}
            <div className="max-w-5xl mx-auto px-6 py-10">
                {isEmpty ? (
                    <div className="flex flex-col items-center justify-center py-28 gap-4 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                            <BookOpenIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">No articles found</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">Try a different category or check back later.</p>
                        <button
                            onClick={() => setCategory('')}
                            className="text-sm text-primary font-medium hover:underline underline-offset-4 transition-colors">
                            Clear filter
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
                            : blogs.map((blog) => (
                                  <BlogCard
                                      key={blog._id}
                                      blog={blog}
                                  />
                              ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogsPage
