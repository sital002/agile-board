import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const CreateProject = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full max-w-[80%] mx-auto mt-[5%] dark:bg-black">
      <div className=" rounded-md  cursor-pointer p-4 border-2">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-3xl font-semibold">Create Project</h1>
          <p>
            Explore what's possible when you collaborate with your team. Edit
            project details anytime in project settings.
          </p>
          <Label>Name</Label>
          <Input placeholder="enter your project name..." />
          <h1 className="font-semibold">Recent Projects</h1>
          <div className="flex  gap-x-4  items-center border-2  rounded-md">
            <img
              className="w-[15%]"
              src="https://sitaladhikari111-1721917254800.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406?size=xxlarge"
              alt=""
            />
            <div>
              <h1 className="font-medium ">Agile Board</h1>
              <p className="text-sm opacity-90">Software project</p>
            </div>
          </div>
        </div>
        <div className="flex my-6 gap-x-4">
          <Button variant={"secondary"} onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button>Create</Button>
        </div>
      </div>
      <img
        className="lg:w-[50%] xl:w-[80%]  lg:block hidden"
        src="https://cdni.iconscout.com/illustration/premium/thumb/business-meeting-2750496-2289786.png"
        alt=""
      />
    </div>
  );
};

export default CreateProject;
