import { Outlet } from "react-router-dom"
import Navbar from "../components/Navigation/Navbar.tsx"
import TabBar from "@/components/Navigation/TabBar.tsx";

const Layout = () => {
  return (
    <div className="min-h-screen dark:bg-neutral-950">
      <Navbar />
        <TabBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout