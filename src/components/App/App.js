import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { Routes, Route } from 'react-router-dom';

function App() {
    //    const { pathname } = useLocation();

    return (
        <div className="App">
            <div className="page">
                <Header />
                <main className="main">
                    <Routes>
                        <Route path='/' element={<Main />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    )

}

export default App;
