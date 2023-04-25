
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
                Create an element
            </button>
        </div>
    )
}