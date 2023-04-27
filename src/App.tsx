import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ellipsis from "./Assets/gif/ellipsis.gif";
import { AppRootStateType } from "./Bll/store";
import { Header } from "./Components/Header/Header";
import { MainPage } from "./Components/MainPage/MainPage";
import { Wish } from "./Components/WishList/Wish/Wish";
import { WishList } from './Components/WishList/WishList';

function App() {
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.spinnerReducer.isLoading)

    return (
        <div>
            <Header />
            <ToastContainer
                position="top-center"
                theme="light"
                pauseOnHover={false}
                transition={Flip}
            />

            <div className="bg-[#000] min-h-screen">
                {isLoading && <div
                    className="absolute w-28 top-2/4 left-1/2">
                    <img src={ellipsis} ></img>
                </div>}

                <Routes >
                    <Route path="/" element={<MainPage />} />
                    <Route path="wishlist" element={<WishList />} />
                    <Route path="wish" element={<Wish
                        modalIsOpen={true}
                        setIsOpen={() => { }} />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;