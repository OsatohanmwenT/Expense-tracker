import { createContext, ReactNode, useContext, useState } from "react"
import NewUser from "../entities/NewUser";
import LoginUser from "../entities/LoginUser";
import AuthUser from "../entities/AuthUser";

interface Props {
    children: ReactNode
}

interface AuthContextType {
    login: (data: LoginUser) => Promise<AuthUser>
    register: (data: NewUser) => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState(false);

    const login = async(data: LoginUser) => {
        setLoading(true)
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
          throw new Error(`HTTP Error status: ${res.status}`)
        }
        const responseData = await res.json();
        console.log(responseData)
        localStorage.setItem("user",JSON.stringify(responseData))
        return responseData
      }catch (err) {
        console.error("Submission error:", err);
        return null
      }finally{
        setLoading(false)
      }
    }

    const register = async(data: NewUser) => {
        setLoading(true)
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
              throw new Error(`HTTP Error status: ${res.status}`)
            }
          }catch (err) {
            console.error("Submission error:", err);
        }
        setLoading(false)
    }

  const context = {
    login,
    register,
    loading
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