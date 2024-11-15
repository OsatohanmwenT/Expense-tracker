import { Link, useNavigate } from "react-router-dom"
import loginImage from "../assets/simone-hutsch-2H3OuzkF-SY-unsplash 1.png"
import { SubmitHandler, useForm } from "react-hook-form"
import NewUser from "../entities/NewUser"
import { useAuth } from "../utils/AuthProvider"
import { toast } from "react-toastify"
import Notification from "../components/notification"

const SignUpPage = () => {
  const {register, handleSubmit, formState: { errors }} = useForm<NewUser>()
  const navigate =  useNavigate();
  const { registerUser, loading } = useAuth()

  const onSubmit: SubmitHandler<NewUser> = async(data) => {
    const success = await registerUser(data)
    if (success) {
      toast.success("User registered successfully!");
      navigate("/login")
    } else {
      toast.error("Registration failed. Please try again.");
    }  
  }

  return (
    <div className="h-screen flex ">
      <div className="flex-1 flex flex-col justify-center px-10 max-w-[500px] mx-auto">
        <h1 className="font-semibold text-3xl">Welcome Back</h1>
        <p className="text-sm text-zinc-600 mb-3">Welcome back! Please enter your details.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col">  
            <label htmlFor="username">username</label>
            <input className="border-2 border-black rounded-xl px-2 py-3" {...register("username", {required: true, minLength: 3 })} placeholder="Enter your fullname" type="text" />
            {errors.username && <p className="text-red-400 text-sm mt-1">This field is required</p>}
          </div>
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
          <button className="text-white py-2 hover:bg-purple/90 rounded-lg bg-purple">{loading ? "loading..." : "Sign Up"}</button>
        </form>
        <p className="text-zinc-600 text-center mt-5">Already have an account <Link to="/login"><span className="text-purple underline">Login</span></Link></p>
      </div>
      <img className="max-md:hidden" src={loginImage} alt="login illustration" />
      <Notification />
    </div>
  )
}

export default SignUpPage