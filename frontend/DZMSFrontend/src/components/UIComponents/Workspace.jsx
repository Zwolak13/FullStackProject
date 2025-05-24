import { useState, useEffect } from "react";
import ShoppingLists from "./ShoppingLists";
import AddListForm from "./AddListForm";

export default function Workspace({...props}){

    const [activeWorkspace,setActiveWorkspace] = useState("shopping")
    const [visibleWorkspace,setVisibleWorkspace] = useState(activeWorkspace);
    const [fancyDelay, setFancyDelay] = useState(false);

    useEffect(() =>{
            setFancyDelay(true);

        const falseDelay = setTimeout(()=>{
            setFancyDelay(false);
            setVisibleWorkspace(activeWorkspace);
        },1000)
        return () =>{
            clearTimeout(falseDelay);
        }
    },[activeWorkspace])


let workspaceContent;
  if (visibleWorkspace === 'shopping') {
    workspaceContent = <ShoppingLists changeWorkspace={(toWhat) => setActiveWorkspace(toWhat)} />;
  } else if (visibleWorkspace === 'addForm') {
    workspaceContent = <AddListForm goBackToList={() => setActiveWorkspace('shopping')} />;
  }
    

    return (
        <main {...props}>
            <div className={`transition-all duration-500 ${fancyDelay ? 'opacity-0' : 'opacity-100'}`}>
                {workspaceContent}
            </div>
        </main>

    )

}