import { useState, useRef, useEffect } from "react";
import { useLists } from "../Context/ActiveListContext";

export default function ShoppingLists({ changeWorkspace, editList }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const menuRef = useRef(null);
  const { lists, loading, error, removeList } = useLists();

  function handleEditList(item) {
    changeWorkspace("editForm");
    editList(item);
  }

  useEffect(() => {
  function handleClickOutside() {
    if (menuRef.current) {
      setOpenMenuId(null);
    }
  }

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  return (
    <div className="w-full px-4 relative">
      <h1 className="text-4xl font-bold">Your Lists</h1>
      <hr className="w-1/4 bg-primary-light/40 h-1 border-0 mt-2 mb-5" />

      {loading && <p>Loading lists...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 pb-6 xl:grid-cols-[repeat(auto-fit,minmax(300px,300px))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] relative">
          <div className="bg-gray-400/20 min-h-[200px] rounded-xl shadow-xl w-full relative border-dashed border-2 border-gray-400/20">
            <button
              className="w-full h-full"
              onClick={() => changeWorkspace("addForm")}
            >
              <span className="text-5xl text-gray-400/80">+</span>
            </button>
          </div>
          {[...lists]
            .filter(list => list.completed === false)
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((item) => (
              <div
              onClick={() =>
                    setOpenDropdownId(
                      openDropdownId === item.id ? null : item.id
                    )
                  }
                key={item.id}
                className="bg-gray-400/20 min-h-[200px] p-6 rounded-xl shadow-xl w-full relative"
              >
                <h2 className="font-semibold text-xl">{item.name}</h2>
                <span className="block text-sm text-gray-500">
                  {item.dueDate
                    ? new Date(item.dueDate).toLocaleDateString("pl-PL")
                    : ""}
                </span>
                <p className="text-sm mt-2 w-full">
                  {item.description}
                </p>
                <p className="absolute bottom-5 text-sm text-gray-500">
                  Total Cost: {(item.price).toFixed(2)}
                </p>

                {openDropdownId === item.id && (
                  <div className="absolute top-0 left-0 w-full h-full z-10 p-4 bg-white rounded-xl shadow-2xl border">
                    <h3 className="text-md font-bold mb-2">Products:</h3>
                    <ul className="text-sm list-disc pl-5 h-3/4 overflow-y-auto">
                      {item.items.map((singleItem) => (
                        <li key={singleItem.name}>{singleItem.name}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="absolute right-5 top-5">
                  <button
                    onClick={(e) =>{
                       e.stopPropagation();
                       setOpenMenuId(prev => prev === item.id ? null : item.id)
                       console.log(openMenuId);
                    }
                    }
                  >
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
                    >
                      <path d="M4 12h16" />
                      <path d="M4 18h16" />
                      <path d="M4 6h16" />
                    </svg>
                  </button>

                  {openMenuId === item.id && (
                    <div
                    onClick={(e) => e.stopPropagation()}
                      ref={menuRef}
                      className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20"
                    >
                      <button
                        className="block w-full text-left px-4 py-2  hover:bg-gray-200"
                        onClick={() => {
                          setOpenMenuId(null);
                          handleEditList(item.id);
                        }}
                      >
                        Edit List
                      </button>
                      <button
                        className="block w-full text-left text-primary-light px-4 py-2 hover:bg-gray-200"
                        onClick={() => {
                          setOpenMenuId(null);
                          handleEditList(item.id);
                        }}
                      >
                        Completed
                      </button>
                      <button
                        className="block w-full text-left px-4 text-red-800 py-2 hover:bg-gray-200"
                        onClick={() => {
                          removeList(item.id);
                          setOpenMenuId(null);
                        }}
                      >
                        Remove List
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
