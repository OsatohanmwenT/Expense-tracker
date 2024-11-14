import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./pages/Layout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import AuthProvider from "./utils/AuthProvider"

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  }
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}