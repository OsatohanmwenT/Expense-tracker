import { Link, NavLink } from "react-router-dom"
import logo from "@/assets/Vector.svg"
import { links } from "@/constants"
import { useAuth } from "@/utils/AuthProvider"
import {useState} from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth();

    const activeStyles = {
        fontWeight: "semibold",
    }
  return (
    <header className="bg-white">
        <nav className="flex items-center z-10 px-4 lg:px-6 py-3 border-b-2 justify-between">
            <div className="flex">
                <Link to="/">
                    <div className="flex">
                        <img src={logo} alt="company logo" />
                        <span className="mx-2 font-bold text-2xl text-purple">Horizon</span>
                    </div>
                </Link>
                <div className="flex ml-5 max-md:hidden items-center gap-4">
                    {links.map((item) => (
                        <NavLink key={item.value} style={({ isActive }) => isActive ? activeStyles : undefined} className="hover:font-semibold" to={item.link}>{item.value}</NavLink>
                    ))}
                </div>
            </div>
            <div className="relative">
                <button onClick={() => setIsOpen(prev => !prev)} className="flex items-center justify-between rounded-md border-2 px-3 py-1">
                    <div className="w-5 h-5 rounded-full bg-purple"></div>
                    <span className="font-semibold ml-2 capitalize">{user?.username}</span>
                </button>
                <div className={`${isOpen ? "top-14 opacity-100 z-10" : "top-[50px] opacity-0 -z-10"} shadow transition-all right-1 absolute rounded-md`}>
                    <button onClick={logout} className="px-5 py-2">Logout</button>
                    <button className="px-5 py-2 text-nowrap">Dark mode</button>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar