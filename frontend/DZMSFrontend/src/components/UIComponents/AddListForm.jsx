import Input from "../LoginComponents/Input";
import { useInput } from "../hooks/useInput";

export default function AddListForm({goBackToList}){

    const {value: titleValue, handleInputChange: handleTitleChange} = useInput('');
    const {value: dateValue, handleInputChange: handleDateChange} = useInput('');
    const {value: descriptionValue, handleInputChange: handleDescriptionChange} = useInput('');


    function handleAddingList(event){
        event.preventDefault();
        console.log(titleValue + " " + dateValue + " " + descriptionValue)

        if(titleValue === '' || dateValue === '' || descriptionValue === '') return;
    }
    
    return (
        <div className="w-full px-4 ">
            <button onClick={()=>goBackToList('shopping')}>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 stroke-primary-light stroke-2" fill="none" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 19L5 12L12 5" />
                    <path d="M19 12H5" />
                </svg>
            </button>
            <h1 className="text-4xl font-bold pt-3 pb-8">New Shopping List</h1>
            <form onSubmit={handleAddingList} className="flex flex-col">
                <Input type="text" name="title" placeholder="Title"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 " onChange={handleTitleChange} value={titleValue}/>
                <Input type="date" name="date"  className=" px-2 w-100 h-12 rounded-2xl bg-primary-light/50 " onChange={handleDateChange} value={dateValue}
                min={new Date().toISOString().split("T")[0]}/>
                <textarea className=" p-2 w-100 h-50 rounded-2xl bg-primary-light/50 resize-none" placeholder="Description" onChange={handleDescriptionChange} value={descriptionValue}/>
                <button type="submit" className="bg-secondary-dark w-100 mt-10 h-10 rounded-2xl text-white font-bold  hover:bg-white hover:text-secondary-dark hover:border-2 border-secondary-dark flex justify-center items-center">ADD</button>
            </form>
        </div>
    )
}