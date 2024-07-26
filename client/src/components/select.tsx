
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { selectList } from "../constant/navlist"

 function SelectOption() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            selectList.map((ele,index)=>{
              return <SelectItem  key={index} value={ele.value}>{ele.name}</SelectItem>

            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default SelectOption