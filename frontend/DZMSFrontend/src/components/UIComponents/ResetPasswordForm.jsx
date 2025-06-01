import { useInput } from "../hooks/useInput";
import Input from "../LoginComponents/Input";
import LOADING_GIF from '../../assets/loading.gif';
import RegisterPopups from "../LoginComponents/RegisterPopup";
import { useState } from "react";
export default function ResetPasswordForm({isWaiting, popupAnimation}) {

    const [waitingResponse,setWaitingResponse] = useState(false);

    const {value: passwordValue, handleInputChange: handlePasswordChange} = useInput('');
    
        const {value: newPasswordValue, handleInputChange: handleNewPasswordChange, handleInputBlur:handleNewPasswordBlur, hasError:newPasswordIsInvalid} = useInput('',(value)=>{
            const hasUppercase = /[A-Z]/.test(value);
            const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);
            const isLongEnough = value.length >= 10;
    
            return hasUppercase && hasSpecialChar && isLongEnough;
        });
        const {value: newPasswordConfValue, handleInputChange: handleNewPasswordConfChange, handleInputBlur:handleNewPasswordConfBlur, hasError:newPasswordConfIsInvalid} = useInput('',(value)=>{
            return value === newPasswordValue;
        });
    

    async function handleResetPassword(event){
        event.preventDefault();

        if (waitingResponse) return;

        if ((newPasswordIsInvalid || newPasswordConfIsInvalid)
            ||
            (passwordValue ==='' && newPasswordValue ==='' && newPasswordConfValue === '')) {
            return;
        }

        try{
            const response = await fetch('http://localhost:8080/api/users/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({oldPassword: passwordValue, newPassword: newPasswordValue}),
            });

            if(response.ok){
                popupAnimation('successReg');
            } else if (response.status === 401) {
                popupAnimation('conflictReg');
            }
        } catch {
            popupAnimation('fail');
        }
        setWaitingResponse(false);
    }

    return(
        <>
        <div className="h-[500px] min-w-[420px] w-full max-w-[100%] flex flex-col items-center">
                <h1 className="text-2xl font-bold border-b-3 pb-1 border-primary-light/40">Change Password</h1>
                <form onSubmit={handleResetPassword} className="flex flex-col items-center">
                    <Input type="password" name="password" placeholder="Old Password"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 "
                       onChange={handlePasswordChange} value={passwordValue}/>
                    <Input type="password" name="password" placeholder="New Password"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 "
                       onChange={handleNewPasswordChange} value={newPasswordValue} onBlur={handleNewPasswordBlur}
                       error={newPasswordIsInvalid && 'Password must contain at least one uppercase letter and one special character.'}/>
                    <Input type="password" name="password" placeholder="Confirm Password"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 "
                       onChange={handleNewPasswordConfChange} value={newPasswordConfValue} onBlur={handleNewPasswordConfBlur}
                       error={newPasswordConfIsInvalid && 'Passwords must match.'}/>
                       <button type="submit" disabled={isWaiting.component} className="bg-secondary-dark w-50 h-10 rounded-2xl text-white font-bold  hover:bg-white hover:text-secondary-dark hover:border-2 border-secondary-dark flex justify-center items-center"  >{waitingResponse ? <img className="w-7" src={LOADING_GIF} /> : "Reset"}</button>
                </form>
            </div>
        {isWaiting.component && <RegisterPopups type={isWaiting.popup} animate={isWaiting.animation}/>}
        </>
    )
}