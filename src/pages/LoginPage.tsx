import { Link, useNavigate } from "react-router-dom"
import loginImage from "../assets/simone-hutsch-2H3OuzkF-SY-unsplash 1.png"
import { SubmitHandler, useForm } from "react-hook-form"
import LoginUser from "../entities/LoginUser"
import { useAuth } from "../utils/AuthProvider"
import Notification from "../components/Notification"
import { toast } from "react-toastify"

const LoginPage = () => {
  const {register, handleSubmit, formState: { errors }} = useForm<LoginUser>()
  const { login, loading, error, user } = useAuth()
  const navigate = useNavigate();

  if(user) navigate("/")

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    const success = await login(data);
    if (success) {
      toast.success("Success");
      setTimeout(() => {
        navigate("/");
      },2000)
    }else {
      toast.error(error || "Login attempt failed")
    }
  };

  return (  
      <div className="h-screen flex">
        <div className="flex-1 flex flex-col justify-center px-10 max-w-[500px] mx-auto">
          <h1 className="font-semibold text-3xl">Welcome Back</h1>
          <p className="text-sm text-zinc-600 mb-3">Welcome back! Please enter your details.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input className="border-2 border-black rounded-xl px-2 py-3" {...register("email", {required: true})} placeholder="Enter your email" type="email" />
              {errors.email && <p className="text-red-400 text-sm mt-1">This field is required</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input className="border-2 border-black rounded-xl px-2 py-3" {...register("password", {required: true, minLength: 8})} placeholder="*********" type="password" />
              {errors.password && <p className="text-red-400 text-sm mt-1">This field is required</p>}
            </div>
            <button className="text-white py-2 rounded-lg bg-purple">{loading ? "Logging in..." : "Login"}</button>
          </form>
          <p className="text-zinc-600 text-center mt-5">Don't have an account <Link to="/signup"><span className="text-purple underline">Sign Up</span></Link></p>
        </div>
        <img className="max-lg:hidden" src={loginImage} alt="login illustration" />
        <Notification />
      </div>
  )
}

export default LoginPage