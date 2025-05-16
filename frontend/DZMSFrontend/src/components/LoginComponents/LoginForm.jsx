import { useState } from "react";
import Logo from "./Logo";
import PasswordModal from "./PasswordModal";

export default function LoginForm({onChange, isLoading}){
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
        <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Logo className="block lg:hidden"/>
        <h1 className="pt-12 text-5xl font-bold">welcome<span className="text-primary-light">.</span></h1>
                    <h2 className="text-xl">Login to your account to continue</h2>
                    <form className="flex flex-col py-15 items-center" >
                        <input type="text" name="email" placeholder="Email"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 mb-8"/>
                        <input type="password" name="password" placeholder="Password" className="px-2 w-100 h-12 rounded-2xl bg-primary-light/50 mb-2" />
                        <p className="mb-20">Forgot your <button type="button" onClick={()=>setIsModalOpen(true)} className="text-primiary-dark font-bold">password?</button></p>
                        <button type="button" className="bg-secondary-dark w-50 h-10 rounded-2xl text-white font-bold  hover:bg-white hover:text-secondary-dark hover:border-2 border-secondary-dark"  >Login</button>
                        <p>Don't have an account? <button type="button" className="text-primiary-dark font-bold hover:underline" disabled={isLoading} onClick={onChange}>sign up</button></p>
                     </form>
            
        </>
    )
}