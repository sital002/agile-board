import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import React from "react";
import { API } from "@/utils/api";

type TeamProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateTeam = ({ open, setOpen }: TeamProps) => {
  const TeamSchema = z.object({
    name: z.string().min(5, { message: "team name must be 5 character" }),
    teamMem: z.string(),
  });

  type InputType = z.infer<typeof TeamSchema>;

  const form = useForm<InputType>({
    resolver: zodResolver(TeamSchema),
  });

  const onSubmit = async (data: InputType) => {
    console.log(data);
    const resp = await API.post("/api/teams/new", {data});
    console.log(resp);
  };
  return (
    <Dialog onOpenChange={() => setOpen(false)} open={open}>
      <DialogTitle>Create a Team</DialogTitle>
      <DialogContent className="flex gap-x-4">
        <img
          className="w-[80%]"
          src="https://www.pngall.com/wp-content/uploads/8/Team-Work-PNG.png"
          alt=""
        />
        <div>
          <h1 className="my-4">
            Bring everyone together with one team you can @mention, filter, and
            assign work to.
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Team Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamMem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Members</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Team Members" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant={"ghost"} type="submit">
                Cancel
              </Button>
              <Button className="mx-5" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeam;
