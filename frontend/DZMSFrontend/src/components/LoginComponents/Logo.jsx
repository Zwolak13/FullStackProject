import LOGO from '../../assets/logo.png'

export default function Logo({...props}){
    return (
        <div className='relative' {...props}>
                        <img src={LOGO} alt='ShopLifer-logo' className='w-48'/>
                        <p className="-z-10 md:z-0 absolute bottom-150 left-1/2 transform -translate-x-1/2 md:bottom-2 text-center bg-gradient-to-r from-secondary-light-one via-primary-light to-secondary-light_three text-transparent bg-clip-text font-bold text-2xl">
                         ShopLifter
                         </p>
        </div>
    )
}