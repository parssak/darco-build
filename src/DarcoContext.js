import React from 'react';

export const Quality = {
    high: 'high',
    low: 'low'
}

export const Theme = {
    classic: 'classic',
    grey: 'space grey'
}

const defaultState = {
    pdf: null,
    step: 1,
    info: null,
    settings: {
        quality: Quality.high,
        theme: Theme.classic
  }
}
export const ReducerTypes = {
    Load: 'load',
    Info: 'info',
    Convert: 'convert',
}
function reducer(state, action) {
    console.log("Called reducer", action)
    switch (action.type) {
        case ReducerTypes.Load: 
            return { ...state, pdf: action.data, step: 2}
        case ReducerTypes.Info: 
            return { ...state, info: action.data, step: 3 }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }

    }
}

export const DarcoContext = React.createContext();
export const usePdf = () => {
    const context = React.useContext(DarcoContext)
    if (context === undefined) 
        throw new Error('useCount must be used within a DarcoProvider')
    return context
}

const DarcoProvider = props => {
    const [state, dispatch] = React.useReducer(reducer, defaultState)
    const value = { state, dispatch }
    return (
        <DarcoContext.Provider value={value}>
            {props.children}
        </DarcoContext.Provider>
    );
}

export default DarcoProvider;
