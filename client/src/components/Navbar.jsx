import { Bell } from "lucide-react"
import { Link, Navigate, useNavigate } from "react-router-dom"
// import { ModeToggle } from "../mode-toggle"

function NavBar({isLanding}) {
  const navigate=useNavigate()
  const handlelogout=() => { 
    localStorage.setItem('AvatarUrl',"")
    navigate('/signup')
   }
  return (
    <div className={`flex justify-between ${isLanding ? 'absolute z-10' : 'border-b'} border-[--border-line] items-center h-[60px] pr-5 w-full`}>
        <div className={`text-[20px] w-[60px] ${isLanding ? '' : 'border-r'} border-[--border-line] h-full flex justify-center items-center`}>
            {/* <Link to='/'><img src="/Taskera.png" alt="" className="h-16 w-16 object-cover" /></Link> */}
        </div>

        <div className="flex gap-10">
            {/* <ModeToggle/> */}
           {/* {!isLanding &&  <button><Bell /></button>} */}
            {/* {isLanding && <Link to='/signup' className="bg-[--secondary] text-[--ternary] px-4 py-1 rounded-md font-medium">Login</Link>} */}
            <button className="bg-[--textred] px-2 py-1 text-white font-semibold rounded-lg " onClick={handlelogout}>Logout</button>
        </div>
    </div>
  )
}

export default NavBar