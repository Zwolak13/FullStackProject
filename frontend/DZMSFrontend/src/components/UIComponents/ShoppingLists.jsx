import { useState, useRef,useEffect } from "react";

export default function ShoppingLists({changeWorkspace}){
     const [openMenuId, setOpenMenuId] = useState(null);
     const menuRef = useRef(null);

     useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    let list = [{
        id: 0,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },
{
        id: 1,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },
{
        id: 2,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },
    {
        id: 3,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },
{
        id: 5,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 6,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 7,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 8,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 9,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 11,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 12,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 13,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 14,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 16,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 15,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },{
        id: 18,
        title: "Today",
        due: '22.05.2025',
        description: 'today shop list'
    },];

    return (
  <div className="w-full px-4 ">
  <h1 className="text-4xl font-bold">Your Lists</h1>
  <hr className="w-1/4 bg-primary-light/40 h-1 border-0 mt-2 mb-5" />
  <div className="grid gap-6 pb-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">

    <div className="bg-gray-400/20 min-h-[200px] rounded-xl shadow-xl  w-full relative border-dashed border-2 border-gray-400/20">
      <button className="w-full h-full" onClick={() => changeWorkspace('addForm')}>
         <span className="text-5xl text-gray-400/80">+</span>
      </button>
    </div>

    {list.map(item => (
      <div
        key={item.id}
        className="bg-gray-400/20 min-h-[200px] p-6 rounded-xl shadow-xl  w-full relative"
      >
        <h2 className="font-semibold text-xl">{item.title}</h2>
        <span className="block text-sm text-gray-500">{item.due}</span>
        <p className="text-sm mt-2">{item.description}</p>
        <div className="absolute right-5 top-5">
            <button onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>
            </button>

            {openMenuId === item.id && (
              <div ref={menuRef} className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    // TODO: Handle remove logic
                    alert(`Removing list: ${item.title}`);
                    setOpenMenuId(null);
                  }}
                >
                  Remove List
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    // Optional: another action
                    alert(`Editing list: ${item.title}`);
                    setOpenMenuId(null);
                  }}
                >
                  Edit List
                </button>
              </div>
            )}
        </div>
      </div>
    ))}
    
  </div>
</div>

)

}