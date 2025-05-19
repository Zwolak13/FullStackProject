export default function TMP({succesfullLoginDOM}){

    function handleLogout(){
        succesfullLoginDOM(false);
    }
    return(
        <button type="button" onClick={handleLogout}>Logout</button>
    )
}