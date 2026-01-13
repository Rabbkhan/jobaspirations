import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const RelatedArticlesSidebar = ({ relatedArticle = [] }) => {
  return (
    <Card className="w-full border border-gray-200 shadow-sm">
      <CardHeader className="border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Related Articles
        </h3>
      </CardHeader>

      <CardContent className="space-y-2 p-2">
        {relatedArticle.length === 0 ? (
          <p className="text-sm text-gray-500">No related articles found.</p>
        ) : (
          relatedArticle.map((article) => (
            <Link
              key={article._id}
              to={`/blog/${article.slug}`}
              className="flex items-start gap-2 p-1.5 rounded-lg hover:bg-primary/10 transition"
            >
              {/* Thumbnail */}
              <Avatar className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 ">
                {article.featuredImage?.url ? (
                  <img
                    src={article.featuredImage.url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-400 flex items-center justify-center w-full h-full">
                    No Image
                  </span>
                )}
              </Avatar>

              {/* Title & Meta */}
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                  {article.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
              <Badge className="mt-1 text-xs bg-blue-100 text-blue-800">
                    {new Date(article.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    {article.category?.name}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedArticlesSidebar;
