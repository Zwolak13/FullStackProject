


export default function LeftSideBanerLogin({...props}){
    return (
        <div {...props}>

                    <p className="font-bold text-4xl pt-10 pb-2">Welcome to ShopLifter!</p>
                    <p className="italic text-[20px] pb-20 px-10 text-center">Track your purchases, expenses, and bills — all in one place</p>
                    <p className="text-[16px] pb-5">Log in or Sign in to stay in touch and enjoy all our features</p>


                   <p className="text-[15px] border-4 px-4 py-2 font-bold rounded-2xl">Dawid Zwolak || Mikołaj Sosiński</p>
                    <div className=" z-0 absolute bottom-[-300px] right-[-350px] w-200 h-150 bg-white rounded-t-full opacity-10 rotate-320 overflow-hidden"></div>
                    <div className="z-0 absolute bottom-[-300px] right-[-350px] w-180 h-130 bg-white rounded-t-full opacity-10 rotate-320"></div>
                    <div className="z-0 absolute bottom-[-300px] right-[-350px] w-160 h-110 bg-white rounded-t-full opacity-10 rotate-320"></div>
        </div>
    )
}