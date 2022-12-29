import React, { useEffect } from 'react'
import './Loader.css'
import { LoaderQuotes } from './LoaderQuotes'
const Loader = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <div className="loader-container">
      	  <div className="spinner"></div>
          <br/>
          <h3>Loader</h3>
          <br/>
          <p>"{LoaderQuotes[Math.floor(Math.random()*LoaderQuotes.length)]}"</p>
    </div>
  )
}

export default Loader
