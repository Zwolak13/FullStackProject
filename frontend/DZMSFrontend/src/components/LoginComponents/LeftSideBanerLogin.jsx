import Logo from "./Logo";


export default function LeftSideBanerLogin({onSignup, isDisabled, isLoading}){
    return (
        <>
            <Logo />
                    <p className="font-bold text-4xl pt-10 pb-2">Welcome Back!</p>
                        <p className="italic text-[20px] pb-20 px-10 text-center">Track your purchases, expenses, and bills — all in one place</p>
                        <p className="text-[16px] pb-5">Log in or Sign in to stay in touch and enjoy all our features</p>


                    <button type="button" disabled={isDisabled ==='signup' || isLoading ? true : false}onClick={onSignup} className=" z-10 w-50 h-10 border-4  font-bold rounded-2xl hover:bg-white/50 hover:text-primiary-dark hover:border-white/60  transition duration-700 ease-in-out">Sign in</button>
                    <div className=" z-0 absolute bottom-[-100px] right-[-200px] w-200 h-150 bg-white rounded-t-full opacity-10 rotate-320 overflow-hidden"></div>
                    <div className="z-0 absolute bottom-[-100px] right-[-200px] w-180 h-130 bg-white rounded-t-full opacity-10 rotate-320"></div>
                    <div className="z-0 absolute bottom-[-100px] right-[-200px] w-160 h-110 bg-white rounded-t-full opacity-10 rotate-320"></div>
        </>
    )
}