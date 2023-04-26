import { FaPlus } from "react-icons/fa"

type CreateElementBtnType = {
    callback: () => void
}

export const CreateElementBtn = ({ callback }: CreateElementBtnType) => {
    return (
        <div>
            <button
                className="mt-[50px] ml-[50px] bg-[#272720] rounded-2xl w-[200px] h-[250px]"
                onClick={callback}
            >
                <div className="ml-[45%] mt-[-10px] pb-2 text-3xl text-[#f5f5f5]">
                    <FaPlus />
                    </div>
               <span className="text-xl text-[#f5f5f5]">Create an element</span> 
            </button>
        </div>
    )
}