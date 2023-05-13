import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateElementBtn } from "../../ Helpers/CreateElementBtn";
import { fetchWishThunk, setCurrentPage } from "../../Bll/Reducers/wishListReducer";
import { AppRootStateType, useAppDispatch } from "../../Bll/store";
import { WishListContentType } from "../../Types/Types";
import { Present } from "./Present/Present";
import { Wish } from "./Wish/Wish";
import { createPages } from "../../ Helpers/CreatePages";

export const WishList = () => {
    const wishlist = useSelector<AppRootStateType, WishListContentType[]>(state => state.wishListReducer.content)
    const totalElements = useSelector<AppRootStateType, number>(state => state.wishListReducer.totalElements)
    const currentPage = useSelector<AppRootStateType, number>(state => state.wishListReducer.number)
    const perPage = useSelector<AppRootStateType, number>(state => state.wishListReducer.size)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [modal, setModal] = useState<boolean>(false)
    const [modalIsOpen, setIsOpen] = useState<boolean>(true)

    const pages: [] = [0]

    const pagesCount = Math.ceil(totalElements / perPage)


    createPages(pages, pagesCount, currentPage)


    useEffect(() => {
        dispatch(fetchWishThunk({ currentPage, perPage }))
    }, [currentPage])

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
            <div className="flex justify-center mt-6">
                {pages.map((el, index) => (
                    <div className={currentPage === el ?
                        " bg-[#d4d4d2] font-bold underline cursor-pointer text-2xl text-[#134563] p-2 rounded-full w-12 text-center mr-2"
                        : "bg-[#d4d4d2] cursor-pointer text-2xl p-2 rounded-full w-12 text-center mr-2"}
                        key={index}
                        onClick={() => dispatch(setCurrentPage({ pageNumber: el }))}
                    >
                        {el}

                    </div>
                ))}
            </div>

            <div>
                <button
                    className="mt-[50px] mb-16 ml-[50px] w-[200px] h-[50px] text-xl text-[#f5f5f5] bg-[#272720] rounded-2xl"
                    onClick={() => navigate("/")}
                >
                    Go to main page
                </button>
            </div>
        </div >
    )
}