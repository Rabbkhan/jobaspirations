import { Link } from 'react-router-dom'
import { Card, CardHeader, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'

import { useGetAdminBlogsQuery, useDeleteBlogMutation } from '@/features/blog/api/adminBlogApi'

const Blogs = () => {
    const { data } = useGetAdminBlogsQuery()
    const [deleteBlog] = useDeleteBlogMutation()

    const blogs = data?.blogs || []

    const handleDelete = async (id) => {
        if (!confirm('Are you sure?')) return

        try {
            await deleteBlog(id).unwrap()
            toast.success('Blog deleted')
        } catch {
            toast.error('Delete failed')
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blog Management</h2>

                <Button asChild>
                    <Link to="/admin/blogs/new">Create Blog</Link>
                </Button>
            </div>

            {blogs.map((blog) => (
                <Card key={blog._id}>
                    <CardHeader className="flex justify-between items-center">
                        <h3 className="font-semibold">{blog.title}</h3>

                        <span>{blog.published ? 'Published' : 'Draft'}</span>
                    </CardHeader>

                    <CardContent className="flex justify-between items-center">
                        <p>{blog.content.slice(0, 120)}...</p>

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                asChild>
                                <Link to={`/admin/blogs/${blog._id}/edit`}>Edit</Link>
                            </Button>

                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(blog._id)}>
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default Blogs
