import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

const CreateProject = () => {
    const navigate=useNavigate()
  return (
    <div className="w-full lg:max-w-[40%] md:max-w-[50%] mx-auto border-2 border-gray-300 rounded-md shadow-lg cursor-pointer p-4 mt-[10%]">
        <div className="flex flex-col gap-y-4">
        <h1 className="text-xl font-semibold">Create Project</h1>
        <p>Explore what's possible when you collaborate with your team. Edit project details anytime in project settings.</p>
        <Label>Name</Label>
        <Input placeholder="enter your project name..."/>
        </div>
        <div className="flex my-3 gap-x-4">
            <Button variant={'secondary'} onClick={()=>navigate('/')}>Cancel</Button>
            <Button>Create</Button>
        </div>
    </div>
  )
}

export default CreateProject