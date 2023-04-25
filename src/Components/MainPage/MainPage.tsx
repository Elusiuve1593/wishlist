import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import photo from "../../Assets/img/photo.jpg";
import { Wish } from "../WishList/Wish/Wish";

export const MainPage = () => {
    const navigate = useNavigate()

    const [modal, setModal] = useState<boolean>(false)
    const [modalIsOpen, setIsOpen] = useState<boolean>(true)

    const onclickWishHandler = () => setModal(true)
    const onclickHomeHandler = () => navigate("/wishlist")
    return (
        <div>
            <div className="flex">
                <div className="text-8xl mt-20 ml-20 p-3">
                    <div className="text-[#ffe500]">Get only</div>
                    <div>
                        <span className="text-[#ffe500]">the</span>
                        <span className="text-[#ff3737]">gi</span>
                        <span className="text-[#04effe]">ft</span>
                        <span className="text-[#04fc1d]">s</span>
                    </div>
                    <div className="text-[#ffe500]">you want</div>
                </div>

                <div className="inline-block ml-48 mt-10 p-2">
                    <img className="rounded-full w-[400px] h-[400px]" src={photo} alt="happy woman" />
                </div>
            </div>

            <div className="ml-20 pb-2">
                <div className="text-red-500 w">
                    <button
                        className="text-[#272720] border-2 border-[#d4d4d2] rounded-full p-2 text-2xl mt-8"
                        onClick={onclickWishHandler}
                    >
                        <span className="text-[#d4d4d2]">Create your wish</span>
                    </button>
                    {!modalIsOpen && <Navigate to={"/wishlist"} />}
                    {modal ?
                        <Wish modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
                        : <button
                            className="text-[#272720] border-2 border-[#d4d4d2] rounded-full p-2 ml-32 text-2xl"
                            onClick={onclickHomeHandler}
                        >
                            <span className="text-[#d4d4d2]">Home</span>
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}