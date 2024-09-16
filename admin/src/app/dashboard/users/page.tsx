"use client";
import React from "react";
import { User } from "@/schema/user";
import { DataTable } from "./data-table";
import { UserColums } from "./column";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

async function getAllUsers() {
  const res = await API.get(`/api/users`);
  return res.data as User[];
}
export default function Userspage() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  return (
    <div className="p-3">
      <h2 className="text-xl font-medium tracking-wider">Users</h2>
      <DataTable columns={UserColums} data={data || []} />
    </div>
  );
}
