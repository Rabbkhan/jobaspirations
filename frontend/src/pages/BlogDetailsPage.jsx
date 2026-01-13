import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { PUBLIC_BLOG_API_END_POINT } from "../utils/constants";
import RelatedArticlesSidebar from "../components/blog/RelatedArticlesSidebar";
import LatestBlogsSidebar from "./LatestBlogsSidebar";
import BlogCardSkeleton from "../components/common/loading/BlogCardSkeleton";
import BlogDetailsSkeleton from "../components/common/loading/BlogDetailsSkeleton";

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedblog, setRelatedBlog] = useState([]); // use array for multiple related articles
  const [loading, setLoading] = useState(true);
  const [latestBlogs, setLatestBlogs] = useState([]);

  // Fetch main blog
  const fetchBlog = async () => {
    try {
      const { data } = await axios.get(`${PUBLIC_BLOG_API_END_POINT}/${slug}`);
      setBlog(data.blog);
      incrementViews(slug);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch related blogs
  const fetchRelatedBlog = async () => {
    try {
      const { data } = await axios.get(
        `${PUBLIC_BLOG_API_END_POINT}/related/${slug}`
      );

      setRelatedBlog(data.related || []); // store in relatedblog state
    } catch (err) {
      console.error(err);
      setRelatedBlog([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestBlogs = async () => {
    try {
      const { data } = await axios.get(
        `${PUBLIC_BLOG_API_END_POINT}/latest/?page=1&limit=4`
      );
      console.log("latest blogs", data);

      setLatestBlogs(data.blogs || []);
    } catch (err) {
      console.error("Failed to fetch latest blogs", err);
    }
  };

  const incrementViews = async (slug) => {
    const viewedBlogs = JSON.parse(localStorage.getItem("viewedBlogs") || "[]");

    // Only increment if user hasn't viewed this blog in this session
    if (!viewedBlogs.includes(slug)) {
      try {
        await axios.post(
          `${PUBLIC_BLOG_API_END_POINT}/${slug}/increment-views`,
          {},
          { withCredentials: true }
        );
        // Mark as viewed
        localStorage.setItem(
          "viewedBlogs",
          JSON.stringify([...viewedBlogs, slug])
        );
      } catch (err) {
        console.error("Failed to increment views", err);
      }
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchRelatedBlog();
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
          {/* Category */}
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            {blog.category?.name}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight leading-tight text-foreground">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {blog.author?.name}
            </span>
            <span>•</span>
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5" // increased from h-4 w-4
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-sm font-medium">{blog.views}</span>{" "}
              {/* increased font-weight */}
            </span>
          </div>

          {/* Featured Image */}
          {blog.featuredImage?.url && (
            <img
              src={blog.featuredImage.url}
              alt={blog.title}
              className="w-full rounded-xl object-cover max-h-[420px]"
            />
          )}

          {/* Content */}
          <article
            className="prose prose-lg max-w-none prose-headings:font-semibold prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Author / Admin Section */}
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

          {/* Back Link */}
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
          <RelatedArticlesSidebar relatedArticle={relatedblog} />
          <LatestBlogsSidebar latestBlogsArticle={latestBlogs} />
        </aside>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
