import Blog from "@/types/Blog";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    deleteBlog: (blogId: number) => void;
  }
}

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <div>{format(createdAt, "dd/MM/yyyy HH:mm:ss")}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;
      return <div>{format(updatedAt, "dd/MM/yyyy HH:mm:ss")}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ table, row }) => {
      const navigate = useNavigate();
      const blogId = row.original.id;

      return (
        <div className="flex items-center justify-center space-x-1">
          <Button
            className="bg-blue-500"
            onClick={() => navigate(`/${blogId}`)}
          >
            View
          </Button>
          <Button
            className="bg-rose-500"
            onClick={() => table.options.meta?.deleteBlog(blogId)}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
