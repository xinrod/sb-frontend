import React from 'react';
import './SearchBar.css'
const SearchBar = ({handleSearch}) =>{
    return(
        <input type='search'
        className='search ml4'
        placeholder='search for a class...'
        onChange = {handleSearch}
        />
    )
}

export default SearchBar;