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
    downloadRef: null,
    completion: 0,
    dimensions: [],
    options: {
        quality: Quality.high,
        theme: Theme.classic
    }
}
export const ReducerTypes = {
    Idle: 0,
    Ready: 1,
    Loading: 2,
    Download: 3,
    ImagesConverted: 'images',
    Progress: 'ratio',
    O_Quality: 'quality',
    O_Theme: 'theme',
    DocumentDimensions: 'dimensions'
}
function reducer(state, action) {
    let currOptions = state.options;
    switch (action.type) {
        case ReducerTypes.Idle:
            return { ...state, pdf: action.data, images: null }
        case ReducerTypes.Ready:
            return { ...state, info: action.data, step: ReducerTypes.Ready}
        case ReducerTypes.Loading:
            return { ...state, step: ReducerTypes.Loading}
        case ReducerTypes.ImagesConverted:
            return { ...state, images: action.data.images, downloadRef: action.data.downloadRef, step: ReducerTypes.Download, completion: 1 }
        case ReducerTypes.DocumentDimensions:
            return { ...state, dimensions: action.data }
        case ReducerTypes.Progress:
            return { ...state, completion: action.data }
        case ReducerTypes.O_Quality:
            currOptions.quality = action.data
            return { ...state, options: currOptions }
        case ReducerTypes.O_Theme:
            currOptions.theme = action.data
            return { ...state, options: currOptions }
        default: {
            alert(`Tried doing ${action.type}`)
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
