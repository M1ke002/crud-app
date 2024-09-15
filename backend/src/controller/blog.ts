import { Request, Response } from "express";
import { Blog } from "../models";

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog" });
  }
  res.send({});
};

export const createBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({ title, content });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error creating blog" });
  }
};

export const editBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      blog.title = title;
      blog.content = content;
      await blog.save();
      res.status(200).json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error editing blog" });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (blog) {
      await blog.destroy();
      res.status(200).json("Blog deleted successfully!");
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting blog" });
  }
};
