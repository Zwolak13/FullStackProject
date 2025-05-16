import Logo from "./Logo";

export default function SignupForm({onClick, isLoading}){
    return (
        <>
        <Logo className="block lg:hidden"/>
                    <h1 className="pt-12 text-4xl">Join Us!</h1>
                    <h2>Create your account to get full experience</h2>
                    <form className="flex flex-col py-12 items-center" >
                        <input type="text" name="email" placeholder="Email"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 mb-8"/>
                        <input type="password" name="password" placeholder="Password" className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 mb-8" />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 mb-8" />
                        <button type="button" className="mt-10 bg-secondary-dark w-50 h-8 rounded-2xl text-white font-bold" >Login</button>
                        <p>You already have account? <button type="button" onClick={onClick} disabled={isLoading} className="text-primiary-dark font-bold hover:underline">login</button></p>
                     </form>

        </>
    )
}