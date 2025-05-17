
import Logo from "./Logo";
import { useInput } from "../hooks/useInput";
import Input from "./Input";

export default function SignupForm({onClick, isLoading}){

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

    


    return (
        <>
        <Logo className="block lg:hidden"/>
                    <h1 className="pt-12 text-4xl">Join Us!</h1>
                    <h2>Create your account to get full experience</h2>
                    <form className="flex flex-col py-12 items-center" >
                        <Input type="text" name="email" placeholder="Email"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 " 
                        onChange={handleEmailChange} value={emailValue} onBlur={handleEmailBlur} 
                        error={emailIsInvalid && 'Please enter valid email.'}/>
                        <Input type="text" name="password" placeholder="Password"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 " 
                        onChange={handlePasswordChange} value={passwordValue} onBlur={handlePasswordBlur} 
                        error={passwordIsInvalid && 'Password must contain at least one uppercase letter and one special character.'}/>
                        <Input type="password" name="confirmPassword" placeholder="Confirm Password" className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 "
                         onChange={handleConfirmPasswordChange} value={confirmPasswordValue} onBlur={handleConfirmPasswordBlur}  
                         error={confirmPasswordIsInvalid && 'Passwords must match.'}/>
                        <button type="button" className="mt-10 bg-secondary-dark w-50 h-8 rounded-2xl text-white font-bold" >Login</button>
                        <p>You already have account? <button type="button" onClick={onClick} disabled={isLoading} className="text-primiary-dark font-bold hover:underline">login</button></p>
                     </form>

        </>
    )
}