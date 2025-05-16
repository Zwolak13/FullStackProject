
import { useState } from 'react';

import LoginForm from './LoginForm';
import LeftSideBanerLogin from './LeftSideBanerLogin';
import SignupForm from './SignupForm';

export default function Login(){
    const [isLoading,setIsLoading] = useState(false);
    const [direction, setDirection] = useState('up');
    const [whichForm,setWhichForm]  = useState('login');



    function  handleSignupForm(){
       
        setDirection('up');
        setIsLoading(prev => !prev);
        setTimeout(() => {
            setIsLoading(prev => !prev);
            setWhichForm((prev) => prev === 'login' ? 'signup' : 'login');
            setDirection('down');
        },1000);
  
    }


    return(
        <main  className="flex items-center justify-center min-h-screen">
            <div className="w-screen h-screen  flex flex-row overflow-hidden">
                <div id='rightSide' className="hidden  lg:w-1/2 bg-gradient-to-br from-primiary-dark to-secondary-dark text-white lg:flex flex-col justify-center items-center relative">
                    <LeftSideBanerLogin onSignup={handleSignupForm} isDisabled={whichForm} isLoading={isLoading}/>
                </div>
                <div id='leftSide' className={`flex w-screen flex-col justify-center items-center lg:w-1/2 relative ${isLoading && 'active'}}`} >
                     <div
                        className={`
                        absolute inset-0 bg-gradient-to-r from-primiary-dark to-secondary-dark
                        transition-transform duration-700 ease-in-out pointer-events-none
                        ${isLoading
                            ? direction === 'up'
                            ? 'origin-bottom scale-y-100'
                            : 'origin-top scale-y-100'
                            : direction === 'up'
                            ? 'origin-bottom scale-y-0'
                            : 'origin-top scale-y-0'
                        }
                        `}
                    />


                    {whichForm === 'login' ? <LoginForm isLoading={isLoading} onChange={handleSignupForm}/> : <SignupForm  isLoading={isLoading} onClick={handleSignupForm}/>}
                </div>
            </div>
        </main>
    )
}