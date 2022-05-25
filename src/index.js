import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './Pages/App';
import Discover from './Pages/Discover';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClickedShell from './Pages/ClickedShell';
import Footer from './ReusableComponents/Footer';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Discover" element={<Discover />} />
        <Route path="/movie/:id" element={<ClickedShell mediaType="movie" />} />
        <Route path="/tv/:id" element={<ClickedShell mediaType="tv" />} />
        <Route path="*" element={<App />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


