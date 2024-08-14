import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { API } from "@/utils/api";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const projectSchema = z.object({
  name: z.string().min(5, { message: "project name must be 5 character" }),
  description: z.string().optional().default(""),
});

type ProjectType = z.infer<typeof projectSchema>;

const CreateProject = () => {
  const navigate = useNavigate();
  const form = useForm<ProjectType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNewProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      console.log(data.data);
      navigate("/board");
    },
  });

  function createNewProject(data: ProjectType) {
    return API.post("/api/projects/new", data);
  }

  const onSubmit = (data: ProjectType) => {
    mutation.mutate(data);
  };
  return (
    <div className="mx-auto mt-[5%] flex w-full max-w-[80%] dark:bg-black">
      <div className="cursor-pointer rounded-md border-2 p-4">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-3xl font-semibold">Create Project</h1>
          <p>
            Explore what's possible when you collaborate with your team. Edit
            project details anytime in project settings.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="enter project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h1 className="font-semibold">Recent Projects</h1>
              <div className="flex items-center gap-x-4 rounded-md border-2">
                <img
                  className="w-[15%]"
                  src="https://sitaladhikari111-1721917254800.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406?size=xxlarge"
                  alt=""
                />
                <div>
                  <h1 className="font-medium">Agile Board</h1>
                  <p className="text-sm opacity-90">Software project</p>
                </div>
              </div>
              <div className="my-6 flex gap-x-4">
                <Link to={`/board`}>
                  <p className="rounded-md border-2 p-2">Cancel</p>
                </Link>
                <Button>Create</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <img
        className="hidden lg:block lg:w-[50%] xl:w-[80%]"
        src="https://cdni.iconscout.com/illustration/premium/thumb/business-meeting-2750496-2289786.png"
        alt=""
      />
    </div>
  );
};

export default CreateProject;
