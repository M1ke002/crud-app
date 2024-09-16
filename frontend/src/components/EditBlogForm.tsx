import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import IBlog from "@/types/IBlog";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string(),
});

interface EditBlogFormProps {
  blog: IBlog;
  setIsEditable: (editable: boolean) => void;
  editBlog: (title: string, content: string) => void;
}

const EditBlogForm = ({ blog, setIsEditable, editBlog }: EditBlogFormProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog.title,
      content: blog.content,
    },
  });

  const handleCancel = () => {
    form.setValue("title", blog.title);
    form.setValue("content", blog.content);
    setIsEditable(false);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    editBlog(values.title, values.content);
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
                  <Input placeholder="Title" {...field} className="bg-white" />
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
                    rows={15}
                    placeholder="Enter blog content"
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" className="ml-2">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditBlogForm;
