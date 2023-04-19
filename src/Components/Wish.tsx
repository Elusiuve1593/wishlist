import { ChangeEvent, useState, KeyboardEvent, KeyboardEventHandler } from "react";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { createWishThunk } from "../Bll/Reducers/wishListReducer";
import { useAppDispatch } from "../Bll/store";

export const Wish = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    }
  }

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [modalIsOpen, setIsOpen] = useState<boolean>(true)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [price, setPrice] = useState<string>("0")
  const [editSpan, setEditSpan] = useState<boolean>(true)
  const [pickValue, setPickValue] = useState<string>("Smartphones")

  const categories: string[] = []
  categories.push(pickValue)

  const closeModal = () => {
    setIsOpen(false)
    return navigate("/wishlist")
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onChangeDescriptionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value)
  }
  const onChangePriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.currentTarget.value)
  }
  const onkeyDownHandler = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      return onClickHandler()
    }
  }
  const onEditSpanHandler = () => {
    setEditSpan(!true)
  }

  const onClickHandler = () => {
    dispatch(createWishThunk({ description, title, price, categories }))
    return navigate("/wishlist")
  }

  return (
    <div className="bg-slate-500">

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form id="wishForm">
          {editSpan ?
            <div className="text-2xl uppercase cursor-default"
              onDoubleClick={onEditSpanHandler}
            >Name of the gift</div> :
            <div>
              <div>Name of the gift: </div>
              <input className="border-2 border-[#ccc] rounded-full mb-2 p-2 text-2xl"
                type="text"
                value={description}
                onChange={onChangeDescriptionHandler}
                autoFocus
              />
            </div>
          }
          <div className="flex">
            <div className="mt-3 mr-[125px] mb-2">Price of gift: </div>
            <div className="mt-3 mb-2">Choose the category:</div>
          </div>

          <div className="flex">
            <input className="w-[200px] mr-3 text-red-900 border-2 border-[#ccc] rounded-full mb-2 p-2 text-2xl"
              type="text"
              value={price}
              onChange={onChangePriceHandler}
            />
            <select className="w-[200px] border-2 border-[#ccc] rounded-full mb-2 p-2 text-2xl"
              value={pickValue} onChange={(e: any) => setPickValue(e.target.value)}
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

          <div>Title of the gift:</div>
          <input className="border-2 border-[#ccc] rounded-full mb-3 p-2 text-2xl"
            type="text"
            value={title}
            onChange={onChangeTitleHandler}
          />


        </form>

        <div>
          <button className="bg-[#ffe500] mt-3 ml-[180px] w-[200px] h-[50px] rounded-full"
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