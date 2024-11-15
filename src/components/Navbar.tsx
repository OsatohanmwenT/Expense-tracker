import { Link, NavLink } from "react-router-dom"
import logo from "../assets/Vector.svg"
import { links } from "../constants"
import { useAuth } from "../utils/AuthProvider"

const Navbar = () => {
    const { user } = useAuth();

    const activeStyles = {
        fontWeight: "semibold",
    }

  return (
    <header>
        <nav className="flex items-center px-4 lg:px-6 py-3 border-b-2 justify-between">
            <div className="flex">
                <Link to="/">
                    <div className="flex">
                        <img src={logo} alt="company logo" />
                        <span className="mx-2 font-bold text-2xl text-purple">Horizon</span>
                    </div>
                </Link>
                <div className="flex ml-5 items-center gap-4">
                    {links.map((item) => (
                        <NavLink style={({ isActive }) => isActive ? activeStyles : undefined} className="hover:font-semibold" to={item.link}>{item.value}</NavLink>
                    ))}
                </div>
            </div>
            <div>
                <button className="flex items-center justify-between rounded-md border-2 px-3 py-1">
                    <div className="w-5 h-5 rounded-full bg-purple"></div>
                    <span className="font-semibold ml-2 capitalize">{user?.username}</span>
                </button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar