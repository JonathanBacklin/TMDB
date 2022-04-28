import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Discover from './Components/Discover';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClickedShell from './Components/ClickedShell';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/Discover" element={<Discover />}/>
      <Route path="/movie/:id" element={<ClickedShell />}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


