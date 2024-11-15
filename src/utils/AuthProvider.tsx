import { createContext, ReactNode, useContext, useState } from "react"
import NewUser from "../entities/NewUser";
import LoginUser from "../entities/LoginUser";
import AuthUser from "../entities/AuthUser";

interface Props {
    children: ReactNode
}

interface AuthContextType {
  user: AuthUser | null;
  error: string;
  login: (data: LoginUser) => Promise<boolean>
  registerUser: (data: NewUser) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  
  const login = async(data: LoginUser) => {
      setLoading(true)
      setError("")
      try{
      const res = await fetch("http://127.0.0.1:8000/auth/login",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if(!res.ok) {
        const errorData = await res.json();
        setError(errorData.detail);
        throw new Error(`HTTP Error status: ${res.status}`)
      }
      const responseData = await res.json();
      setUser(responseData)
      return responseData
    }catch (err) {
      console.error("Submission error:", err);
      setUser(null)
      return null
    }finally{
      setLoading(false)
    }
  }
  
  const registerUser = async(data: NewUser) => {
      setLoading(true)
      setError("")
      try{
          const res = await fetch("http://127.0.0.1:8000/auth/register",{
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          if(!res.ok) {
            const errorData = await res.json();
            setError(errorData.detail);
            throw new Error(`HTTP Error status: ${res.status}`)
          }
          return true
        }catch (err) {
          console.error("Submission error:", err);
          return false
      }finally{
        setLoading(false)
      }
  }

  async function logout() {
    setUser(null)
  }

  // const fetchUser = async() => {
  //   try{
  //     const response = await fetch("http://127.0.0.1:8000/auth/protected-route")
  //     if(!response.ok) {
  //       throw new Error(`HTTP Error status: ${response.status}`)
  //     }
  //     const message = await response.json()
  //     console.log(message)
  //   }catch (err) {
  //     console.error("Submission error:", err);
  //   }
  // }
  
  const context = {
    user,
    login,
    registerUser,
    loading,
    logout,
    error
  }
  return (
    <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default AuthProvider