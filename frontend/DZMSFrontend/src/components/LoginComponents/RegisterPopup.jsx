export default function RegisterPopups({type,animate}){

    if(type === 'success'){
        return <div className={`-z-10 bg-primary-light/50 px-5 py-5 absolute top-10 -translate-y-30 transition duration-500 ease-in-out ${animate && 'translate-y-0'}`}>
            <p>Your account has been created successfully. You can now log in</p>
        </div>
    }
    else if(type === 'conflict') {
        return <div className={`-z-10 bg-red-500/30 px-5 py-5 absolute top-10 -translate-y-30 transition duration-500 ease-in-out ${animate && 'translate-y-0'}`}>
            <p>This email is already registered.</p>
        </div>
    }
    else if(type === 'fail'){
        return <div className={`-z-10 bg-red-500/30 px-5 py-5 absolute top-10 -translate-y-30 transition duration-500 ease-in-out ${animate && 'translate-y-0'}`}>
            <p>Unknown error. Please try again later.</p>
        </div>
    }else if(type === 'failedLogin'){
        return <div className={`-z-10 bg-red-500/30 px-5 py-5 absolute top-10 -translate-y-30 transition duration-500 ease-in-out ${animate && 'translate-y-0'}`}>
            <p>Login failed. Please check your email and password.</p>
        </div>
    }
    
}