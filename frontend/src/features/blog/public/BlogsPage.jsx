import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../../../components/blog/BlogCard";
import CategoryFilter from "../../../components/blog/CategoryFilter";
import { PUBLIC_BLOG_API_END_POINT } from "../../../utils/constants";
import BlogCardSkeleton from "../../../components/common/loading/BlogCardSkeleton";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  /* =========================
     Fetch Blogs
  ========================= */
  const fetchBlogs = async () => {
    try {
      setLoading(true);
     const { data } = await axios.get(`${PUBLIC_BLOG_API_END_POINT}`, {
  params: {
    page: 1,
    limit: 10,
    ...(category && { category }),
  },
});


      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Fetch Categories
  ========================= */
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${PUBLIC_BLOG_API_END_POINT}/categories`
      );
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  useEffect(() => {
    fetchCategories();
  }, []);


  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-muted-foreground">
          Insights, tutorials, and updates
        </p>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selected={category}
        onChange={setCategory}
      />

      {/* Blog Grid */}
      
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {loading
    ? Array.from({ length: 8 }).map((_, i) => <BlogCardSkeleton key={i} />)
    : blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
</div>

        </div>

    </div>
  );
};

export default BlogsPage;
