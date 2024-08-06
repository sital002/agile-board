import axios from "axios";
import React, { Suspense } from "react";
import { User } from "@/schema/user";
import { ClientComponent } from "./client-component";

export const dynamic = "force-dynamic";

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
  return (
    <div className="p-3">
      <h2 className="text-xl font-medium tracking-wider">Users</h2>
      <ClientComponent initialData={users} />
    </div>
  );
}
