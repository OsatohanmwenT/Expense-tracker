import { Outlet } from "react-router-dom"
import Navbar from "../components/Navigation/Navbar.tsx"
import TabBar from "@/components/TabBar.tsx";

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
        <TabBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout