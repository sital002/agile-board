import { navlist } from '../constant/navlist'
import { Button } from './ui/button'
import { Bell, Settings } from 'lucide-react'
import Signup from '../pages/signup'
import { Input } from './ui/input'

const Navbar = () => {
  return (
    <header className='flex justify-between p-4 border-b-2 border-gray-600 bg-black text-white'>
        <div></div>
        <div className='flex items-center gap-x-4'>
            {
                navlist.map((ele,index)=>{
                    return <div key={index} className='flex gap-x-1 cursor-pointer select-none hover:bg-gray-700 rounded-md p-2'>
                        <span className='text-xl'>{ele.name}</span>
                        <span className='self-end'>{ele.icon}</span>
                    </div>
                })
            }
        </div>
        <Button variant={'secondary'} >Create</Button>
        <Input className='w-full max-w-[20%]' placeholder='Search'/>
        <div className='flex items-center gap-x-4'>
            <Bell/>
            <Settings/>
            <Signup/>
        </div>
    </header>
  )
}

export default Navbar