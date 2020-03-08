import React, { useState, useContext } from 'react';
import GithubContext from '../../Context/github/githubContext';
import AlertContext from '../../Context/Alert/AlertContext';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const [text, setText] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        if(text === ''){
            setAlert('Please enter a name or username to search', 'danger');
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    };

    const onChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" 
                    name="text" 
                    placeholder="Search Users" 
                    value={text}
                    onChange={onChange}
                />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {githubContext.users.length > 0 && 
                <button className="btn btn-light btn-block" 
                    onClick={githubContext.clearUsers}>Clear</button>}
        </div>
    )
}

export default Search;