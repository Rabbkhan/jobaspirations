import { useState } from 'react'
import BlogCard from '@/features/blog/components/BlogCard'
import CategoryFilter from '../components/CategoryFilter'
import BlogCardSkeleton from '@/features/blog/components/BlogCardSkeleton'
import { useGetBlogsQuery } from '@/features/blog/api/publicBlogApi'
import { useGetCategoriesQuery } from '@/features/blog/api/categoryApi'

const BlogsPage = () => {
    const [category, setCategory] = useState('')

    const { data: blogData, isLoading } = useGetBlogsQuery({
        page: 1,
        limit: 10,
        category
    })

    const { data: categoryData } = useGetCategoriesQuery()

    const blogs = blogData?.blogs || []
    const categories = categoryData?.categories || []

    return (
        <div className="container mx-auto px-4 py-10 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Blog</h1>
                <p className="text-muted-foreground">Insights, tutorials, and updates</p>
            </div>

            <CategoryFilter
                categories={categories}
                selected={category}
                onChange={setCategory}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => <BlogCardSkeleton key={i} />)
                    : blogs.map((blog) => (
                          <BlogCard
                              key={blog._id}
                              blog={blog}
                          />
                      ))}
            </div>
        </div>
    )
}

export default BlogsPage
