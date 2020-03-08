import React, { useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const AlertState = props => {
    const initialState = null;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = useReducer(AlertReducer, initialState);


    //Alert when search bar is empty
    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, type }
        })
        setTimeout(() => dispatch({ type: REMOVE_ALERT}), 4000);
    };

    return (
        <AlertContext.Provider 
            value={{
                alert: state,
                setAlert,
            }}>
            {props.children}
        </AlertContext.Provider>
    )
}
export default AlertState;