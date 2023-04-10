import React from 'react';
import './App.css';
import {HomePage} from "./Components/HomePage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./Components/Header";
import {Wish} from "./Components/Wish";

function App() {
    return (
        <BrowserRouter>
            <div className="bg-[#000]">
                <Header/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="wish" element={<Wish/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;