import IBlog from "@/types/IBlog";
import { format } from "date-fns";

interface BlogProps {
  blog: IBlog;
}

const Blog = ({ blog }: BlogProps) => {
  return (
    <div className="space-y-3">
      <p className="font-bold text-4xl">{blog.title}</p>
      <p>Created: {format(blog.createdAt, "dd/MM/yyyy")}</p>
      <hr />
      <p>{blog.content}</p>
    </div>
  );
};

export default Blog;
