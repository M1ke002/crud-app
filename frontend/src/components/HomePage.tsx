import React from "react";
import { Button } from "./ui/button";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import Student from "@/types/Student";

const data: Student[] = [
  {
    id: 1,
    name: "name",
    dob: "14/01/2001",
    email: "abc@email.com",
  },
  {
    id: 2,
    name: "name2",
    dob: "14/01/2002",
    email: "abc@email.com",
  },
  {
    id: 3,
    name: "name3",
    dob: "14/02/2001",
    email: "abc@email.com",
  },
];

const HomePage = () => {
  return (
    <>
      {/* title */}
      <p className="flex justify-center py-3 px-3 font-bold text-3xl">
        Student CRUD App
      </p>

      <hr />

      {/* table */}
      <div className="max-w-[1450px] mx-auto mt-6 space-y-3">
        <Button>Add student</Button>

        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default HomePage;
