import axios from "axios";
import React from "react";
import { DataTableDemo } from "./data-table";
import { User } from "@/schema/user";
import { UserColums } from "./column";

async function getAllUsers() {
  try {
    const res = await axios.get(`${process.env.SERVER_URL}/users`);
    return res.data as User[];
  } catch (err) {
    console.log(err);
    return [];
  }
}
export default async function Userspage() {
  const users = await getAllUsers();
  console.log(users);
  return (
    <div className="p-3">
      <h2 className="text-xl font-medium tracking-wider">Users</h2>

      <DataTableDemo data={users} columns={UserColums} />
    </div>
  );
}
