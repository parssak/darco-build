import React from 'react';

export const Quality = {
    high: 'high',
    low: 'low'
}

export const Theme = {
    classic: 'classic',
    grey: 'grey'
}

const defaultState = {
    pdf: null,
    settings: {
        quality: Quality.high,
        theme: Theme.classic
  }
}

function reducer(state, action) {
    switch (action.type) {
        case 'load': {
            return { ...state, pdf: action.data}
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }

    }
}

export const DarcoContext = React.createContext();
export const usePdf = () => {
    const context = React.useContext(DarcoContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a DarcoProvider')
    }
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
