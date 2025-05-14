import LOGO from '../../assets/logo.png'

export default function LeftSideBanerLogin(){
    return (
        <>
        <div className='relative'>
                        <img src={LOGO} alt='ShopLifer-logo' className='w-48'/>
                        <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center bg-gradient-to-r from-secondary-light-one via-primary-light to-secondary-light_three text-transparent bg-clip-text font-bold text-2xl">
                         ShopLifter
                         </p>
                    </div>
                    <p>Welcome Back!</p>
                    <p>To stay connected with us please login with you personal info</p>

                    <button>Sing in</button>
                    <div className="absolute bottom-[-100px] right-[-200px] w-200 h-150 bg-white rounded-t-full opacity-10 rotate-320 overflow-hidden"></div>
                    <div className="absolute bottom-[-100px] right-[-200px] w-180 h-130 bg-white rounded-t-full opacity-10 rotate-320"></div>
                    <div className="absolute bottom-[-100px] right-[-200px] w-160 h-110 bg-white rounded-t-full opacity-10 rotate-320"></div>
        </>
    )
}