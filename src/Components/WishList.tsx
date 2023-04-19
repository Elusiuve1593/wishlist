import { useNavigate } from "react-router-dom"
import { AppRootStateType, useAppDispatch } from "../Bll/store"
import { useSelector } from "react-redux"
import { WishListType } from "../Dal/wishApi"
import { useEffect } from "react"
import { deleteWishThunk, fetchWishThunk } from "../Bll/Reducers/wishListReducer"

export const WishList = () => {
    const wishlist = useSelector<AppRootStateType, WishListType[]>(state => state.wishListReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchWishThunk())
    }, [dispatch])

    const navigate = useNavigate()

    const onClickWishHandler = () => navigate("/wish")
    const onClickMainPageHandler = () => navigate("/")

    return (
        <div className=" text-cyan-100">
            <button
                className="mt-[100px] ml-[50px] bg-[#272720] rounded-2xl w-[200px] h-[250px]"
                onClick={onClickWishHandler}
            >
                Create an element
            </button>

            {wishlist.map((el) => {
                const onDeleteHandler = () => {
                    dispatch(deleteWishThunk(el.id))
                }
                return (
                    <>
                        <button className="mt-[30px] ml-[50px] bg-[#272720] rounded-2xl w-[200px] h-[250px]">
                            <div><span className="text-red-600">Title:</span> {el.title}</div>
                            <div><span className="text-red-600">Description:</span> {el.description}</div>
                            <div><span className="text-red-600">Price: </span>{el.price} uah</div>
                            <div><span className="text-red-600">Category: </span>{el.categories}</div>
                        </button>
                        <button className="text-red-600"
                            onClick={onDeleteHandler}
                        >Delete</button>
                    </>

                )
            })}

            <div>
                <button
                    className="mt-[100px] ml-[50px] bg-[#272720] rounded-2xl w-[200px] h-[50px]"
                    onClick={onClickMainPageHandler}
                > Go to main page</button>
            </div>
        </div>
    )
}