import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import React from "react";

type User = {
  id: string;
  display_name: string;
  email: string;
  profile_image_url: string;
};
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
    <div>
      <h2 className="text-xl font-medium tracking-wider">Users</h2>

      {users.map((user) => (
        <div key={user.id} className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            {!user.profile_image_url ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 rounded-full"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a10 10 0 0 1 7.07 2.93A10 10 0 0 1 20 10c0 2.67-1.05 5.18-2.93 7.07A10 10 0 0 1 10 20a10 10 0 0 1-7.07-2.93A10 10 0 0 1 0 10c0-2.67 1.05-5.18 2.93-7.07A10 10 0 0 1 10 0zm0 2a8 8 0 0 0-5.66 2.34A8 8 0 0 0 2 10c0 2.12.83 4.12 2.34 5.66A8 8 0 0 0 10 18c2.12 0 4.12-.83 5.66-2.34A8 8 0 0 0 18 10c0-2.12-.83-4.12-2.34-5.66A8 8 0 0 0 10 2zm1 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                />
              </svg>
            ) : (
              <Image
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
                src={user.profile_image_url}
                alt={user.display_name}
              />
            )}
            <div className="ml-2">
              <p className="font-semibold">{user.display_name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <Button className="text-sm">View</Button>
        </div>
      ))}
    </div>
  );
}
