import blogModel from "../models/blog.model.js";

export const incrementBlogViewController = async (req, res) => {
  try {
    const { slug } = req.params;

    // Check if cookie exists for this blog
    const cookieName = `viewed_${slug}`;
    if (req.cookies[cookieName]) {
      // User already viewed this blog, do not increment
      return res.status(200).json({ success: true, message: "Already counted" });
    }

    // Increment view
    const blog = await blogModel.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    // Set a cookie valid for 1 day
    res.cookie(cookieName, true, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ success: true, views: blog.views });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to increment views" });
  }
};
