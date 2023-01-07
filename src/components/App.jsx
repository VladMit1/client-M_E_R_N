import React from 'react';
import Navbar from './navbar/NavBar';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './autorization/Registration.jsx';
import Login from './autorization/Login.jsx';
import Profile from './profile/Profile';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Navbar />}>
               <Route path="/registration" element={<Registration />}></Route>
               <Route path="/login" element={<Login />}></Route>
            </Route>
            <Route path="/profile" element={<Profile />}></Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
