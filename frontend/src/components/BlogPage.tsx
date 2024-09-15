import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "@/lib/axiosConfig";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import Blog from "@/types/Blog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const BlogPage = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog>();
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
      } catch (error) {
        console.log(error);
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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axiosInstance.put(`/blogs/${blogId}`, {
        title: values.title,
        content: values.content,
      });
      setBlog(res.data);
    } catch (error) {
      console.log("error editing blog", error);
    } finally {
      setIsEditable(false);
    }
  };

  const handleCancel = () => {
    if (blog) {
      form.setValue("title", blog.title);
      form.setValue("content", blog.content);
    }
    setIsEditable(false);
  };

  const toggleEditMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditable(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    readOnly={!isEditable}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Content</FormLabel>
                <FormControl>
                  <Textarea
                    rows={10}
                    placeholder="Enter blog content"
                    {...field}
                    className="bg-white"
                    readOnly={!isEditable}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between">
          <Button type="button" onClick={() => navigate("/")}>
            Back
          </Button>
          <div>
            {isEditable ? (
              <>
                <Button type="submit" className="mr-2">
                  Save
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="button" onClick={toggleEditMode}>
                Edit
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BlogPage;
