import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from "./pages/Layout"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import Dashboard from "./pages/Dashboard"
import BudgetPage from "@/pages/BudgetPage.tsx";
import AnalyticsPage from "@/pages/AnalyticsPage.tsx";
import ExpensePage from "@/pages/ExpensePage.tsx";
import Provider from "./context/Provider.tsx"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: "budget",
            element: <BudgetPage />
          },
          {
            path: "analytics",
            element: <AnalyticsPage />
          },
          {
            path: "expenses",
            element:<ExpensePage />
          }
        ]
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
    <QueryClientProvider client={queryClient}>  
      <Provider>
        <RouterProvider router={router} />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}