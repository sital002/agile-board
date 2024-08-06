"use client";
import { User } from "@/schema/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DataTable } from "./data-table";
import { UserColums } from "./column";

async function getAllUsers() {
  try {
    const res = await axios.get(`http://localhost:3000/users`);
    return res.data as User[];
  } catch (err) {
    console.log(err);
    return [];
  }
}

type ClientComponentProps = {
  initialData: User[];
};
export function ClientComponent({ initialData }: ClientComponentProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    initialData: initialData,
  });
  return <DataTable columns={UserColums} data={data} isFetching={isFetching} />;
}
