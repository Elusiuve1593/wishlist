import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ellipsis from "../../../Assets/gif/ellipsis.gif";
import picture from "../../../Assets/img/picture.jpg";
import { createWishThunk } from "../../../Bll/Reducers/wishListReducer";
import { AppRootStateType, useAppDispatch } from "../../../Bll/store";

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

type WishTypeForm = {
  description: string
  price: number
  cat: string | string[]
  links: string | string[]
  title: string
}

type ModalIsOpenType = {
  modalIsOpen: boolean
  setIsOpen: (modalIsOpen: boolean) => void
}

export const Wish = ({ modalIsOpen, setIsOpen }: ModalIsOpenType) => {
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.spinnerReducer.isLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<WishTypeForm>()

  const onSubmitHandler: SubmitHandler<WishTypeForm> = (data) => {
    const { description, price, cat, links, title } = data

    const categories: string[] = []
    categories.push(cat.toString())
    const urlLinks: string[] = []
    urlLinks.push(links.toString())

    dispatch(createWishThunk({ description, title, price, categories, urlLinks }))
    navigate("/wishlist")
    setIsOpen(false)
    reset()
  }

  return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <div
          className="absolute w-28 top-2/4 left-1/2">
          {isLoading && <img src={ellipsis} ></img>}
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)} >
          <div className="ml-9 text-2xl">Name of the wish: </div>
          <input
            {...register("title", {
              required: "Field is required!",
              maxLength: {
                value: 10,
                message: "Max value, put 10 symbols or less!"
              }
            })}
            className="ml-9 p-1.5 w-[250px] text-xl border-2 border-[#ccc] rounded-2xl"
            type="text"
            placeholder={"Name of the wish"}
          />
          {errors?.title && (
            <div className="ml-9 text-red-600 text-xl">
              {errors.title.message}
            </div>
          )}

          <div className="flex">
            <div className="ml-9  mt-3 mr-[160px] text-2xl">Price of wish: </div>
            <div className="mt-3 text-2xl">Choose the category:</div>
          </div>

          <div className="flex">
            <input
              {...register("price", {
                required: "Filed is required!",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter valid value as a number!"
                }
              })}
              className="ml-9 mr-[50px] p-1.5 w-[250px] text-xl border-2 border-[#ccc] rounded-2xl "
              type="text"
              placeholder="20 - 20 000 uah"
            />
            <select
              className="p-1.5 w-[250px] h-[45px] text-xl border-2 border-[#ccc] rounded-2xl"
              {...register("cat")}
            >
              <option value="Smartphones">Smartphones</option>
              <option value="TV">TV</option>
              <option value="Appliances">Appliances</option>
              <option value="Laptop and PC">Laptop and PC</option>
              <option value="Audio">Audio</option>
              <option value="Sport & Health">Sport & Health</option>
              <option value="Fishing & Hunting">Fishing & Hunting</option>
            </select>
          </div>
          {errors?.price && (
            <div className="ml-9 mb-2 text-red-600 text-xl">
              {errors.price.message}
            </div>
          )}

          <div className="ml-9 text-2xl">Where to buy:</div>
          <input
            {...register("links", {
              required: "Filed is required!"
            })
            }
            className="ml-9 mb-8 p-1.5 w-[500px] text-xl border-2 border-[#ccc] rounded-2xl "
            type="text"
            placeholder="Where to buy"
          />
          {errors?.links && (
            <div className="ml-9 mt-[-30px] mb-4 text-red-600 text-xl">
              {errors.links.message}
            </div>
          )}
          <div>
            <div className="flex ml-9">
              <div
                className="mr-2 pl-9 h-[170px] w-[270px] border-2 border-[#ccc] border-dashed rounded-2xl ">
                <input className="mr-6 p-1.5 hidden"
                  type="file"
                  id="file"
                />
                <label className="ml-[15%] text-xl cursor-pointer" htmlFor="file">
                  <img className="ml-[20%] mt-[-10px]" src={picture} alt="upload" />
                  <div className="ml-[7%]">Download a picture</div>
                </label>
              </div>
              <div className="pr-9">
                <textarea
                  {...register("description", {
                    required: "Filed is required!",
                    maxLength: {
                      value: 220,
                      message: "Max value, put 220 symbols or less!"
                    }
                  })}
                  className="mb-3 p-1.5 h-[170px] w-[270px] text-xl text-center resize-none border-2 border-[#ccc] rounded-2xl"
                  placeholder="Maximum 220 symbols for the Description"
                />
                {errors?.description?.message &&
                  <div className="text-center mt-[-20px] mb-4 text-red-600 text-xl">
                    {errors.description.message}
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="flex ml-[-380px]">
            <button
              className="mt-1 ml-[785px] w-[200px] h-[50px] text-2xl bg-[#ffe500] rounded-2xl"
              type="submit"
            >
              Add the wish
            </button>
          </div>
        </form>
      </Modal>
  )
}