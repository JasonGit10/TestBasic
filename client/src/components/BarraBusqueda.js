import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const BarraBusqueda = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const history = useHistory();
    const onSubmit = (e) => {
        history.push(`/items?search=${searchQuery}`);
        e.preventDefault();
    };
    
    const onInputChange = e => {
        setSearchQuery(e.target.value);
        e.preventDefault();
    }

    return (
        <form
            action="/"
            method="get"
            autoComplete="off"
            onSubmit={onSubmit}
        >
            <input
                value={searchQuery}
                onInput={onInputChange}
                type="text"
                id="header-search"
                placeholder="Search blog posts"
                name="s"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default BarraBusqueda;