import {NavLink} from "react-router-dom";

const TabBar = () => {
    const activeStyle = {
        backgroundColor: "black"
    }

    return(
        <div className="p-1 mt-3 ml-2 sm:ml-3 rounded-md sm:rounded-xl sm:gap-2 flex w-fit bg-zinc-800">
            <NavLink style={({isActive}) => isActive ? activeStyle : undefined } className="text-zinc-200 transition-all duration-300 rounded-lg py-1 sm:p-[6px] max-sm:text-[12px] px-2 sm:px-4" to=".">Dashboard</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : undefined } className="text-zinc-200 transition-all duration-300 rounded-lg py-1 sm:p-[6px] max-sm:text-[12px] px-2 sm:px-4" to="budget">Budget</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : undefined } className="text-zinc-200 transition-all duration-300 rounded-lg py-1 sm:p-[6px] max-sm:text-[12px] px-2 sm:px-4" to="expenses">Expenses</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : undefined } className="text-zinc-200 transition-all duration-300 rounded-lg py-1 sm:p-[6px] max-sm:text-[12px] px-2 sm:px-4" to="analytics">Analytics</NavLink>
        </div>
    )
}

export default TabBar;