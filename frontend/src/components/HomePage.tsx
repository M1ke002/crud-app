import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import CreateBlogModal from "./modals/CreateBlogModal";
import axiosInstance from "@/lib/axiosConfig";
import Blog from "@/types/Blog";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  //fetch blogs data
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get("/blogs");
      console.log(res.data);
      setBlogs(res.data);
    };
    fetchData();
  }, []);

  const createBlog = async (title: string, content: string) => {
    try {
      const res = await axiosInstance.post("/blogs", {
        title,
        content,
      });
      setBlogs((prev) => [...prev, res.data]);
    } catch (error) {
      console.log("error creating blog", error);
    }
  };

  const deleteBlog = async (blogId: number) => {
    try {
      await axiosInstance.delete(`/blogs/${blogId}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.log("error deleting blog", error);
    }
  };

  return (
    <>
      <div className="space-y-5">
        <Button onClick={() => setIsOpen(true)}>Add blog</Button>
        <DataTable columns={columns} data={blogs} deleteBlog={deleteBlog} />
      </div>

      <CreateBlogModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        createBlog={createBlog}
      />
    </>
  );
};

export default HomePage;
