import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useGetAdminBlogsQuery, useDeleteBlogMutation } from '@/features/blog/api/adminBlogApi'
import { FileTextIcon, PlusIcon, PencilIcon, Trash2Icon, CalendarIcon, EyeIcon, FileIcon } from 'lucide-react'

const Blogs = () => {
    const { data, isLoading } = useGetAdminBlogsQuery()
    const [deleteBlog] = useDeleteBlogMutation()

    const blogs = data?.blogs || []

    const handleDelete = async (id) => {
        if (!confirm('Are you sure? This cannot be undone.')) return
        try {
            await deleteBlog(id).unwrap()
            toast.success('Blog deleted')
        } catch {
            toast.error('Delete failed')
        }
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto px-4 py-8">
            {/* ── Header card ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Blog management
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">All blogs</h1>
                        <p className="text-xs text-muted-foreground">
                            {isLoading ? '—' : `${blogs.length} post${blogs.length !== 1 ? 's' : ''} total`}
                        </p>
                    </div>
                    <Link
                        to="/admin/blogs/new"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shrink-0">
                        <PlusIcon className="w-3.5 h-3.5" />
                        Create blog
                    </Link>
                </div>
            </div>

            {/* ── Section divider ── */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <FileTextIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Posts</p>
                </div>
                <div className="flex-1 h-px bg-border" />
            </div>

            {/* ── List ── */}
            {isLoading ? (
                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 px-5 py-4 animate-pulse">
                            <div className="w-10 h-10 rounded-xl bg-muted shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-muted rounded w-48" />
                                <div className="h-2.5 bg-muted rounded w-full max-w-sm" />
                            </div>
                            <div className="h-5 bg-muted rounded-full w-16 shrink-0" />
                            <div className="h-7 bg-muted rounded-xl w-20 shrink-0" />
                        </div>
                    ))}
                </div>
            ) : blogs.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 border border-dashed border-border rounded-2xl text-center">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                        <FileTextIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No blogs yet</p>
                    <p className="text-xs text-muted-foreground">Create your first blog post to get started.</p>
                    <Link
                        to="/admin/blogs/new"
                        className="inline-flex items-center gap-1.5 mt-1 h-8 px-3 rounded-xl border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                        <PlusIcon className="w-3.5 h-3.5" />
                        Create first blog
                    </Link>
                </div>
            ) : (
                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="flex items-start gap-4 px-5 py-4 hover:bg-muted/30 transition-colors group flex-wrap sm:flex-nowrap">
                            {/* Thumbnail / icon */}
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                                {blog.featuredImage?.url ? (
                                    <img
                                        src={blog.featuredImage.url}
                                        alt={blog.title}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                ) : (
                                    <FileIcon className="w-4 h-4 text-primary" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 space-y-1">
                                <p className="text-sm font-semibold text-foreground leading-tight line-clamp-1">{blog.title}</p>
                                <p className="text-[11px] text-muted-foreground line-clamp-1 leading-relaxed">
                                    {blog.content?.replace(/<[^>]+>/g, '').slice(0, 120)}…
                                </p>
                                <div className="flex items-center gap-3 pt-0.5">
                                    {blog.category?.name && (
                                        <span className="inline-flex items-center text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                                            {blog.category.name}
                                        </span>
                                    )}
                                    <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                                        <CalendarIcon className="w-3 h-3" />
                                        {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            {/* Status badge */}
                            <span
                                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 self-start mt-0.5 ${
                                    blog.published
                                        ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                        : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                }`}>
                                {blog.published ? (
                                    <>
                                        <EyeIcon className="w-2.5 h-2.5" /> Published
                                    </>
                                ) : (
                                    <>
                                        <FileIcon className="w-2.5 h-2.5" /> Draft
                                    </>
                                )}
                            </span>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity self-start mt-0.5">
                                <Link
                                    to={`/admin/blogs/${blog._id}/edit`}
                                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                                    <PencilIcon className="w-3 h-3" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg border border-red-500/20 text-xs font-medium text-red-500 hover:bg-red-500/5 transition-colors">
                                    <Trash2Icon className="w-3 h-3" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Blogs
