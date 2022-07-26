import {React, useEffect, useState} from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import FilmCard from "./FilmCard";

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=7cc110cc';

const App = () =>{
    const [Films, setFilms]= useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchFilms = async (title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data= await response.json();
        setFilms(data.Search);
    }
    useEffect(()=>{
        searchFilms('Batman');
    },[]);
    return(
        <div className="app">
            <h1>GlobalFilmShow</h1>

            <div className="search">
                <input
                placeholder="Get your favorite film"
                value = {searchTerm}
                onChange={(e) =>setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon} 
                alt="searchIcon" 
                onClick={() =>searchFilms(searchTerm)}
                />  
            </div>  
            {Films?.length >= 0 ? (            
                <div className="container">
                {Films.map((film)=>
                (<FilmCard film={film} />))
                    }
            </div> )
            :
            (
                <div className="empty">
                    <h2>No Films found</h2>
                </div>
            )}
 
        </div>
    );
}
export default App;