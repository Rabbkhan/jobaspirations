import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { PUBLIC_BLOG_API_END_POINT } from "../../../utils/constants";
import RelatedArticlesSidebar from "@/features/blog/components/RelatedArticlesSidebar";
import LatestBlogsSidebar from "./LatestBlogsSidebar";
import BlogDetailsSkeleton from "@/features/blog/components/BlogDetailsSkeleton";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`${PUBLIC_BLOG_API_END_POINT}/${slug}`);
      console.log(data.blog.content); // <-- ADD THIS LINE
      setBlog(data.blog);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${PUBLIC_BLOG_API_END_POINT}/related/${slug}`
      );
      setRelatedBlogs(data.related || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLatestBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${PUBLIC_BLOG_API_END_POINT}/latest/?page=1&limit=4`
      );
      setLatestBlogs(data.blogs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchRelatedBlogs();
    fetchLatestBlogs();
  }, [slug]);

  if (loading) return <BlogDetailsSkeleton />;
  if (!blog)
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Blog not found</h2>
        <Link to="/blogs" className="text-primary underline">
          Go back
        </Link>
      </div>
    );

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            {blog.category?.name}
          </span>

          <h1 className="text-4xl font-bold tracking-tight leading-tight text-foreground">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {blog.author?.fullname}
            </span>
            <span>•</span>
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {blog.featuredImage?.url && (
            <img
              src={blog.featuredImage.url}
              alt={blog.title}
              className="w-full rounded-xl object-cover max-h-[420px]"
            />
          )}

          {/* ✅ Render rich HTML properly */}
         <article
  className="
    prose prose-lg max-w-none

    /* Paragraph spacing */
    prose-p:my-6

    /* Heading spacing */
    prose-h1:mb-8 prose-h1:mt-0
    prose-h2:mt-12 prose-h2:mb-6
    prose-h3:mt-10 prose-h3:mb-4

    /* Lists */
    prose-ul:my-6
    prose-ol:my-6
    prose-li:my-2

    /* Line height only */
    prose-p:leading-relaxed
  "
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>


          <div className="mt-12 border-t pt-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center text-lg font-semibold text-primary">
              {blog.author?.fullname?.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {blog.author?.fullname}
              </p>
              <p className="text-sm text-muted-foreground">
                Administrator & Content Author
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              ← Back to blogs
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <RelatedArticlesSidebar relatedArticle={relatedBlogs} />
          <LatestBlogsSidebar latestBlogsArticle={latestBlogs} />
        </aside>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
