import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import CreateBlogModal from "./modals/CreateBlogModal";
import axiosInstance from "@/lib/axiosConfig";
import axios from "axios";
import IBlog from "@/types/IBlog";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  //fetch blogs data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/blogs");
        setBlogs(res.data);
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error || "Something went wrong"
          : "Something went wrong";

        if (axios.isAxiosError(error)) {
          console.log("error fetching blogs", error.response?.data);
        } else {
          console.log("error fetching blogs", error);
        }
        toast.error(errorMessage);
      }
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
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error || "Something went wrong"
        : "Something went wrong";

      if (axios.isAxiosError(error)) {
        console.log("error creating blog", error.response?.data);
      } else {
        console.log("error creating blog", error);
      }
      toast.error(errorMessage);
    }
  };

  const deleteBlog = async (blogId: number) => {
    try {
      await axiosInstance.delete(`/blogs/${blogId}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error || "Something went wrong"
        : "Something went wrong";

      if (axios.isAxiosError(error)) {
        console.log("error deleting blog", error.response?.data);
      } else {
        console.log("error deleting blog", error);
      }
      toast.error(errorMessage);
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
