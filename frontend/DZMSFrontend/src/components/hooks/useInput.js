import { useState } from "react";

export function useInput(defaultValue,validation = () =>{}){
    const [enteredValue, setEnteredValue] = useState(defaultValue);
    
    const [didEdit, setDidEdit] = useState(false)

    const valueIsValid = validation(enteredValue);

    function handleInputChange(event){
        setEnteredValue(event.target.value);
        setDidEdit(false);
    }

    function handleInputBlur(){
        setDidEdit(true);
    }

    function handleClearValue(){
        setEnteredValue('');
        setDidEdit(false);
    }

    return {
        value:enteredValue,
        handleInputBlur,
        handleInputChange,
        handleClearValue,
        hasError: didEdit && !valueIsValid,

    }
}