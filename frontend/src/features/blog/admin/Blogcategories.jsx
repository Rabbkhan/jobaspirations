import { useState } from 'react'
import { Card, CardHeader } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/ui/dialog'
import { toast } from 'sonner'

import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} from '@/features/blog/api/categoryApi'

const BlogCategories = () => {
    const { data } = useGetCategoriesQuery()
    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const categories = data?.categories || []

    const [modalOpen, setModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState(null)
    const [name, setName] = useState('')

    const handleSave = async () => {
        if (!name.trim()) {
            toast.error('Category name required')
            return
        }

        try {
            if (editingCategory) {
                await updateCategory({
                    id: editingCategory._id,
                    name
                }).unwrap()

                toast.success('Category updated')
            } else {
                await createCategory({ name }).unwrap()

                toast.success('Category created')
            }

            setModalOpen(false)
            setEditingCategory(null)
            setName('')
        } catch {
            toast.error('Operation failed')
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Delete this category?')) return

        try {
            await deleteCategory(id).unwrap()
            toast.success('Category deleted')
        } catch {
            toast.error('Delete failed')
        }
    }

    const openEdit = (category) => {
        setEditingCategory(category)
        setName(category.name)
        setModalOpen(true)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blog Categories</h2>
                <Button onClick={() => setModalOpen(true)}>Create Category</Button>
            </div>

            <div className="grid gap-3">
                {categories.map((cat) => (
                    <Card key={cat._id}>
                        <CardHeader className="flex justify-between items-center">
                            <div>
                                <p className="font-medium">{cat.name}</p>
                                <p className="text-xs text-muted-foreground">Slug: {cat.slug}</p>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    onClick={() => openEdit(cat)}>
                                    Edit
                                </Button>

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(cat._id)}>
                                    Delete
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <Dialog
                open={modalOpen}
                onOpenChange={(o) => {
                    setModalOpen(o)

                    if (!o) {
                        setEditingCategory(null)
                        setName('')
                    }
                }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? 'Edit Category' : 'Create Category'}</DialogTitle>
                    </DialogHeader>

                    <Input
                        placeholder="Category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <DialogFooter>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BlogCategories
