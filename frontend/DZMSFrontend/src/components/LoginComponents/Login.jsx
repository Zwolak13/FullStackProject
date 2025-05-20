
import { useState, useEffect } from 'react';

import LoginForm from './LoginForm';
import LeftSideBanerLogin from './LeftSideBanerLogin';
import SignupForm from './SignupForm';

export default function Login({succesfullLogin, ...props}){
    const [isLoading,setIsLoading] = useState(false);
    const [direction, setDirection] = useState('up');
    const [whichForm,setWhichForm]  = useState('login');

     const [isWaiting,setIsWaiting] = useState({
        component: false,
        animation: false,
        popup: '',
    });

    function popupAnimation(whichPopup) {
            setIsWaiting({
                component: true,
                animation: false,
                popup: whichPopup,
            });
        }
    
        useEffect(() => {
            if (!isWaiting.component) return;
    
            const animateInTimeout = setTimeout(() => {
                setIsWaiting(prev => ({
                    ...prev,
                    animation: true,
                }));
            }, 100);
    
            const animateOutTimeout = setTimeout(() => {
                setIsWaiting(prev => ({
                    ...prev,
                    animation: false,
                }));
            }, 2000);
    
            const hideComponentTimeout = setTimeout(() => {
                setIsWaiting(prev => ({
                    ...prev,
                    component: false,
                    popup: '',
                }));
            }, 2200); 
    
    
            return () => {
                clearTimeout(animateInTimeout);
                clearTimeout(animateOutTimeout);
                clearTimeout(hideComponentTimeout);
            };
        }, [isWaiting.component]);
    



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
        <div {...props}>
        <div className={`
                        absolute inset-0 bg-gradient-to-r w-screen from-primiary-dark to-secondary-dark
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
                {whichForm === 'login' ? <LoginForm  onChange={handleSignupForm} isLogin={isLoading} popupAnimation={popupAnimation} succesfullLogin={succesfullLogin}/> 
                :
                 <SignupForm   onClick={handleSignupForm} isRegistered={isLoading} popupAnimation={popupAnimation}/>}
        </div>
    )
}