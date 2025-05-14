import React, { useState,useEffect } from "react";
import { getsearchMovies, getPopularMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import '../css/Home.css'

const Home = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const loadPopularMovies = async () =>{
            try{
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies) 
            }
            catch(err)
            {
                console.log(err);
                setError("Failed to Load Movies");
            }
            finally{
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])
    // const movies = [
    //     {id:1, title: "John Wick", release_date: 2020 },
    //     {id:2, title: "Terminator", release_date: 1998},
    //     {id:3, title: "The Matrix", release_date: 1999 },
    // ];

    

    const handleSearch = async (e) => {
        e.preventDefault();
        if(!searchQuery.trim())
          return
        if(loading)
          return

        setLoading(true)
        try{
            const searchResults = await getsearchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        }
        catch(err)
        {
            console.log(err)
            setError("Failed to search ")
        }
        finally{
            setLoading(false)
        }

        setSearchQuery("")

    };

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <input type="text" placeholder="Search for movies..."
                  className="search-input" value ={searchQuery}
                  onChange={(e)=> setSearchQuery(e.target.value)}/>
            <button>Search</button>
            </form>
            
            {error && <div className="error-message">{error}</div>}

            {loading ? (<div className="loading"><div className="pulse">Loading....</div></div>) : (
                <div className="movies-grid">
                {movies.map(movie => (
                    <MovieCard movie={movie} key={movie.id}/>
                // movie.title.toLowerCase().startsWith(searchQuery) &&  (<MovieCard movie={movie} key={movie.id}/>)
                ))}
            </div>
            ) }
            
        </div>
    )

}

export default Home