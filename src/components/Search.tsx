import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";

import "../styles/Search.css"
interface Fun {
	onChange: (params: any) => void;
  }

const Search= ({onChange}:Fun)=>{
    const [searchInput, setSearchInput] = useState("")
    const handelSearch = ()=>{
        onChange(searchInput)
    }
    return(
        <div>
            <FontAwesomeIcon icon={faMagnifyingGlass} id="searchIcon"/>
            <input type="search" placeholder="Search by Question" id="searchInput" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
            <button id="searchButton" onClick={handelSearch}>Search</button>
        </div>
    )
}

export default Search