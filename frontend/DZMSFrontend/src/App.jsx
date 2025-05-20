
import './App.css'
import Login from './components/LoginComponents/Login'
import LeftSideBanerLogin from './components/LoginComponents/LeftSideBanerLogin'
import Logo from "./components/Logo.jsx"
import {  useEffect, useState } from 'react'
import TMP from './components/UIComponents/tmp.jsx'

function App() {
  
  const [firstLoadFlag,setFirstLoadFlag] = useState(false); 

  const [succesfullLoginDOM,setSuccesfullLogin] = useState(false);
  const [hideDom, setHideDom] = useState(false);
  const [delay, setDelay] = useState(false);
  const [changeDom, setChangeDom] = useState(false);


  useEffect(()=>{
    if (firstLoadFlag === false){
      setFirstLoadFlag(true);
      return;
    };

    if(succesfullLoginDOM === true){
        const hideDomTimeout = setTimeout(()=>{
        setHideDom(true);
      },500)

      const changeDomTimeout = setTimeout(()=>{
        setChangeDom(prev => !prev);
      },800)

      return () =>{
        clearTimeout(changeDomTimeout);
        clearTimeout(hideDomTimeout);
      }
    }
    else{
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
                <div className="w-screen h-screen  flex flex-row overflow-hidden">
                    <div id='leftSide' className={`hidden transition-all  duration-1000   bg-gradient-to-br from-primiary-dark to-secondary-dark text-white lg:flex 
                    flex-col justify-center items-center relative  ${changeDom ? 'lg:w-1/6' : 'lg:w-1/2' }`}>
                        <Logo isHidden={hideDom ? true : null} className={`absolute transition-all duration-500 ${hideDom ? 'w-25 top-[0px]' : 'w-48 top-25'}`}/>
                        {changeDom ? 
                        <></>
                        :
                        <LeftSideBanerLogin className={`lg:flex flex-col justify-center items-center relative transition  duration-500 ${hideDom ? 'opacity-0' : 'opacity-100'}`}/>
                        }
                    </div>
                    <div id='rightSide' className={`flex justify-center transition-all w-screen duration-1000  relative ${changeDom ? 'lg:w-5/6' : 'lg:w-1/2' }`} >
                         {changeDom ?
                         <TMP succesfullLoginDOM={setSuccesfullLogin}/>
                        :
                        <Login succesfullLogin={setSuccesfullLogin} className={`flex flex-col justify-center items-center  relative w-full transition  duration-500 ${hideDom ? 'opacity-0' : 'opacity-100'}`} />
                        }
                    </div>
                </div>
      </main>
  )
}

export default App
