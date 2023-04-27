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
    presentDescription: string
    categories: string | string[]
    urlLinks: string | string[]
}

export const Description = ({
    modalIsOpen,
    setIsOpen,
    presentDescription,
    categories,
    urlLinks }: ModalIsOpenType) => {

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        < Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div>Description: {presentDescription}</div>
            <div>Categories: {categories}</div>
            <div>UrlLinks: <a href={urlLinks.toString()} target="_blank">Go to the web</a></div>
        </ Modal>
    )
}