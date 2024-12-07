import { Link, useNavigate } from "react-router-dom"
import loginImage from "../assets/simone-hutsch-2H3OuzkF-SY-unsplash 1.png"
import { SubmitHandler, useForm } from "react-hook-form"
import NewUser from "../entities/NewUser"
import { useAuth } from "../context/AuthProvider.tsx"
import { toast } from "react-toastify"
import Notification from "../components/Notification"

const SignUpPage = () => {
  const {register, handleSubmit, formState: { errors }} = useForm<NewUser>()
  const navigate =  useNavigate();
  const { registerUser, loading, error } = useAuth()

  const onSubmit: SubmitHandler<NewUser> = async(data) => {
    const success = await registerUser(data)
    if (success) {
      toast.success("User registered successfully!");
      setTimeout(() => {
        navigate("/login")
      },2000)
    } else {
      toast.error(error || "Registration failed. Please try again.");
    }  
  }

  return (
    <div className="h-screen flex dark:bg-neutral-950">
      <div className="flex-1 flex flex-col justify-center px-10 max-w-[500px] mx-auto">
        <h1 className="font-semibold text-purple text-3xl">Welcome To Horizon</h1>
        <p className="text-sm dark:text-white mb-3">Welcome back! Please enter your details.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col">  
            <label className="dark:text-white" htmlFor="username">username</label>
            <input className="border-2 border-black rounded-xl px-2 py-3" {...register("username", {required: true, minLength: 3 })} placeholder="Enter your fullname" type="text" />
            {errors.username && <p className="text-red-400 text-sm mt-1">This field is required</p>}
          </div>
          <div className="flex flex-col">
            <label className="dark:text-white" htmlFor="email">Email</label>
            <input className="border-2 border-black rounded-xl px-2 py-3" {...register("email", {required: true})} placeholder="Enter your email" type="email" />
            {errors.email && <p className="text-red-400 text-sm mt-1">This field is required</p>}
          </div>
          <div className="flex flex-col">
            <label className="dark:text-white" htmlFor="password">Password</label>
            <input className="border-2 border-black rounded-xl px-2 py-3" {...register("password", {required: true, minLength: 8})} placeholder="*********" type="password" />
            {errors.password && <p className="text-red-400 text-sm mt-1">This field is required</p>}
          </div>
          <button className="text-white py-2 hover:bg-purple/90 rounded-lg bg-purple">{loading ? "loading..." : "Sign Up"}</button>
        </form>
        <p className="text-zinc-600 text-center mt-5">Already have an account <Link to="/login"><span className="text-purple underline">Login</span></Link></p>
      </div>
      <img className="max-lg:hidden" src={loginImage} alt="login illustration" />
      <Notification />
    </div>
  )
}

export default SignUpPage