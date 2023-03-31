import css from "./searchBar.module.css"
import {BiSearch} from 'react-icons/bi'
import {MdCancel} from 'react-icons/md'
import React from 'react'


interface SearchBarProps {
    variant?: string
    onSearch: Function
}

const SearchBar : React.FC<SearchBarProps> = ({onSearch}) => {
    const searchRef = React.useRef<HTMLInputElement>();


    return(
        <div className={css.root}>
            <button onClick={() => onSearch(searchRef)} ><BiSearch className="pl-2 pr-2" opacity={0.6} enableBackground={"true"} color="black" size={36}/></button>
            <input ref={searchRef} placeholder="Find a Book or Category" className={css.search} />
            <button onClick={() => searchRef.current.value = ""} ><MdCancel className="pr-1" opacity={0.6} enableBackground={"true"} color="black" size={24}/></button>
        </div>
    )
}

export default SearchBar;