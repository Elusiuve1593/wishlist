import { useNavigate } from "react-router-dom"

export const WishList = () => {

    const navigate = useNavigate()

    const onClickWishHandler = () => navigate("/wish")
    const onClickMainPageHandler = () => navigate("/")

    return (
        <div className="text-cyan-100">
            <button
                className="mt-[200px] ml-[50px] bg-[#272720] rounded-2xl w-[200px] h-[250px]"
                onClick={onClickWishHandler}
            >
                Create an element
            </button>

            <div>
                <button
                className="mt-[100px] ml-[50px] bg-[#272720] rounded-2xl w-[200px] h-[50px]"
                onClick={onClickMainPageHandler}
                > Go to main page</button>
            </div>
        </div>
    )
}