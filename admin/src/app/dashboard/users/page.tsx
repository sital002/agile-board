import React from "react";
import { User } from "@/schema/user";
import { DataTable } from "./data-table";
import { UserColums } from "./column";
import { API } from "@/utils/api";
import { isAxiosError } from "axios";

async function getAllUsers() {
  try {
    const res = await API.get(`/api/users`);
    return res.data as User[];
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.response?.data);
    }
    return [];
  }
}
export default async function Userspage() {
  const users = await getAllUsers();
  return (
    <div className="p-3">
      <h2 className="text-xl font-medium tracking-wider">Users</h2>
      <DataTable columns={UserColums} data={users} />
    </div>
  );
}
