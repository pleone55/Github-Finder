import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
} from '../types';

//For deployment
let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.githubClientId;
    githubClientSecret = process.env.githubClientSecret;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = useReducer(GithubReducer, initialState)

    //Search User
    const searchUsers = async text => {

        setLoading();
    
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${githubClientId}&client_secret=${githubClientSecret}`);

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })

    };

    //Get single github user
    const getUser = async (username) => {
        setLoading();

        const res = await axios.get(`https://api.github.com/users/${username}?client_id=
        ${githubClientId}&client_secret=${githubClientSecret}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }; 

    //Get user repos
    const getUserRepos = async (username) => {
        setLoading();

        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
        ${githubClientId}&client_secret=${githubClientSecret}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    };

      //Clear users from state
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return <GithubContext.Provider 
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}>
        {props.children}
    </GithubContext.Provider>
}
export default GithubState;