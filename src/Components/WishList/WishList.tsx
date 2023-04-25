import { useLocation, useNavigate } from "react-router-dom"
import { AppRootStateType, useAppDispatch } from "../../Bll/store"
import { useSelector } from "react-redux"
import { WishListType } from "../../Dal/wishApi"
import { useEffect, useState } from "react"
import { deleteWishThunk, fetchWishThunk } from "../../Bll/Reducers/wishListReducer"
import { Wish } from "./Wish/Wish"
import { CreateElementBtn } from "../../ Helpers/CreateElementBtn"

export const WishList = () => {
    const wishlist = useSelector<AppRootStateType, WishListType[]>(state => state.wishListReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [modal, setModal] = useState<boolean>(false)
    const [modalIsOpen, setIsOpen] = useState<boolean>(true)

    useEffect(() => {
        dispatch(fetchWishThunk())
    }, [dispatch])

    const onClickMainPageHandler = () => navigate("/")

    return (
        <div >
            <div className="flex flex-wrap text-cyan-100">
                
                {modalIsOpen === false ?
                    <div>
                        <CreateElementBtn callback={() => setIsOpen(true)} />
                    </div> : null

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
                    const onDeleteHandler = () => {
                        dispatch(deleteWishThunk(el.id))
                    }
                    return (
                        <div key={el.id}>
                            <div className=" mt-[50px] ml-[50px] bg-[#272720] rounded-2xl w-[200px] h-[250px]">
                                <div><span className="text-red-600">Title:</span> {el.title}</div>
                                <div><span className="text-red-600">Description:</span> {el.description}</div>
                                <div><span className="text-red-600">Price: </span>{el.price} uah</div>
                                <div><span className="text-red-600">Category: </span>{el.categories}</div>
                                <div>Link: <a className="text-red-600" href={el.urlLinks.toString()} target="_blank">Go to the web</a></div>
                                <button className="text-red-600"
                                    onClick={onDeleteHandler}
                                >Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <button
                    className="mt-[50px] text-cyan-100 mb-16 ml-[50px] bg-[#272720] rounded-2xl w-[200px] h-[50px]"
                    onClick={onClickMainPageHandler}
                > Go to main page</button>
            </div>
        </div>
    )
}