import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateElementBtn } from "../../ Helpers/CreateElementBtn";
import { fetchWishThunk } from "../../Bll/Reducers/wishListReducer";
import { AppRootStateType, useAppDispatch } from "../../Bll/store";
import { WishListType } from "../../Dal/wishApi";
import { Present } from "./Present/Present";
import { Wish } from "./Wish/Wish";

export const WishList = () => {
    const wishlist = useSelector<AppRootStateType, WishListType[]>(state => state.wishListReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [modal, setModal] = useState<boolean>(false)
    const [modalIsOpen, setIsOpen] = useState<boolean>(true)

    useEffect(() => {
        dispatch(fetchWishThunk())
    }, [dispatch])

    return (
        <div >
            <div className="flex flex-wrap">
                {!modalIsOpen ?
                    <CreateElementBtn callback={() => setIsOpen(true)} />
                    : null
                }

                {modal ?
                    <Wish
                        modalIsOpen={modalIsOpen}
                        setIsOpen={setIsOpen}
                    /> :
                    <div>
                        <CreateElementBtn callback={() => setModal(true)} />
                    </div>
                }

                {wishlist.map((el) => {
                    return (
                        <div key={el.id}>
                            <Present
                                id={el.id}
                                price={el.price}
                                title={el.title}
                                presentDescription={el.description}
                                categories={el.categories}
                                urlLinks={el.urlLinks}
                            />
                        </div>
                    )
                })}
            </div>

            <div>
                <button
                    className="mt-[50px] mb-16 ml-[50px] w-[200px] h-[50px] text-xl text-[#f5f5f5] bg-[#272720] rounded-2xl "
                    onClick={() => navigate("/")}
                >
                    Go to main page
                </button>
            </div>
        </div>
    )
}