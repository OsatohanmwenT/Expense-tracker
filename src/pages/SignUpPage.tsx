import { Link } from "react-router-dom"
import loginImage from "../assets/simone-hutsch-2H3OuzkF-SY-unsplash 1.png"
import { SubmitHandler, useForm } from "react-hook-form"
import NewUser from "../entities/NewUser"

const SignUpPage = () => {
  const {register, handleSubmit, formState: { errors }} = useForm<NewUser>()

  const onSubmit: SubmitHandler<NewUser> = async(data) => {
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
          <button className="text-white py-2 hover:bg-purple/90 rounded-lg bg-purple">Sign Up</button>
        </form>
        <p className="text-zinc-600 text-center mt-5">Already have an account <Link to="/login"><span className="text-purple underline">Login</span></Link></p>
      </div>
      <img src={loginImage} alt="login illustration" />
    </div>
  )
}

export default SignUpPage