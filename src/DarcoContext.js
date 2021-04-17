import React from 'react';

export const Quality = {
    high: 'high',
    low: 'low'
}

export const Theme = {
    grey: {
        name: 'space grey',
        convert: 'invert(0.8) contrast(1.2) hue-rotate(135rad)',
        invertVal: 0.8,
        hueVal: 0.3
    },
    classic: {
        name: 'classic',
        convert: 'invert(1)',
        invertVal: 1,
        hueVal: 0.5
    },
}

const defaultState = {
    pdf: null,
    step: 0,
    info: null,
    images: null,
    dimensions: [],
    options: {
        quality: Quality.high,
        theme: Theme.classic
    }
}
export const ReducerTypes = {
    Load: 0,
    Info: 1,
    Convert: 2,
    Converting: 3,
    ImagesConverted: 4,
    Download: 5,
    PressedDownload: 6,
    O_Quality: 'quality',
    O_Theme: 'theme',
    DocumentDimensions: 'dimensions'
}
function reducer(state, action) {
    let currOptions = state.options;
    switch (action.type) {
        case ReducerTypes.Load:
            return { ...state, pdf: action.data, images: null }
        case ReducerTypes.Info:
            return { ...state, info: action.data, step: ReducerTypes.Convert}
        case ReducerTypes.Convert:
            return { ...state, step: ReducerTypes.Convert }
        case ReducerTypes.Converting:
            return { ...state, step: ReducerTypes.Converting }
        case ReducerTypes.ImagesConverted:
            return { ...state, images: action.data, step: ReducerTypes.ImagesConverted }
        case ReducerTypes.Download:
            return { ...state, step: ReducerTypes.Download }
        case ReducerTypes.PressedDownload:
            return { ...state, step: ReducerTypes.PressedDownload}
        case ReducerTypes.DocumentDimensions:
            return { ...state, dimensions: action.data}
        case ReducerTypes.O_Quality:
            currOptions.quality = action.data
            return { ...state, options: currOptions }
        case ReducerTypes.O_Theme:
            currOptions.theme = action.data
            return { ...state, options: currOptions }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }

    }
}

export const DarcoContext = React.createContext();
export const useDarco = () => {
    const context = React.useContext(DarcoContext)
    if (context === undefined)
        throw new Error('context must be used within a DarcoProvider')
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
