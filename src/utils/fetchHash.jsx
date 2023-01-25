import { useContext } from 'react';
import { AppContext } from './AppContext';


export const fetchHash = async (hash) => {
    const { sharedState, setSharedState } = useContext(AppContext);
    console.log(sharedState)
    return await fetch("/api/hash/" + hash
    ).catch(err => {
        return;
    }).then(res => {
        if (!res || !res.ok || res.status >= 400) {
            return;
        }
        console.log("res", res)
        return res.json();
    }).then(data => {
        if (!data) return;
        setSharedState(state => ({
            ...state,
            block: data
        }))

        console.log("data", data)
        //navigate
        return data;
    });
}