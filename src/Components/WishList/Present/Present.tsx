import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Description } from "../Description/Description";
import { BodyOfPresent } from "./BodyOfPresent/BodyOfPresent";
import { deleteWishThunk } from "../../../Bll/Reducers/wishListReducer";
import { useAppDispatch } from "../../../Bll/store";

type PresentType = {
    id: number
    price: string | number
    title: string
    presentDescription: string
    categories: string | string[]
    urlLinks: string | string[]
}

export const Present = ({
    id,
    price,
    title,
    presentDescription,
    categories,
    urlLinks,
}: PresentType) => {
    const dispatch = useAppDispatch()

    const [description, setDescription] = useState<boolean>(false)
    
    return (
        <div className="mt-[50px] ml-[50px] w-[200px] h-[250px] bg-[#ccc] rounded-3xl">
            <div
                className="ml-[160px] pt-4 cursor-pointer"
                onClick={() => dispatch(deleteWishThunk(id))}
            >
                <FaRegTrashAlt className="text-2xl text-[#000] hover:text-red-600" />
            </div>

            <div className="mt-2 cursor-pointer"
                onClick={() => setDescription(true)}
            >
                <BodyOfPresent
                    price={price}
                    title={title}
                />
            </div>

            <Description
                description={description}
                setDescription={setDescription}
                presentDescription={presentDescription}
                categories={categories}
                urlLinks={urlLinks} />

        </div >
    )
}