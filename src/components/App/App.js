import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';

import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <div className="page">
                <Header />
                <main className="main">
                    <Routes>
                        <Route path='/' element={<Main />} />
                    </Routes>
                </main>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/movies" element={<Movies />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/signin" element={<Login />} />
        
                </Routes>
                <Footer />
            </div>
        </div>
    )

}

export default App;
