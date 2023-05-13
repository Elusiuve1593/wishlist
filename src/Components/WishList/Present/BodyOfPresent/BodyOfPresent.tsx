import { memo } from "react";
import present from "../../../../Assets/img/present.png";

type BodyOfPresentType = {
    price: string | number
    title: string
}

export const BodyOfPresent = memo(({
    price,
    title,
 }: BodyOfPresentType) => {

    return (
        <div>
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
    )
})