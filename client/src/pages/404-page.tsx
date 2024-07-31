import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate=useNavigate()
  return (
    <div>
        <img className='mx-auto my-4' src="https://th.bing.com/th/id/R.267b4a72b38b4250ed5361bc1a9cec30?rik=0Bs%2bksEJUdR3Mw&riu=http%3a%2f%2fmof.bus.ku.ac.th%2fth%2fimages%2fimg_404.png&ehk=BJ4HZ3iM%2fVNwn9ngZH8%2bC8W8wSC90trMYNddfErefoQ%3d&risl=&pid=ImgRaw&r=0" alt="" />
        <Button onClick={()=>navigate('/board')} className='block mx-auto my-8 '>Back to Home</Button>
    </div>
  )
}

export default PageNotFound