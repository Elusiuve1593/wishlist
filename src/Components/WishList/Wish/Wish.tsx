import { ChangeEvent, KeyboardEvent, useState } from "react";
import Modal from 'react-modal';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ellipsis from "../../../Assets/gif/ellipsis.gif";
import picture from "../../../Assets/img/picture.jpg";
import { createWishThunk } from "../../../Bll/Reducers/wishListReducer";
import { AppRootStateType, useAppDispatch } from "../../../Bll/store";

type ModalIsOpenType = {
  modalIsOpen: boolean
  setIsOpen: (modalIsOpen: boolean) => void
}

export const Wish = ({ modalIsOpen, setIsOpen }: ModalIsOpenType) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "35px",
    }
  }

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [price, setPrice] = useState<string>("")
  const [pickValue, setPickValue] = useState<string>("Smartphones")
  const [link, setUrl] = useState<string>("")

  const categories: string[] = []
  categories.push(pickValue)

  const urlLinks: string[] = []
  urlLinks.push(link)

  const closeModal = () => {
    setIsOpen(true)
    return navigate("/wishlist")
  }

  const onChangeTitleHandler = (e: any) => {
    setTitle(e.currentTarget.value)
  }
  const onChangeDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }
  const onChangePriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.currentTarget.value)
  }
  const onkeyDownHandler = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      onClickHandler()
    }
  }

  const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPickValue(e.target.value)
  }

  const onChangeUrlHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value)
  }

  const onkeyDownCloseHandler = (e: KeyboardEvent) => {
    if (e.key === "Esc") {
      return navigate("/wishlist")
    }
  }

  const onClickCloseHandler = () => navigate("/wishlist")

  const onClickHandler = () => {
    dispatch(createWishThunk({ description, title, price, categories, urlLinks }))
    return navigate("/wishlist")
  }

  const isLoading = useSelector<AppRootStateType, boolean>(state => state.spinnerReducer.isLoading)

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div
          className="absolute w-28 top-2/4 left-1/2">
          {isLoading && <img src={ellipsis} ></img>}
        </div>
        <form id="wishForm">
          <div className="ml-9 mb-2 text-2xl">Name of the wish: </div>
          <input
            className="ml-9 mb-3 p-1.5 w-[250px] text-xl border-2 border-[#ccc] rounded-2xl"
            type="text"
            value={description}
            placeholder="Name of the wish"
            onChange={onChangeDescriptionHandler}
            autoFocus
          />
          <div className="flex">
            <div className="ml-9 mb-2 mt-3 mr-[180px] text-2xl">Price of wish: </div>
            <div className="mt-3 mb-2 text-2xl">Choose the category:</div>
          </div>

          <div className="flex">
            <input
              className="ml-9 mr-[70px] p-1.5 mb-3 w-[250px] text-xl border-2 border-[#ccc] rounded-2xl "
              type="text"
              value={price}
              placeholder="20 - 20 000 uah"
              onChange={onChangePriceHandler}
            />
            <select
              className="p-1.5 w-[250px] h-[45px] text-xl border-2 border-[#ccc] rounded-2xl"
              value={pickValue} onChange={onChangeSelectHandler}
            >
              <option value="Smartphones">Smartphones</option>
              <option value="TV">TV</option>
              <option value="Appliances">Appliances</option>
              <option value="Laptop and PC">Laptop and PC</option>
              <option value="Audio">Audio</option>
              <option value="Sport & Health">Sport & Health</option>
              <option value="Fishing & Hunting">Fishing & Hunting</option>
            </select>
          </div>

          <div className="ml-9 mb-2 text-2xl">Where to buy:</div>
          <input
            className="ml-9 mb-8 p-1.5 w-[500px] text-xl border-2 border-[#ccc] rounded-2xl "
            type="text"
            value={link}
            placeholder="Where to buy"
            onChange={onChangeUrlHandler}
          />
          <div>
            <div className="flex ml-9">
              <div
                className="mr-2 pl-9 h-[200px] w-[280px] border-2 border-[#ccc] border-dashed rounded-2xl ">
                <input className="mr-6 p-1.5 hidden"
                  type="file"
                  id="file"
                />
                <label className="ml-[15%] text-xl cursor-pointer" htmlFor="file">
                  <img className="ml-[20%]" src={picture} alt="upload" />
                  <div className="ml-[7%]">Download a picture</div>
                </label>
              </div>
              <div className="pr-9">
                <textarea
                  className="mb-3 p-1.5 h-[200px] w-[280px] text-xl text-center resize-none border-2 border-[#ccc] rounded-2xl"
                  value={title}
                  placeholder="Title of the wish"
                  onChange={onChangeTitleHandler}
                />
              </div>
            </div>
          </div>
        </form>
        <div className="flex ml-[-380px]">
          <button className="mt-3 w-[200px] h-[50px] ml-[410px] text-2xl border-2 border-[#d4d4d2] rounded-2xl"
            onClick={onClickCloseHandler}
            onKeyDown={onkeyDownCloseHandler}
            form="wishForm"
          >
            Close the wish
          </button>
          <button className="mt-3 ml-[180px] w-[200px] h-[50px] text-2xl bg-[#ffe500] rounded-2xl"
            onClick={onClickHandler}
            onKeyDown={onkeyDownHandler}
            form="wishForm"
          >
            Add the wish
          </button>

        </div>
      </Modal>
    </div>
  )
}