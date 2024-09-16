import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/lib/axiosConfig";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "./ui/button";
import { toast } from "sonner";
import Blog from "./Blog";
import EditBlogForm from "./EditBlogForm";
import IBlog from "@/types/IBlog";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string(),
});

const BlogPage = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<IBlog>();
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  //fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${blogId}`);
        setBlog(res.data);
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.error || "Something went wrong"
          : "Something went wrong";

        if (axios.isAxiosError(error)) {
          console.log("error fetching blog", error.response?.data);
        } else {
          console.log("error fetching blog", error);
        }
        toast.error(errorMessage);
      }
    };
    fetchBlog();
  }, []);

  //update form with blog data
  useEffect(() => {
    if (blog) {
      form.setValue("title", blog.title);
      form.setValue("content", blog.content);
    }
  }, [blog, form]);

  //call api to update blog data
  const editBlog = async (title: string, content: string) => {
    try {
      const res = await axiosInstance.put(`/blogs/${blogId}`, {
        title,
        content,
      });
      setBlog(res.data);
    } catch (error: unknown) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error || "Something went wrong"
        : "Something went wrong";

      if (axios.isAxiosError(error)) {
        console.log("error editing blog", error.response?.data);
      } else {
        console.log("error editing blog", error);
      }
      toast.error(errorMessage);
    } finally {
      setIsEditable(false);
    }
  };

  if (!blog) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="space-y-4">
      {isEditable ? (
        <EditBlogForm
          blog={blog}
          setIsEditable={setIsEditable}
          editBlog={editBlog}
        />
      ) : (
        <div className="space-y-5">
          <Blog blog={blog} />
          <div className="flex justify-between">
            <Button type="button" onClick={() => navigate("/")}>
              Back
            </Button>
            <Button onClick={() => setIsEditable(true)}>Edit</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
