import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/ui/dialog'
import { toast } from 'sonner'
import { TagIcon, PencilIcon, Trash2Icon, PlusIcon, Loader2Icon } from 'lucide-react'

import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} from '@/features/blog/api/categoryApi'

const BlogCategories = () => {
    const { data, isLoading } = useGetCategoriesQuery()
    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const categories = data?.categories || []

    const [modalOpen, setModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [name, setName] = useState('')
    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        if (!name.trim()) {
            toast.error('Category name is required')
            return
        }
        setSaving(true)
        try {
            if (editingCategory) {
                await updateCategory({ id: editingCategory._id, name }).unwrap()
                toast.success('Category updated')
            } else {
                await createCategory({ name }).unwrap()
                toast.success('Category created')
            }
            closeModal()
        } catch {
            toast.error('Operation failed')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this category? This cannot be undone.')) return
        try {
            await deleteCategory(id).unwrap()
            toast.success('Category deleted')
        } catch {
            toast.error('Delete failed')
        }
    }

    const openEdit = (cat) => {
        setEditingCategory(cat)
        setName(cat.name)
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
        setEditingCategory(null)
        setName('')
    }

    return (
        <div className="space-y-8 max-w-3xl mx-auto px-4 py-8">
            {/* ── Header card ── */}
            <div className="relative border border-border rounded-2xl bg-background shadow-sm overflow-hidden">
                <div className="h-2 w-full bg-primary/20" />
                <div className="px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Blog management
                        </div>
                        <h1 className="text-xl font-bold text-foreground leading-tight">Blog categories</h1>
                        <p className="text-xs text-muted-foreground">
                            {isLoading ? '—' : `${categories.length} ${categories.length === 1 ? 'category' : 'categories'}`}
                        </p>
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shrink-0">
                        <PlusIcon className="w-3.5 h-3.5" />
                        New category
                    </button>
                </div>
            </div>

            {/* ── Section divider ── */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <TagIcon className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase whitespace-nowrap">All categories</p>
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
                            <div className="w-8 h-8 rounded-lg bg-muted shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <div className="h-3 bg-muted rounded w-28" />
                                <div className="h-2.5 bg-muted rounded w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 border border-dashed border-border rounded-2xl text-center">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                        <TagIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">No categories yet</p>
                    <p className="text-xs text-muted-foreground">Create your first category to organise blog posts.</p>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-1.5 mt-1 h-8 px-3 rounded-xl border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                        <PlusIcon className="w-3.5 h-3.5" />
                        Create first category
                    </button>
                </div>
            ) : (
                <div className="border border-border rounded-2xl bg-background overflow-hidden shadow-sm divide-y divide-border">
                    {categories.map((cat) => (
                        <div
                            key={cat._id}
                            className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors group">
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <TagIcon className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground leading-tight truncate">{cat.name}</p>
                                    <p className="text-[11px] text-muted-foreground truncate">/{cat.slug}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => openEdit(cat)}
                                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted transition-colors">
                                    <PencilIcon className="w-3 h-3" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(cat._id)}
                                    className="inline-flex items-center gap-1.5 h-7 px-3 rounded-lg border border-red-500/20 text-xs font-medium text-red-500 hover:bg-red-500/5 transition-colors">
                                    <Trash2Icon className="w-3 h-3" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Modal ── */}
            <Dialog
                open={modalOpen}
                onOpenChange={(o) => {
                    if (!o) closeModal()
                }}>
                <DialogContent className="max-w-sm p-0 overflow-hidden rounded-2xl border border-border">
                    <div className="h-1.5 w-full bg-primary/20" />
                    <div className="px-6 pt-4 pb-6 space-y-5">
                        <DialogHeader>
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full border border-primary/20 mb-1 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                {editingCategory ? 'Edit' : 'New'}
                            </div>
                            <DialogTitle className="text-base font-bold text-foreground">
                                {editingCategory ? 'Edit category' : 'Create category'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-1.5">
                            <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Category name</p>
                            <Input
                                placeholder="e.g. Career Tips"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                                className="bg-muted/40 border border-border rounded-xl h-10 text-sm focus:ring-2 focus:ring-primary/40"
                                autoFocus
                            />
                            <p className="text-[11px] text-muted-foreground">Slug will be auto-generated from the name.</p>
                        </div>
                        <DialogFooter className="gap-2 pt-1">
                            <button
                                onClick={closeModal}
                                disabled={saving}
                                className="inline-flex items-center justify-center h-9 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50">
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !name.trim()}
                                className="inline-flex items-center justify-center gap-2 h-9 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 min-w-[100px]">
                                {saving ? (
                                    <>
                                        <Loader2Icon className="w-3.5 h-3.5 animate-spin" /> Saving…
                                    </>
                                ) : editingCategory ? (
                                    'Update'
                                ) : (
                                    'Create'
                                )}
                            </button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BlogCategories
