import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const LatestBlogsSidebar = ({ latestBlogsArticle = [] }) => {
  if (latestBlogsArticle.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="border-b border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800">Latest Blogs</h3>
        </CardHeader>

        <CardContent className="p-2">
          <p className="text-sm text-muted-foreground">
            No latest blogs found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-300">
        <h3 className="text-lg font-semibold text-gray-800">Latest Blogs</h3>
      </CardHeader>

      <CardContent className="space-y-2 p-2">
        {latestBlogsArticle.map((blog) => (
          <Link
            key={blog._id}
            to={`/blog/${blog.slug}`}
            className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-50 transition"
          >
            <Avatar className="w-12 h-12 rounded bg-gray-100 ">
              {blog.featuredImage?.url ? (
                <img
                  src={blog.featuredImage.url}
                  alt={blog.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-xs text-gray-500 flex items-center justify-center w-full h-full">
                  No Image
                </span>
              )}
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 line-clamp-2">
                {blog.title}
              </p>
              <Badge className="mt-1 text-xs bg-blue-100 text-blue-800">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Badge>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default LatestBlogsSidebar;
