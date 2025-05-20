
import Logo from "../Logo.jsx";
import LOADING_GIF from '../../assets/loading.gif';
import { useInput } from "../hooks/useInput";
import Input from "./Input";
import { useState } from "react";
import RegisterPopup from "./RegisterPopup.jsx";

export default function SignupForm({onClick, isRegistered, popupAnimation, isLoading}){


    const [waitingResponse,setWaitingResponse] = useState(false);

    const {value: emailValue, handleInputChange: handleEmailChange, handleInputBlur:handleEmailBlur, hasError:emailIsInvalid} = useInput('',(value)=>{
        return value.includes('@') && (value.endsWith('.com') || value.endsWith('.pl'));
    });

    const {value: passwordValue, handleInputChange: handlePasswordChange, handleInputBlur:handlePasswordBlur, hasError:passwordIsInvalid} = useInput('',(value)=>{
        const hasUppercase = /[A-Z]/.test(value);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);
        const isLongEnough = value.length >= 10;

        return hasUppercase && hasSpecialChar && isLongEnough;
    });

    const {value: confirmPasswordValue, handleInputChange: handleConfirmPasswordChange, handleInputBlur:handleConfirmPasswordBlur, hasError:confirmPasswordIsInvalid} = useInput('',(value)=>{
        return value === passwordValue;
    });


    async function handleRegistration(event) {
        event.preventDefault();

        if (waitingResponse) return;

        if ((emailIsInvalid || passwordIsInvalid || confirmPasswordIsInvalid)
            ||
            (passwordValue ==='' && emailValue ==='' && confirmPasswordValue === '')) {
            return;
        }

        const payload = {
            email: emailValue,
            password: passwordValue
        };

        setWaitingResponse(true);

        try{
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if(response.ok){
                popupAnimation('success');
            } else if (response.status === 409) {
                console.error('Registration failed:', await response.text());
                popupAnimation('conflict');
            }
        } catch {
            popupAnimation('fail');
        }
        setWaitingResponse(false);
    }

    

    return (
        <>
            <Logo className="block lg:hidden"/>
            <h1 className="pt-12 text-4xl">Join Us!</h1>
            <h2>Create your account to get full experience</h2>
            <form onSubmit={handleRegistration} className="flex flex-col py-12 items-center" >
                <Input type="text" name="email" placeholder="Email"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 "
                       onChange={handleEmailChange} value={emailValue} onBlur={handleEmailBlur}
                       error={emailIsInvalid && 'Please enter valid email.'}/>
                <Input type="password" name="password" placeholder="Password"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 "
                       onChange={handlePasswordChange} value={passwordValue} onBlur={handlePasswordBlur}
                       error={passwordIsInvalid && 'Password must contain at least one uppercase letter and one special character.'}/>
                <Input type="password" name="confirmPassword" placeholder="Confirm Password" className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 "
                       onChange={handleConfirmPasswordChange} value={confirmPasswordValue} onBlur={handleConfirmPasswordBlur}
                       error={confirmPasswordIsInvalid && 'Passwords must match.'}/>
                <button type="submit" className="bg-secondary-dark w-50 h-10 rounded-2xl text-white font-bold  hover:bg-white hover:text-secondary-dark hover:border-2 border-secondary-dark flex justify-center items-center"  >{waitingResponse ? <img className="w-7" src={LOADING_GIF} /> : "Sign in"}</button>
                <p>You already have account? <button type="button" onClick={onClick} disabled={isLoading} className="text-primiary-dark font-bold hover:underline">login</button></p>
            </form>
            {isRegistered.component && <RegisterPopup type={isRegistered.popup} animate={isRegistered.animation}/> }
        </>
    )
}