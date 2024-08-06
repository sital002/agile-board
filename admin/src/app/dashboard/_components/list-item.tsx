"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type ListItemProps = {
  name: string;
  href: string;
  icon?: FC;
};
export default function ListItem(props: ListItemProps) {
  const pathename = usePathname();

  return (
    <Button
      asChild
      variant={pathename === props.href ? "secondary" : "ghost"}
      className="mb-2"
    >
      <Link href={props.href} className="flex w-full gap-2">
        <>
          {props.icon && <props.icon />}
          <span className="mr-auto">{props.name}</span>
        </>
      </Link>
    </Button>
  );
}
