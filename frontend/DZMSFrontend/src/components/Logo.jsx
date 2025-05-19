import LOGO from '../assets/logo.png'

export default function Logo({isHidden=false, ...props}){
    return (
        <div className='relative' {...props}>
                        <img src={LOGO} alt='ShopLifer-logo' className='w-48 transition-all duration-500'/>
                    <p className={`-z-10 lg:z-0 absolute bottom-150 left-1/2 transform -translate-x-1/2 lg:bottom-2 text-center transition-all duration-500
                    bg-gradient-to-r from-secondary-light-one via-primary-light to-secondary-light_three text-transparent bg-clip-text font-bold text-2xl ${isHidden ? 'opacity-0' : ''}`}>
                         ShopLifter
                    </p>
        </div>
    )
}