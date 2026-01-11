import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { BLOG_API_END_POINT } from "../utils/constants";

const BlogPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", published: false });

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BLOG_API_END_POINT}/blogs`, { withCredentials: true });
      setBlogs(res.data.blogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content, published: blog.published });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`${APPLICATION_API}/blogs/${id}`, { withCredentials: true });
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingBlog) {
        const res = await axios.put(`${APPLICATION_API}/blogs/${editingBlog._id}`, formData, { withCredentials: true });
        setBlogs(blogs.map((b) => (b._id === editingBlog._id ? res.data.blog : b)));
      } else {
        const res = await axios.post(`${APPLICATION_API}/blogs`, formData, { withCredentials: true });
        setBlogs([res.data.blog, ...blogs]);
      }
      setDialogOpen(false);
      setEditingBlog(null);
      setFormData({ title: "", content: "", published: false });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Blog Panel</h2>
        <Button onClick={() => setDialogOpen(true)}>Create Blog</Button>
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog._id}>
              <CardHeader className="flex justify-between items-center">
                <h3 className="font-semibold">{blog.title}</h3>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(blog)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(blog._id)}>Delete</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p>{blog.content.slice(0, 150)}{blog.content.length > 150 ? "..." : ""}</p>
                <p className="text-sm text-muted-foreground">Published: {blog.published ? "Yes" : "No"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog for Create/Edit */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Blog" : "Create Blog"}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              Published
            </label>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit}>{editingBlog ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPanel;
