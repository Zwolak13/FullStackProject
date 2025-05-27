export default function Nav({logout,isMobile,closeMenu=()=>{},activeSection,setActiveSection,setActiveWorkspace,...props}) {
  

  function handleClick(id){
    setActiveSection(id)
  }

   async function handleLogout() {
  try {
    const res = await fetch('http://localhost:8080/api/users/logout', {
      method: 'POST',
      credentials: 'include', 
    });

    if (!res.ok) {
      throw new Error('Wylogowanie nie powiodło się');
    }
    logout(false); 
  } catch (err) {
    console.error('Błąd wylogowania:', err);
  }
}
    

  const navItems = [
    { id: "shopping", label: "Shopping Lists",workspace: 'shopping', icon: (
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"  xmlns="http://www.w3.org/2000/svg" className="mr-5 ml-4 w-6 h-6">
                <g id="Interface / Shopping_Cart_02">
                <path id="Vector" d="M3 3H3.26835C3.74213 3 3.97943 3 4.17267 3.08548C4.34304 3.16084 4.48871 3.28218 4.59375 3.43604C4.71269 3.61026 4.75564 3.8429 4.84137 4.30727L7.00004 16L17.4218 16C17.875 16 18.1023 16 18.29 15.9199C18.4559 15.8492 18.5989 15.7346 18.7051 15.5889C18.8252 15.4242 18.8761 15.2037 18.9777 14.7631L18.9785 14.76L20.5477 7.95996L20.5481 7.95854C20.7023 7.29016 20.7796 6.95515 20.6947 6.69238C20.6202 6.46182 20.4635 6.26634 20.2556 6.14192C20.0184 6 19.6758 6 18.9887 6H5.5M18 21C17.4477 21 17 20.5523 17 20C17 19.4477 17.4477 19 18 19C18.5523 19 19 19.4477 19 20C19 20.5523 18.5523 21 18 21ZM8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20C9 20.5523 8.55228 21 8 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                </svg>
    )},
    { id: "completed", label: "Completed",workspace: 'completed', icon: (
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                className="mr-5 ml-4 w-6 h-6" >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
    )},
    { id: "summary", label: "Summary", workspace: 'summary', icon: (
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                className="mr-5 ml-4 w-6 h-6" ><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>
    )},
  ];

  return (
    <nav {...props}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
              setActiveWorkspace(item.workspace);
              handleClick(item.id);
              if (isMobile) closeMenu();
            }}
          className={`w-full flex items-center px-4 py-4 transition-all duration-500  ${
            activeSection === item.id ? "bg-white/20" : "hover:bg-primary-light"
          }`}
        >
          {item.icon}
          <span className="font-bold text-[20px]">{item.label}</span>
        </button>
      ))}
    {isMobile ? 
    <>
    <button
          onClick={() => {handleClick(999)
              if (isMobile) closeMenu();
          }}
          className={`w-full flex items-center px-4 py-4 transition-all duration-500  ${
            activeSection === 999 ? "bg-white/20" : "hover:bg-primary-light"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 mr-5 ml-4  stroke-white stroke-2 transition-all duration-300 hover:stroke-gray-500"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
            </svg>
          <span className="font-bold text-[20px]">Settings</span>
    </button>
    <button
          onClick={handleLogout}
          className={`w-full flex items-center px-4 py-4 transition-all duration-500 "
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 mr-5 ml-4 stroke-white stroke-2 rotate-180 transition-all duration-300 hover:stroke-red-800"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
          <span className="font-bold text-[20px]">Logout</span>
        </button>
        
    </>
    :
    <div className="mt-auto mb-3 pl-4 w-full flex direction-row gap-4 ">
        <button onClick={handleLogout}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 stroke-white stroke-2 rotate-180 transition-all duration-300 hover:stroke-red-800"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
        </button>
        <button>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 stroke-white stroke-2 transition-all duration-300 hover:stroke-gray-500"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
            </svg>
        </button>
      </div>   
    }

    
      
    </nav>
  );
}
