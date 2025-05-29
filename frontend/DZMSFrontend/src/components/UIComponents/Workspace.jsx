import { useState, useEffect } from "react";
import ShoppingLists from "./ShoppingLists";
import AddListForm from "./AddListForm";
import { ActiveListsProvider } from "../Context/ActiveListContext";
import EditListForm from "./EditListForm";
import CompletedLists from "./CompletedLists"
import Summary from "./Summary";

export default function Workspace({activeWorkspace, setActiveWorkspace, ...props}){


    const [visibleWorkspace,setVisibleWorkspace] = useState(activeWorkspace);
    const [editedListId,setEditedListId] = useState(null);
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


    let Content;

    if (visibleWorkspace === 'shopping')Content = <ShoppingLists changeWorkspace={setActiveWorkspace} editList={(id) => setEditedListId(id)} />;
      else if (visibleWorkspace === 'addForm')Content = <AddListForm goBackToList={() => setActiveWorkspace('shopping')} />;
      else if(visibleWorkspace ==='editForm') Content = <EditListForm goBackToList={() => setActiveWorkspace('shopping')} listData={editedListId} />;
      else if(visibleWorkspace === 'completed') Content = <CompletedLists />
      else if(visibleWorkspace === 'summary') Content = <Summary />


    return (
    <main {...props}>
      <div className={`transition-all duration-300 ${fancyDelay ? 'opacity-0' : 'opacity-100'}`}>
          <ActiveListsProvider>
            {Content}
          </ActiveListsProvider>
      </div>
    </main>
  );

}