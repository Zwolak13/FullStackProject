
import './App.css'
import Login from './components/LoginComponents/Login'
import LeftSideBanerLogin from './components/LoginComponents/LeftSideBanerLogin'
import Logo from "./components/Logo.jsx"
import {  useEffect, useState } from 'react'
import Workspace from './components/UIComponents/Workspace.jsx'
import Nav from './components/UIComponents/Nav.jsx'
import ShoppingLists from './components/UIComponents/ShoppingLists.jsx'

function App() {
  
  const [firstLoadFlag,setFirstLoadFlag] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem('activeSection') || "shopping";
  });

  

  const [succesfullLoginDOM,setSuccesfullLogin] = useState(false);
  const [hideDom, setHideDom] = useState(false);
  const [delay, setDelay] = useState(false);
  const [changeDom, setChangeDom] = useState(false);

  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);


  useEffect(()=>{

    if (firstLoadFlag === false || succesfullLoginDOM === false){
      setFirstLoadFlag(true);
      return;
    };

    if(isMobileMenuOpen){
      const dd = setTimeout(()=>{
        setDelay(true)
        return () =>{
      clearTimeout(dd);
    }
      },200)
    }else{
      const dd = setTimeout(()=>{
        setDelay(false)
        return () =>{
      clearTimeout(dd);
    }
      },200)
    }
    
  },[isMobileMenuOpen]);


  useEffect(()=>{
    if (firstLoadFlag === false){
      setFirstLoadFlag(true);
      return;
    };

    setIsMobileMenuOpen(false);


    if(succesfullLoginDOM === true){
        const hideDomTimeout = setTimeout(()=>{
        setHideDom(true);
        setDelay(true);
      },500)

      const changeDomTimeout = setTimeout(()=>{
        setChangeDom(prev => !prev);
      },800)

      const changeDelay = setTimeout(()=>{
        setDelay(false);
      },1500)
      

      return () =>{
        clearTimeout(changeDomTimeout);
        clearTimeout(changeDelay);
        clearTimeout(hideDomTimeout);
      }
    }
    else{
      setDelay(true);

      const changeDomTimeout = setTimeout(()=>{
        setChangeDom(prev => !prev);
      },500)

      const hideDomTimeout = setTimeout(()=>{
        setHideDom(prev => !prev);
      },800)

      return () =>{
        clearTimeout(changeDomTimeout);
        clearTimeout(hideDomTimeout);
      }
    }

  },[succesfullLoginDOM])


  return (
    <main  className="flex items-center justify-center min-h-screen">
                <div className="w-screen h-screen  flex flex-row hide-scrollbar overflow-y-auto">
                    <div id='leftSide' className={`sticky top-0 sticky hidden transition-all  duration-1000   bg-gradient-to-br from-primiary-dark to-secondary-dark text-white lg:flex 
                    flex-col justify-center  items-center relative  ${changeDom ? 'lg:w-1/6 lg:justify-end' : 'lg:w-1/2' }`}>
                        <Logo isHidden={hideDom ? true : null} className={`absolute transition-all duration-500 ${hideDom ? 'w-25 top-[0px]' : 'w-48 top-25'}`}/>
                        {changeDom ? 
                        <Nav logout={setSuccesfullLogin} className={`h-7/8 w-full pt-2 flex flex-col items-start transition  duration-500 ${delay ? 'opacity-0' : 'opacity-100'}`} 
                        isMobile={false} activeSection={activeSection} setActiveSection={setActiveSection}/>
                        :
                        <LeftSideBanerLogin className={`lg:flex flex-col justify-center items-center relative transition  duration-500 ${hideDom ? 'opacity-0' : 'opacity-100'}`}/>
                        }
                    </div>
                    <div id='rightSide' className={`flex justify-center transition-all w-screen duration-1000  relative ${changeDom ? 'lg:w-5/6 justify-start p-10' : 'lg:w-1/2' }`} >
                        
                        {(succesfullLoginDOM && changeDom) &&
                        <>
                        <button
                        className={`lg:hidden fixed top-4 right-4 z-50 text-white transition  duration-500 ${delay ? 'opacity-0' : 'opacity-100'} ${isMobileMenuOpen ? 'hidden' : ''}`}
                        onClick={() => setIsMobileMenuOpen(prev => !prev)}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                          <line x1="3" y1="12" x2="21" y2="12" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                      </button>

                      {delay && <Nav logout={setSuccesfullLogin} className={` z-20 top-0 left-0 fixed  w-screen bg-primiary-dark transition-all duration-400 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                      isMobile={true} closeMenu={()=>setIsMobileMenuOpen(false)} activeSection={activeSection} setActiveSection={setActiveSection}/>}
                        
                        
                        </>
                      }
                      <div className={`z-10 lg:hidden fixed top-[-30px] right-[-30px] w-25 h-25 bg-primiary-dark rounded-t-full  rotate-220 transition-all duration-800
                        ${isMobileMenuOpen ? 'scale-5000' : 'scale-100'}`} />

                         {changeDom ?
                          <Workspace  className={`w-full transition  duration-500 ${delay ? 'opacity-0' : 'opacity-100'}`}/>
                        :
                        <Login succesfullLogin={setSuccesfullLogin} className={`flex flex-col justify-center items-center  relative w-full transition  duration-500 ${hideDom ? 'opacity-0' : 'opacity-100'}`} />
                        }


                        
                    </div>
                </div>
      </main>
  )
}

export default App
