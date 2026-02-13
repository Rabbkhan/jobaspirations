import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { CATEGORY_API_END_POINT } from "@/utils/constants";


const BlogCategories = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    const res = await axios.get(CATEGORY_API_END_POINT);
    setCategories(res.data.categories || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Category name required");

    try {
      if (editingCategory) {
        await axios.put(`${CATEGORY_API_END_POINT}/${editingCategory._id}`, { name }, { withCredentials: true });
        toast.success("Category updated");
      } else {
        await axios.post(CATEGORY_API_END_POINT, { name }, { withCredentials: true });
        toast.success("Category created");
      }
      setModalOpen(false);
      setEditingCategory(null);
      setName("");
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await axios.delete(`${CATEGORY_API_END_POINT}/${id}`, { withCredentials: true });
      toast.success("Category deleted");
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const openEdit = (category) => {
    setEditingCategory(category);
    setName(category.name);
    setModalOpen(true);
  };

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
                <Button size="sm" onClick={() => openEdit(cat)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(cat._id)}>Delete</Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={modalOpen} onOpenChange={(o) => { setModalOpen(o); if(!o){ setEditingCategory(null); setName(""); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Create Category"}</DialogTitle>
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
  );
};

export default BlogCategories;
