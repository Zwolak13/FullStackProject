import { useState, useEffect } from "react";

import ResetPasswordForm from "./ResetPasswordForm";

export default function Settings(){

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
    



    


    return (
    <>
    <div className="w-full px-4 relative">
      <h1 className="text-4xl font-bold">Settings</h1>
      <hr className="w-1/4 bg-primary-light/40 h-1 border-0 mt-2 mb-5" />
      <div className="flex flex-wrap gap-6 pb-6 pt-5 justify-center relative">
            <ResetPasswordForm isWaiting={isWaiting} popupAnimation={popupAnimation} />
      </div>
    </div>

    </>
    )
}