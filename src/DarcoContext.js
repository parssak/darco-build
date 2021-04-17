import React from 'react';

export const Quality = {
    high: 'high',
    low: 'low'
}

export const Theme = {
    grey: {
        name: 'space grey',
        convert: 'invert(0.8) contrast(1.2) hue-rotate(135rad)'
    },
    classic: {
        name: 'classic',
        convert: 'invert(1)'
    },
}

const defaultState = {
    pdf: null,
    step: 1,
    info: null,
    options: {
        quality: Quality.high,
        theme: Theme.classic
    }
}
export const ReducerTypes = {
    Load: 'load',
    Info: 'info',
    Convert: 'convert',
    O_Quality: 'quality',
    O_Theme: 'theme',
}
function reducer(state, action) {
    console.log("Called reducer", action)
    let currOptions = state.options;
    switch (action.type) {
        case ReducerTypes.Load:
            return { ...state, pdf: action.data, step: 2 }
        case ReducerTypes.Info:
            return { ...state, info: action.data, step: 3 }
        case ReducerTypes.O_Quality:
            currOptions.quality = action.data
            return { ...state, options: currOptions}
        case ReducerTypes.O_Theme:
            currOptions.theme = action.data
            return { ...state, options: currOptions}
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