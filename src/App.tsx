import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Header } from "./Components/Header";
import { MainPage } from "./Components/MainPage";
import { Wish } from "./Components/Wish";
import { WishList } from './Components/WishList';

function App() {
    return (
        <BrowserRouter>
            <div className="bg-[#000] h-[750px]">
                <Header/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="wishlist" element={<WishList/>}/>
                    <Route path="wish" element={<Wish/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;