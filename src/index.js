import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './Pages/App';
import Discover from './Pages/Discover';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ClickedMovie from './Pages/ClickedMovie';
import Footer from './Components/Footer';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Discover" element={<Discover />} />
        <Route path="/movie/:id" element={<ClickedMovie mediaType="movie" />} />
        <Route path="/tv/:id" element={<ClickedMovie mediaType="tv" />} />
        <Route path="*" element={<App />} />
      </Routes>
      <Footer />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


