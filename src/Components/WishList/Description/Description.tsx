import Modal from "react-modal";

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

type ModalIsOpenType = {
    modalIsOpen: boolean
    setIsOpen: (modalIsOpen: boolean) => void
}

export const Description = ({ modalIsOpen, setIsOpen }: ModalIsOpenType) => {

    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >

        </Modal>
    )
}