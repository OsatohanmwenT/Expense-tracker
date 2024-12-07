import { Link, NavLink } from "react-router-dom"
import logo from "@/assets/Vector.svg"
import { links } from "@/constants"
import { useAuth } from "@/context/AuthProvider.tsx"
import React, {useEffect, useState} from "react";
import ThemeSwitcher from "../ThemeSwitcher";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth();

    const activeStyles = {
        fontWeight: "semibold",
    }

    useEffect(() => {
        const closePopup = () => setIsOpen(false);
        document.addEventListener("click", closePopup);

        return () => {
            document.removeEventListener("click", closePopup);
        };
    }, []);

    function togglePopup(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        setIsOpen(prevState => !prevState);
    }

  return (
    <header className="dark:bg-zinc-950 shadow-sm">
        <nav className="flex items-center z-10 dark:text-white px-4 lg:px-6 py-3 border-b-2 border-zinc-200 dark:border-zinc-800 justify-between">
            <div className="flex">
                <Link to="/">
                    <div className="flex">
                        <img src={logo} alt="company logo" />
                        <span className="mx-2 font-bold text-2xl text-purple">Horizon</span>
                    </div>
                </Link>
                <div className="flex ml-5 max-md:hidden items-center gap-4">
                    {links.map((item) => (
                        <NavLink key={item.value} style={({ isActive }) => isActive ? activeStyles : undefined} className="hover:font-semibold dark:text-white" to={item.link}>{item.value}</NavLink>
                    ))}
                </div>
            </div>
            <div className="relative">
                <button onClick={(e) => togglePopup(e)} className="flex items-center justify-between rounded-md border-2 border-zinc-100 dark:border-zinc-800 px-3 py-1">
                    <div className="w-5 h-5 rounded-full bg-purple"></div>
                    <span className="font-semibold dark:text-white/80 ml-2 capitalize">{user?.username}</span>
                </button>
                <div className={`${isOpen ? "top-14 opacity-100 z-10" : "top-[50px] opacity-0 -z-10"} dark:bg-neutral-900 shadow transition-all overflow-hidden right-1 absolute rounded-md`}>
                    <button onClick={logout} className="px-5 w-full hover:bg-neutral-200 dark:hover:bg-neutral-700 text-left py-2">Logout</button>
                    <ThemeSwitcher />
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Navbar