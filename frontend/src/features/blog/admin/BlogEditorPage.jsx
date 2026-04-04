import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Input } from '@/shared/ui/input'
import { toast } from 'sonner'
import { useCreateBlogMutation, useGetAdminBlogByIdQuery, useUpdateBlogMutation } from '../api/adminBlogApi.js'
import { useGetCategoriesQuery } from '../api/categoryApi.js'
import BlogEditor from '../components/BlogEditor.jsx'
import { ArrowLeftIcon, UploadCloudIcon, XIcon, Loader2Icon, SaveIcon, EyeIcon, FileIcon, TagIcon } from 'lucide-react'

const inputClass =
    'w-full bg-muted/40 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors'

const BlogEditorPage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditing = Boolean(id)

    /* ── Queries ── */
    const { data: blogData, isLoading: blogLoading } = useGetAdminBlogByIdQuery(id, { skip: !id })
    const { data: categoriesData } = useGetCategoriesQuery()

    const [createBlog] = useCreateBlogMutation()
    const [updateBlog] = useUpdateBlogMutation()

    const existingBlog = blogData?.blog
    const categories = categoriesData?.categories || []

    /* ── Local state ── */
    const [form, setForm] = useState({
        title: '',
        content: '',
        category: '',
        published: false,
        image: null
    })
    const [preview, setPreview] = useState('')
    const [saving, setSaving] = useState(false)

    /* ── Populate on edit ── */
    useEffect(() => {
        if (existingBlog) {
            setForm({
                title: existingBlog.title,
                content: existingBlog.content,
                category: existingBlog.category?._id || '',
                published: existingBlog.published,
                image: null
            })
            setPreview(existingBlog.featuredImage?.url || '')
        }
    }, [existingBlog])

    /* ── Image handler ── */
    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        setForm((prev) => ({ ...prev, image: file }))
        setPreview(URL.createObjectURL(file))
    }

    /* ── Submit ── */
    const handleSave = async () => {
        if (!form.title.trim()) {
            toast.error('Title is required')
            return
        }
        if (!form.content) {
            toast.error('Content is required')
            return
        }
        if (!form.category) {
            toast.error('Category is required')
            return
        }
        if (form.published && !form.image && !existingBlog?.featuredImage) {
            toast.error('Featured image is required to publish')
            return
        }
        try {
            setSaving(true)
            if (isEditing) {
                await updateBlog({ id: existingBlog._id, formData: form }).unwrap()
                toast.success('Blog updated')
            } else {
                await createBlog(form).unwrap()
                toast.success('Blog created')
            }
            navigate('/admin/blogs')
        } catch (err) {
            toast.error(err?.data?.message || 'Save failed')
        } finally {
            setSaving(false)
        }
    }

    /* ── Loading state ── */
    if (isEditing && blogLoading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
                <div className="h-14 bg-muted animate-pulse rounded-2xl" />
                <div className="h-[420px] bg-muted animate-pulse rounded-2xl" />
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            {/* ── Header card ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Blog management
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">{isEditing ? 'Edit blog post' : 'Create blog post'}</h1>
                        <p className="text-xs text-muted-foreground">
                            {isEditing ? `Editing: ${existingBlog?.title ?? '…'}` : 'Fill in the details below'}
                        </p>
                    </div>
                    <Link
                        to="/admin/blogs"
                        className="inline-flex items-center gap-2 border border-border text-xs font-semibold px-4 py-2 rounded-xl hover:bg-muted transition-colors text-foreground shrink-0">
                        <ArrowLeftIcon className="w-3.5 h-3.5" />
                        Back
                    </Link>
                </div>
            </div>

            {/* ── Editor grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Main editor — 2/3 */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Section divider */}
                    <div className="flex items-center gap-3">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Content</p>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    {/* Title */}
                    <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                        <div className="px-5 py-4 space-y-1.5">
                            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Title</p>
                            <Input
                                placeholder="Enter blog title…"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className={inputClass}
                            />
                        </div>

                        {/* Rich text editor */}
                        <div className="px-5 py-4 space-y-1.5">
                            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Body</p>
                            <BlogEditor
                                value={form.content || ''}
                                onChange={(content) => setForm((prev) => ({ ...prev, content }))}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar — 1/3 */}
                <div className="space-y-4">
                    {/* Section divider */}
                    <div className="flex items-center gap-3">
                        <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">Settings</p>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                        {/* Category */}
                        <div className="px-5 py-4 space-y-1.5">
                            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase flex items-center gap-1.5">
                                <TagIcon className="w-3 h-3" /> Category
                            </p>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className={inputClass}>
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option
                                        key={cat._id}
                                        value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Publish toggle */}
                        <div className="px-5 py-4 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Status</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{form.published ? 'Publicly visible' : 'Saved as draft'}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setForm((p) => ({ ...p, published: !p.published }))}
                                className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full border text-[11px] font-semibold transition-colors ${
                                    form.published
                                        ? 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20'
                                        : 'bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20'
                                }`}>
                                {form.published ? (
                                    <>
                                        <EyeIcon className="w-3 h-3" /> Published
                                    </>
                                ) : (
                                    <>
                                        <FileIcon className="w-3 h-3" /> Draft
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Featured image */}
                        <div className="px-5 py-4 space-y-3">
                            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Featured image</p>

                            {preview ? (
                                <div className="space-y-2">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-32 object-cover rounded-xl border border-border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreview('')
                                            setForm((p) => ({ ...p, image: null }))
                                        }}
                                        className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg border border-red-500/20 text-xs font-medium text-red-500 hover:bg-red-500/5 transition-colors">
                                        <XIcon className="w-3 h-3" />
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <label className="flex items-center gap-3 cursor-pointer border border-dashed border-border rounded-xl px-4 py-3 bg-muted/40 hover:bg-muted/70 hover:border-primary/40 transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                        <UploadCloudIcon className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-foreground">Upload image</p>
                                        <p className="text-[11px] text-muted-foreground">PNG, JPG. Max 2MB.</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 w-full">
                            {saving ? (
                                <>
                                    <Loader2Icon className="w-4 h-4 animate-spin" /> Saving…
                                </>
                            ) : (
                                <>
                                    <SaveIcon className="w-4 h-4" /> {isEditing ? 'Update blog' : 'Create blog'}
                                </>
                            )}
                        </button>
                        <button
                            onClick={() => navigate('/admin/blogs')}
                            className="inline-flex items-center justify-center h-10 px-6 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors w-full">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogEditorPage
