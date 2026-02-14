import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useFetchBlogCategories } from "../../../shared/hooks/useFetchBlogCategories";
import { useFetchBlogs } from "../../../shared/hooks/useFetchBlogs";
import BlogEditor from "../components/BlogEditor";

// Replace Textarea with a real rich text editor later (TipTap / Editor.js)

const BlogEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // if id exists -> edit mode

  const { blogs, createBlog, updateBlog } = useFetchBlogs();
  const { categories } = useFetchBlogCategories();

  const existingBlog = blogs.find((b) => b._id === id);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    published: false,
    image: null,
  });

  const [preview, setPreview] = useState("");
  const [saving, setSaving] = useState(false);

  /* =========================
     Populate Edit Mode
  ========================= */
  useEffect(() => {
    if (existingBlog) {
      setForm({
        title: existingBlog.title,
        content: existingBlog.content,
        category: existingBlog.category?._id || "",
        published: existingBlog.published,
        image: null,
      });
      setPreview(existingBlog.featuredImage?.url || "");
    }
  }, [existingBlog]);

  /* =========================
     Image Handler
  ========================= */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  /* =========================
     Submit Handler
  ========================= */
  const handleSave = async () => {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

  if (!form.content) {
  toast.error("Content is required");
  return;
}

    if (!form.category) {
      toast.error("Category is required");
      return;
    }

    if (form.published && !form.image && !existingBlog?.featuredImage) {
      toast.error("Featured image is required to publish");
      return;
    }

    try {
      setSaving(true);
      if (existingBlog) {
        await updateBlog(existingBlog._id, form);
        toast.success("Blog updated");
      } else {
        await createBlog(form);
        toast.success("Blog created");
      }
      navigate("/admin/blogs");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Editor */}
     <div className="lg:col-span-3 space-y-4">
  <Input
    placeholder="Blog title"
    value={form.title}
    onChange={(e) => setForm({ ...form, title: e.target.value })}
    className="text-xl font-semibold"
  />

 <BlogEditor
  value={form.content || ""}
  onChange={(content) =>
    setForm((prev) => ({ ...prev, content }))
  }
/>

</div>


      {/* Sidebar */}
      <Card className="h-fit">
        <CardContent className="space-y-4 pt-6">
          {/* Category */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <select
              className="w-full border rounded px-3 py-2 text-sm"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Publish */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
            />
            Publish
          </label>

          {/* Image */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Featured Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 max-h-40 object-cover rounded border"
              />
            )}
          </div>

          {/* Actions */}
          <Button disabled={saving} onClick={handleSave}>
            {saving
              ? "Saving..."
              : existingBlog
              ? "Update Blog"
              : "Create Blog"}
          </Button>

          <Button variant="outline" onClick={() => navigate("/admin/blogs")}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogEditorPage;
