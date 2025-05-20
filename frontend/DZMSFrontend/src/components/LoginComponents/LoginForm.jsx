import { useState } from "react";
import Logo from "../Logo.jsx";
import LOADING_GIF from '../../assets/loading.gif';
import PasswordModal from "./PasswordModal";
import { useInput } from "../hooks/useInput";
import RegisterPopup from "./RegisterPopup.jsx";

export default function LoginForm({onChange, popupAnimation, isLogin, succesfullLogin}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [waitingResponse,setWaitingResponse] = useState(false);

    const {value: emailValue, handleInputChange: handleEmailChange} = useInput('');
    const {value: passwordValue, handleInputChange: handlePasswordChange} = useInput('');

    async function handleLogin(event){
        event.preventDefault();

        setWaitingResponse(true);

        if (passwordValue ==='' && emailValue ==='') {
            setWaitingResponse(false);
            return;
        }

        const payload = {
            email: emailValue,
            password: passwordValue
        }

        try{
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if(response.ok){
                succesfullLogin(true);
            } else if (response.status === 409) {
                popupAnimation('conflict');
            }
        } catch {
            popupAnimation('fail');
        }
        setWaitingResponse(false);
        succesfullLogin(true);
    }

    return (
        <>
        <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Logo className="block lg:hidden -z-10"/>
        <h1 className="pt-12 text-5xl font-bold">welcome<span className="text-primary-light">.</span></h1>
                    <h2 className="text-xl">Login to your account to continue</h2>
                    <form onSubmit={handleLogin} className="flex flex-col py-15 items-center" >
                        <input type="text" name="email" placeholder="Email" value={emailValue} onChange={handleEmailChange} className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 mb-8"/>
                        <input type="password" name="password" placeholder="Password" value={passwordValue} onChange={handlePasswordChange} className="px-2 w-100 h-12 rounded-2xl bg-primary-light/50 mb-2" />
                        <p className="mb-20">Forgot your <button type="button" onClick={()=>setIsModalOpen(true)} className="text-primiary-dark font-bold">password?</button></p>
                        <button type="submit" className="bg-secondary-dark w-50 h-10 rounded-2xl text-white font-bold  hover:bg-white hover:text-secondary-dark hover:border-2 border-secondary-dark flex justify-center items-center"  >{waitingResponse ? <img className="w-7" src={LOADING_GIF} /> : "Login"}</button>
                        <p>Don't have an account? <button type="button" className="text-primiary-dark font-bold hover:underline" disabled={isLogin} onClick={onChange}>sign up</button></p>
                     </form>
            {isLogin.component && <RegisterPopup type={isLogin.popup} animate={isLogin.animation}/> }
        </>

    )
}