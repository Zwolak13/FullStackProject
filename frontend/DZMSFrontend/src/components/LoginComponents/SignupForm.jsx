import Logo from "./Logo";
import { useInput } from "../hooks/useInput";
import Input from "./Input";
import { useState, useEffect } from "react";

export default function SignupForm({onClick, isLoading}){

    const [isRegistered,setIsRegistered] = useState({
        component: false,
        animation: false,
        popup: '',
    });

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
        if ((emailIsInvalid || passwordIsInvalid || confirmPasswordIsInvalid)
            ||
            (passwordValue ==='' && emailValue ==='' && confirmPasswordValue === '')) {
            return;
        }

        // Fix: Use proper field names expected by your backend
        const payload = {
            email: emailValue,
            password: passwordValue
        };

        try{
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if(response.ok){
                popupAnimation('success');
            } else {
                console.error('Registration failed:', await response.text());
                popupAnimation('fail');
            }
        } catch (err) {
            console.error('Registration error:', err);
            popupAnimation('fail');
        }
    }

    function popupAnimation(whichPopup) {
        setIsRegistered({
            component: true,
            animation: false,
            popup: whichPopup,
        });
    }

    useEffect(() => {
        if (!isRegistered.component) return;

        const animateInTimeout = setTimeout(() => {
            setIsRegistered(prev => ({
                ...prev,
                animation: true,
            }));
        }, 100);

        const animateOutTimeout = setTimeout(() => {
            setIsRegistered(prev => ({
                ...prev,
                animation: false,
            }));
        }, 2000);

        const hideComponentTimeout = setTimeout(() => {
            setIsRegistered(prev => ({
                ...prev,
                component: false,
                popup: '',
            }));
        }, 2200); // dopasowane do długości animacji


        return () => {
            clearTimeout(animateInTimeout);
            clearTimeout(animateOutTimeout);
            clearTimeout(hideComponentTimeout);
        };
    }, [isRegistered.component]);


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
                <button type="submit" disabled={isRegistered.component} className="mt-10 bg-secondary-dark w-50 h-8 rounded-2xl text-white font-bold" >Sign Up</button>
                <p>You already have account? <button type="button" onClick={onClick} disabled={isLoading} className="text-primiary-dark font-bold hover:underline">login</button></p>
            </form>
            {isRegistered.component && isRegistered.popup === 'success' ?
                <div className={`-z-10 bg-primary-light/50 px-5 py-5 absolute top-10 -translate-y-30 transition duration-500 ease-in-out ${isRegistered.animation && 'translate-y-0'}`}>
                    <p>Your account has been created successfully. You can now log in</p>
                </div>
                :
                <div className={`-z-10 bg-red-500/30 px-5 py-5 absolute top-10 -translate-y-30 transition duration-500 ease-in-out ${isRegistered.animation && 'translate-y-0'}`}>
                    <p>Failed to create account. Please try again later.</p>
                </div>
            }
        </>
    )
}