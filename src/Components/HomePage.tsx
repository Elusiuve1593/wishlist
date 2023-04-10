import photo from "../Assets/img/photo.jpg"

export const HomePage = () => {

    const onclickHandler = () => {

    }
    return (
        <div>
            <div className="mt-2 flex">
                <div className="text-8xl mt- ml-20 p-3">
                    <div className="text-[#ffe500]">Get only</div>
                    <div>
                        <span className="text-[#ffe500]">the</span>
                        <span className="text-[#ff3737]">gi</span>
                        <span className="text-[#04effe]">ft</span>
                        <span className="text-[#04fc1d]">s</span>
                    </div>
                    <div className="text-[#ffe500]">you want</div>
                </div>

                <div className="inline-block ml-80 mt-6 p-2">
                    <img className="rounded-full w-[600px] h-[500px]" src={photo} alt="Karlik"/>
                </div>
            </div>

            <div className="ml-20 pb-2">
                <button className="text-[#272720] border-2 border-[#d4d4d2] rounded-full p-2 text-2xl mt-8 "
                        onClick={onclickHandler}
                >
                    <span className="text-[#d4d4d2]">Create your wish</span>
                </button>
                <button className="text-[#272720] border-2 border-[#d4d4d2] rounded-full p-2 ml-32 text-2xl">
                    <span className="text-[#d4d4d2]">Home</span>
                </button>
            </div>
        </div>
    )
}