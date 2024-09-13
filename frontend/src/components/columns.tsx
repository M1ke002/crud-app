import Student from "@/types/Student";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "dob",
    header: "DoB",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: () => {
      return (
        <div className="flex items-center justify-center space-x-1">
          <Button className="bg-blue-500">Edit</Button>
          <Button className="bg-rose-500">Delete</Button>
        </div>
      );
    },
  },
];
