import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Search.css'

function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate('/products');
        }
    }   

    return (
        <>
            <form className="searchBox" onSubmit={submitHandler}>
                <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)} 
                placeholder='Search here...'
                />
                <input type="submit" value="Search" 
                />
            </form>
        </>
    )
}

export default Search