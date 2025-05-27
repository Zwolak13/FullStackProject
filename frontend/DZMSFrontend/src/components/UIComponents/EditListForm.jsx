import Input from "../LoginComponents/Input";
import { useInput } from "../hooks/useInput";
import { useState, useEffect } from "react";
import { useLists } from '../Context/ActiveListContext';

export default function EditListForm({goBackToList,listData}){

    const { lists, updateList} = useLists();


    const list = lists.find((l) => l.id === listData);

    const {value: titleValue, handleInputChange: handleTitleChange} = useInput(list.name);
    const {value: dateValue, handleInputChange: handleDateChange} = useInput(list.dueDate);
    const {value: descriptionValue, handleInputChange: handleDescriptionChange} = useInput(list.description);

    const {value: searchValue, handleInputChange: handleSearchChange} = useInput('');

    const [shoppingItems,setShoppingItems] = useState([]);
    
    const [selectedItems, setSelectedItems] = useState(list.items);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    async function handleAddingList(event) {
        event.preventDefault();

        if (titleValue === '' || descriptionValue === '' || selectedItems.length === 0) return;

        const itemsWithNullId = selectedItems.map(({ name, price, quantity }) => ({
            id: null,
            name,
            price,
            quantity
        }));

        const payload = {
            name: titleValue,
            description: descriptionValue,
            dueDate: dateValue,
            completed: false,
            items: itemsWithNullId,
        };

        updateList(list.id,payload);

        goBackToList();
    }

    useEffect(() => {
    async function fetchAvailableItems() {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:8080/api/available-items',{
            method: "GET",
            credentials: 'include',
        });
        if (!res.ok) throw new Error('Błąd pobierania dostępnych przedmiotów');
        const data = await res.json();
        setShoppingItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAvailableItems();
    }, []);

    const handleCheckboxChange = (item) => {
        setSelectedItems(prev => {
            const existing = prev.find(p => p.name.trim().toLowerCase() === item.name.trim().toLowerCase());
            if (existing) {
            return prev.filter(p => p.name.trim().toLowerCase() !== item.name.trim().toLowerCase());
            } else {
            return [...prev, { ...item, quantity: 1 }];
            }
        });
    };

    const incrementQuantity = (name) => {
        setSelectedItems(prev =>
            prev.map(item =>
            item.name === name ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    const decrementQuantity = (name) => {
        setSelectedItems(prev => {
            return prev
            .map(item =>
                item.name === name ? {...item, quantity: item.quantity - 1} : item
            )
            .filter(item => item.quantity > 0);
        });
    };



    
    return (
        <div className="w-full px-4 ">
            <button onClick={()=>goBackToList('shopping')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 stroke-primary-light stroke-2" fill="none" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 19L5 12L12 5" />
                    <path d="M19 12H5" />
                </svg>
            </button>
            <h1 className="text-4xl font-bold pt-3 pb-8 flex justify-start items-center lg:block">Edditing Shopping List</h1>
            <div className=" flex flex-col items-center lg:block">
            <form onSubmit={handleAddingList} className="flex flex-wrap gap-6 pb-6 justify-center">
                <div className="h-[500px] w-[420px] max-w-full">
                <Input type="text" name="title" placeholder="Title"  className=" px-2 w-full h-12 rounded-2xl bg-primary-light/50 " onChange={handleTitleChange} value={titleValue}/>
                <Input type="date" name="date"  className=" px-2 w-full h-12 rounded-2xl bg-primary-light/50 " onChange={handleDateChange} value={dateValue}
                min={new Date().toISOString().split("T")[0]}/>
                <div className="relative">
                    <textarea maxLength={100}  className=" p-2 w-full h-30 rounded-2xl bg-primary-light/50 resize-none relative" placeholder="Description" onChange={handleDescriptionChange} value={descriptionValue} />
                    <span className={`absolute bottom-5 right-5 font-bold ${descriptionValue.length=== 100 ?'text-red-800' : 'text-yello'}`}>{descriptionValue.length}/100</span> 
                </div>
                <button type="submit" className="bg-secondary-dark w-30 mt-10 h-10 rounded-2xl text-white font-bold  hover:bg-white hover:text-secondary-dark hover:border-2 border-secondary-dark flex justify-center items-center absolute top-15 left-120">SAVE</button>
                </div>
                <div className="h-[500px] w-[420px] max-w-full flex justify-center items-center ">
                <div className="w-full max-w-3xl h-full bg-white rounded-2xl shadow-lg overflow-hidden flex relative flex-col">
                    <div className="overflow-y-auto hide-scrollbar">
                    <table className="min-w-full  text-left text-sm font-light">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 font-medium text-gray-700 w-1/3">Product</th>
                            <th className="px-4 py-3 font-medium text-gray-700 w-1/3">Cost</th>
                            <th className="px-4 py-3 font-medium text-gray-700 w-1/3 text-center">Add</th>
                        </tr>
                        </thead>
                        <tbody >
                            {loading ? (
                                <tr>
                                <td colSpan={3} className="text-center italic text-gray-500 py-4">
                                    Fetching Items...
                                </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                <td colSpan={3} className="text-center italic text-red-500 py-4">
                                    {error}
                                </td>
                                </tr>
                            ) : shoppingItems
                                .slice()
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .filter(item => !selectedItems.some(p => p.name.toLowerCase() === item.name.toLowerCase()))
                                .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                                .length === 0 ? (
                                <tr>
                                <td colSpan={3} className="text-center italic text-gray-500 py-4">
                                    There is no products
                                </td>
                                </tr>
                            ) : (
                                shoppingItems
                                .slice()
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .filter(item => !selectedItems.some(p => p.name.toLowerCase() === item.name.toLowerCase()))
                                .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))    
                                .map((item) => (
                                    <tr key={item.name} className="h-12 even:bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.price.toFixed(2)}</td>
                                    <td className="px-4 py-2 text-center">
                                        <input
                                        type="checkbox"
                                        checked={selectedItems.some(p => p.name === item.name)}
                                        onChange={() => handleCheckboxChange(item)}
                                        className="accent-blue-500 w-5 h-5"
                                        />
                                    </td>
                                    </tr>
                                ))
                            )}
                            
                            </tbody>

                    </table>
                    </div>
                     <div className="absolute bottom-0 bg-gray-100 w-full px-4 py-3">
                                    <input type="text" className="w-full pl-8" onChange={handleSearchChange} value={searchValue} placeholder='Search product...' />
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6 stroke-black text-gray-700 hover:text-blue-500 transition absolute left-5 top-1/4"
                                fill="none"
                                viewBox="0 0 24 24"
                                >
                                <path d="M21 21l-4.34-4.34" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                <circle cx="11" cy="11" r="8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                </svg>
                    </div>
                </div>
                </div>

                <div className="h-[500px] w-[420px] max-w-full flex justify-center items-center ">
                <div className="w-full max-w-3xl h-full bg-white rounded-2xl shadow-lg overflow-hidden flex relative flex-col">
                    <div className="overflow-y-auto hide-scrollbar">
                    <table className="min-w-full  text-left text-sm font-light">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 font-medium text-gray-700 w-1/3">Product</th>
                            <th className="px-4 py-3 font-medium text-gray-700 w-1/3">Cost</th>
                            <th className="px-4 py-3 font-medium text-gray-700 w-1/3 text-center">Add</th>
                        </tr>
                        </thead>
                        <tbody >
                            {selectedItems.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center italic text-gray-500 py-4">
                                    You have to add product to your list to see them.
                                    </td>
                                </tr>
                                ) : (
                                selectedItems.map(item => (
                                    <tr key={item.name} className="h-12 even:bg-gray-50 hover:bg-gray-100 transition">
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{(item.price*item.quantity).toFixed(2)}</td>
                                    <td className="px-4 py-2 flex items-center justify-center space-x-2">
                                        <button 
                                        type="button"
                                        onClick={() => decrementQuantity(item.name)} 
                                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                        aria-label="Decrease quantity"
                                        >
                                        &lt;
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button 
                                        type="button"
                                        onClick={() => incrementQuantity(item.name)} 
                                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                        aria-label="Increase quantity"
                                        >
                                        &gt;
                                        </button>
                                    </td>
                                    </tr>
                                ))
                                )}
                            </tbody>

                    </table>
                    </div>
                     <div className="absolute bottom-0 bg-gray-100 w-full px-4 py-3 flex flex-row justify-between text-gray-500">
                                   <div className="flex flex-row">
                                     <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6 stroke-black stroke-2 stroke-linecap-round stroke-linejoin-round fill-none lucide lucide-shopping-basket-icon"
                                    >
                                    <path d="m15 11-1 9" />
                                    <path d="m19 11-4-7" />
                                    <path d="M2 11h20" />
                                    <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
                                    <path d="M4.5 15.5h15" />
                                    <path d="m5 11 4-7" />
                                    <path d="m9 11 1 9" />
                                    </svg>
                                
                                <span className="pl-2 ">Total Cost</span>
                                   </div>
                                <div>
                                    <span>{(selectedItems.reduce((acc,item) => acc+item.price*item.quantity,0)).toFixed(2)}</span>
                                </div>
                    </div>
                </div>
                </div>
            </form>
            </div>
        </div>
    )
}