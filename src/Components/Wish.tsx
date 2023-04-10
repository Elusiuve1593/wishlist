import { useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

export const Wish = () => {
  const navigate = useNavigate()

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

  const [modalIsOpen, setIsOpen] = useState<boolean>(true)

  const closeModal = () => {
    setIsOpen(false)
    return navigate("/wishlist")
  }

  return (
    <div className="bg-slate-500">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>Name of the gift:</div>
        <input className="border-2 border-[#ccc] rounded-full mb-3 p-2 text-2xl" type="text" />

        <div>Title of the gift:</div>
        <input className="border-2 border-[#ccc] rounded-full mb-2 p-2 text-2xl" type="text" />
        
        <div>
          <button className="bg-[#ffe500] mt-3 ml-[180px] w-[200px] h-[50px] rounded-full">
            Add the wish
          </button>
        </div>
      </Modal>

    </div>
  )
}