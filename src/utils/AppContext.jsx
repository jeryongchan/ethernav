import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export default function AppWrapper({ children }) {
    const [sharedState, setSharedState] = useState({
        fetched: "false",
        block: null,
        txn: null
      })

    return (
        <AppContext.Provider value={{sharedState, setSharedState}}>
            {children}
        </AppContext.Provider>
    );
}

// export function useAppContext() {
//     return useContext(AppContext);
// }