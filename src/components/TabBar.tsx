import {NavLink} from "react-router-dom";

const TabBar = () => {
    const activeStyle = {
        backgroundColor: "black"
    }

    return(
        <div className="p-1 mt-3 ml-3 rounded-xl gap-2 flex w-fit bg-zinc-800">
            <NavLink style={({isActive}) => isActive ? activeStyle : undefined } className="text-zinc-200 transition-all duration-300 rounded-lg p-[6px] px-4" to=".">Dashboard</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : undefined } className="text-zinc-200 transition-all duration-300 rounded-lg p-[6px] px-4" to="budget">Budget</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : undefined } className="text-zinc-200 transition-all duration-300 rounded-lg p-[6px] px-4" to="expenses">Expenses</NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : undefined } className="text-zinc-200 transition-all duration-300 rounded-lg p-[6px] px-4" to="analytics">Analytics</NavLink>
        </div>
    )
}

export default TabBar;