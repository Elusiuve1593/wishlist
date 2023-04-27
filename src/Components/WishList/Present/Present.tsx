import { FaRegTrashAlt } from "react-icons/fa";
import present from "../../../Assets/img/present.png";
import { Description } from "../Description/Description";
import { useState } from "react";

type PresentType = {
    onDeleteHandler: () => void
    price: string | number
    title: string
    presentDescription: string
    categories: string | string[]
    urlLinks: string | string[]
    modalIsOpen: boolean
    setIsOpen: (modalIsOpen: boolean) => void
}

export const Present = ({
    onDeleteHandler,
    price,
    title,
    presentDescription,
    categories,
    urlLinks,
    modalIsOpen,
    setIsOpen
}: PresentType) => {

    const [description, setDescription] = useState<boolean>(false)

    return (
        <div className="mt-[50px] ml-[50px] w-[200px] h-[250px] bg-[#ccc] rounded-3xl">
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
                        {price} uah
                    </span>
                </div>

                <div>
                    <span className="mt-1 ml-5 block text-[#000] text-xl">
                        {title}
                    </span>
                </div>
            </div>
            {description && <Description
                modalIsOpen={modalIsOpen}
                setIsOpen={setIsOpen}
                presentDescription={presentDescription}
                categories={categories}
                urlLinks={urlLinks}
            />}

        </div>
    )
}