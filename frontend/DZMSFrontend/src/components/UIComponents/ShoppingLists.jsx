import { useState, useRef,useEffect } from "react";
import { useLists } from '../Context/ActiveListContext';

export default function ShoppingLists({changeWorkspace}){
     const [openMenuId, setOpenMenuId] = useState(null);
     const menuRef = useRef(null);

     const { lists, loading, error, removeList } = useLists();

     useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


    return (
    <div className="w-full px-4 ">
      <h1 className="text-4xl font-bold">Your Lists</h1>
      <hr className="w-1/4 bg-primary-light/40 h-1 border-0 mt-2 mb-5" />

      {loading && <p>Loading lists...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 pb-6 grid-cols-[repeat(auto-fit,minmax(300px,300px))]">
          <div className="bg-gray-400/20 min-h-[200px] max-w-[300px] rounded-xl shadow-xl w-full relative border-dashed border-2 border-gray-400/20">
            <button className="w-full h-full" onClick={() => changeWorkspace('addForm')}>
              <span className="text-5xl text-gray-400/80">+</span>
            </button>
          </div>

          {lists.map(item => (
            <div
              key={item.id}
              className="bg-gray-400/20 min-h-[200px] p-6 rounded-xl shadow-xl w-full relative"
            >
              <h2 className="font-semibold text-xl">{item.name}</h2>
              <span className="block text-sm text-gray-500">
                {item.dueDate
                     ? new Date(item.dueDate).toLocaleDateString('pl-PL')
                     : ''}
              </span>
              <p className="text-sm mt-2">{item.description}</p>
              <div className="absolute right-5 top-5">
                <button onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-menu-icon lucide-menu"
                  >
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                    <path d="M4 6h16" />
                  </svg>
                </button>

                {openMenuId === item.id && (
                  <div ref={menuRef} className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={() => {
                        removeList(item.id);
                        setOpenMenuId(null);
                      }}
                    >
                      Remove List
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={() => {
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
      )}
    </div>
  );

}