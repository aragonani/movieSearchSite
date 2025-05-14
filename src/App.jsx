import React from 'react'
import './css/App.css'
// import MovieCard from './components/MovieCard'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import { MovieProvider } from './contexts/MovieContext';


function App() {
  return (
    <MovieProvider>
    <div>
      <Navbar/>
      {/* <MovieCard movie={{title: "Dune Part2", release_date: 2024}}/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
      </Routes>
    </div>
    </MovieProvider>
  )
}

export default App
