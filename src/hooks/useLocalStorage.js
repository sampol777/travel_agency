import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
    const initiateValue = localStorage.getItem(key) || firstValue;

    const [item, setItem] = useState(initiateValue);

    useEffect(function setKeyInLocalStorage() {
        if (item === null) {
            localStorage.removeItem(key);
        }else {
            localStorage.setItem(key, item)
        }
    }, [key, item]);

    return [item,setItem];
}

export default useLocalStorage;