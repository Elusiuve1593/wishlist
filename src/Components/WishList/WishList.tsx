import { useEffect, useState } from "react";
import { FaRegTrashAlt } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateElementBtn } from "../../ Helpers/CreateElementBtn";
import { deleteWishThunk, fetchWishThunk } from "../../Bll/Reducers/wishListReducer";
import { AppRootStateType, useAppDispatch } from "../../Bll/store";
import { WishListType } from "../../Dal/wishApi";
import { Wish } from "./Wish/Wish";
import present from "../../Assets/img/present.png";
import Modal from "react-modal";
import { Description } from "./Description/Description";

export const WishList = () => {
    const wishlist = useSelector<AppRootStateType, WishListType[]>(state => state.wishListReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [modal, setModal] = useState<boolean>(false)
    const [modalIsOpen, setIsOpen] = useState<boolean>(true)
    const [description, setDescription] = useState<boolean>(false)

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
                        <div key={el.id} className="mt-[50px] ml-[50px] w-[200px] h-[250px] bg-[#ccc] rounded-3xl">
                            <button className="ml-[160px] mt-4"
                                onClick={onDeleteHandler}
                            >
                                <FaRegTrashAlt className="text-2xl text-[#000] hover:text-red-600" />
                            </button>
                            <div onClick={() => setDescription(true)} className="cursor-pointer">
                                <div className="ml-[23%] mt-1 w-[110px] text-xl text-[#000]">
                                    <img src={present} alt="present" />
                                </div>

                                <div>
                                    <span className="mt-2 ml-5 block text-[#000] text-xl">
                                        {el.price} uah
                                    </span>
                                </div>

                                <div>
                                    <span className="mt-1 ml-5 block text-[#000] text-xl">
                                        {el.description}
                                    </span>
                                </div>
                                {/* <div><span className="text-red-600">Description:</span> {el.title}</div>
                                <div><span className="text-red-600">Category: </span>{el.categories}</div>
                                <div>Link: <a className="text-red-600" href={el.urlLinks.toString()} target="_blank">Go to the web</a></div> */}
                            </div>
                            {description && <Description
                                modalIsOpen={true}
                                setIsOpen={setIsOpen}
                                title={el.title}
                                categories={el.categories}
                                urlLinks= {el.urlLinks}
                            />}
                        </div>
                    )
                })}
            </div>



            <div>
                <button
                    className="mt-[50px] mb-16 ml-[50px] w-[200px] h-[50px] text-xl text-[#f5f5f5] bg-[#272720] rounded-2xl "
                    onClick={onClickMainPageHandler}
                > Go to main page</button>
            </div>
        </div>
    )
}