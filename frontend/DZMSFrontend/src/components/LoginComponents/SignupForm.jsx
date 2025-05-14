export default function SignupForm({onClick}){
    return (
        <>
                    <h1 className="pt-12 text-4xl">Join Us!</h1>
                    <h2>Create your account to get full experience</h2>
                    <form className="flex flex-col py-15 items-center" >
                        <input type="text" name="email" placeholder="Email"  className=" px-2 w-100 h-12 rounded-2xl bg-primiary-dark/50 mb-8"/>
                        <input type="password" name="password" placeholder="Password" className="px-2 w-100 h-12 rounded-2xl bg-primiary-dark/50 " />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" className="px-2 w-100 h-12 rounded-2xl bg-primiary-dark/50 my-8" />
                        <button type="button" className="bg-secondary-dark w-50 h-8 rounded-2xl text-white font-bold" >Login</button>
                        <p>You already have account? <button type="button" onClick={onClick} className="text-primiary-dark">login</button></p>
                     </form>

        </>
    )
}