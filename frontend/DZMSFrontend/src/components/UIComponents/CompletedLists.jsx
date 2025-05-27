import { useState, useRef, useEffect } from "react";
import { useLists } from "../Context/ActiveListContext";

export default function CompletedLists({ changeWorkspace, editList }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const menuRef = useRef(null);
  const { lists, loading, error, removeList } = useLists();

  return (
    <div className="w-full px-4 relative">
      <h1 className="text-4xl font-bold">Completed</h1>
      <hr className="w-1/4 bg-primary-light/40 h-1 border-0 mt-2 mb-5" />

      {loading && <p>Loading lists...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 pb-6 xl:grid-cols-[repeat(auto-fit,minmax(300px,300px))] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] relative">
                 {[...lists]
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .filter(list => list.completed === true)
            .length === 0 && (<p>Waiting for your first completed list</p>)}


          {[...lists]
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .filter(list => list.completed === true)
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

              </div>
            ))}
        </div>
      )}
    </div>
  );
}
