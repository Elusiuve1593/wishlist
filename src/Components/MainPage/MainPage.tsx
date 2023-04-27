import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import photo from "../../Assets/img/photo.jpg";
import { Wish } from "../WishList/Wish/Wish";
import { Gifts } from "./Gifts/Gifts";

export const MainPage = () => {
    const navigate = useNavigate()

    const [modal, setModal] = useState<boolean>(false)
    const [modalIsOpen, setIsOpen] = useState<boolean>(true)

    return (
        <div>

            <div className="flex">
                <Gifts />
                <div className="inline-block ml-48 mt-10 p-2">
                    <img className="rounded-full w-[400px] h-[400px]" src={photo} alt="happy woman" />
                </div>
            </div>

            <div className="ml-20 pb-2">
                <div>

                    <button
                        className="text-[#272720] border-2 border-[#d4d4d2] rounded-full p-2 text-2xl mt-8"
                        onClick={() => setModal(true)}
                    >
                        <span className="text-[#d4d4d2]">Create your wish</span>
                    </button>

                    {!modalIsOpen && <Navigate to={"/wishlist"} />}

                    {modal ?
                        <Wish modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} /> :
                        <button
                            className="text-[#272720] border-2 border-[#d4d4d2] rounded-full p-2 ml-32 text-2xl"
                            onClick={() => navigate("/wishlist")}
                        >
                            <span className="text-[#d4d4d2]">Home</span>
                        </button>
                    }

                </div>
            </div>
        </div>
    )
}