import { useState, useEffect } from "react";
import ShoppingLists from "./ShoppingLists";

export default function Workspace({ ...props}){

    return (
        <main {...props}>
            <ShoppingLists />
        </main>

    )

}