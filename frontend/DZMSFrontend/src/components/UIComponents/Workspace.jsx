import { useState, useEffect } from "react";
import ShoppingLists from "./ShoppingLists";
import AddListForm from "./AddListForm";
import { ActiveListsProvider } from "../Context/ActiveListContext";

export default function Workspace({...props}){

    const [activeWorkspace,setActiveWorkspace] = useState("shopping")
    const [visibleWorkspace,setVisibleWorkspace] = useState(activeWorkspace);
    const [fancyDelay, setFancyDelay] = useState(false);

    useEffect(() =>{
            setFancyDelay(true);

        const falseDelay = setTimeout(()=>{
            setFancyDelay(false);
            setVisibleWorkspace(activeWorkspace);
        },500)
        return () =>{
            clearTimeout(falseDelay);
        }
    },[activeWorkspace])


    

    return (
    <main {...props}>
      <div className={`transition-all duration-300 ${fancyDelay ? 'opacity-0' : 'opacity-100'}`}>
        { (visibleWorkspace === 'shopping' || visibleWorkspace === 'addForm') && (
          <ActiveListsProvider>
            {visibleWorkspace === 'shopping' ? (
              <ShoppingLists changeWorkspace={setActiveWorkspace} />
            ) : (
              <AddListForm goBackToList={() => setActiveWorkspace('shopping')} />
            )}
          </ActiveListsProvider>
        )}

        {visibleWorkspace === 'completed' && (
          <CompletedListsProvider>
            <CompletedLists changeWorkspace={setActiveWorkspace} />
          </CompletedListsProvider>
        )}
      </div>
    </main>
  );

}