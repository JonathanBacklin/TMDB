import React from 'react'
import "../css/footer.css"
const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-content">
          <div className='linear-content'><h1 className="tmdb-logo">TMDB</h1><div className="rectangle"></div></div>
          <h4 style={{ color: 'white' }} >This product uses the TMDb API but is not endorsed <br />or certified by TMDb</h4>
        </div>
      </div>
    </>
  )
}

export default Footer