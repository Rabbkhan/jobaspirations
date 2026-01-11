import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const blogsMock = [
  { _id: 1, title: "First Blog", content: "This is the content of the first blog...", published: true },
  { _id: 2, title: "Second Blog", content: "Second blog content goes here...", published: false },
];

const Blogs = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={() => setDialogOpen(true)}>Create Blog</Button>
      </div>

      {blogsMock.map((blog) => (
        <Card key={blog._id}>
          <CardHeader className="flex justify-between items-center">
            <h3 className="font-semibold">{blog.title}</h3>
            <div className="flex gap-2">
              <Button size="sm">Edit</Button>
              <Button size="sm" variant="destructive">Delete</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p>{blog.content.slice(0, 100)}{blog.content.length > 100 ? "..." : ""}</p>
            <p className="text-sm text-muted-foreground">Published: {blog.published ? "Yes" : "No"}</p>
          </CardContent>
        </Card>
      ))}

      {/* Dialog for Create/Edit */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create / Edit Blog</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-2">
            <Input placeholder="Title" />
            <Textarea placeholder="Content" />
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Published
            </label>
          </div>
          <DialogFooter>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blogs;
