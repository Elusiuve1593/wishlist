import { memo } from "react";
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
    description: boolean
    setDescription: (description: boolean) => void
    presentDescription: string
    categories: string | string[]
    urlLinks: string | string[]

}

export const Description = memo(({
    setDescription,
    description,
    presentDescription,
    categories,
    urlLinks }: ModalIsOpenType) => {

    return (
        < Modal
            isOpen={description}
            onRequestClose={() => setDescription(false)}
            style={customStyles}
        >
            <div>Description: {presentDescription}</div>
            <div>Categories: {categories}</div>
            <div>UrlLinks: <a href={urlLinks.toString()} target="_blank">Go to the web</a></div>
        </ Modal>
    )
})