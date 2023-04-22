import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WishListType, wishApi } from "../../Dal/wishApi";
import { setSpinner } from "./spinnerReducer";
import { toast } from "react-toastify";

const initialState = [] as WishListType[]

export const fetchWishThunk = createAsyncThunk("fetchWish",
    async (arq, thunkAPI) => {
        thunkAPI.dispatch(setSpinner({ isLoading: true }))
        try {
            const res = await wishApi.getWishList()
            thunkAPI.dispatch(setWish({ wishList: res.data }))
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        } finally {
            thunkAPI.dispatch(setSpinner({ isLoading: false }))
        }
    })

export const createWishThunk = createAsyncThunk("createWish",
    async (param: {
        description: string,
        title: string,
        price: string | number,
        categories: string[],
        urlLinks: string[]
    }, thunkAPI) => {
        thunkAPI.dispatch(setSpinner({ isLoading: true }))
        try {
            const res = await wishApi.createWish(param.description,
                param.title,
                param.price,
                param.categories,
                param.urlLinks
            )
            thunkAPI.dispatch(addWish({ wish: res.data }))

        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }

        } finally {
            thunkAPI.dispatch(setSpinner({ isLoading: false }))
        }
    })

export const deleteWishThunk = createAsyncThunk("deleteWish",
    async (id: number, thunkAPI) => {
        thunkAPI.dispatch(setSpinner({ isLoading: true }))
        try {
            await wishApi.deleteWish(id)
            thunkAPI.dispatch(deleteWish({ wishId: id }))
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        } finally {
            thunkAPI.dispatch(setSpinner({ isLoading: false }))
        }
    }
)

const slice = createSlice({
    name: "wish",
    initialState,
    reducers: {
        setWish: (state, action: PayloadAction<{ wishList: WishListType[] }>) => {
            return action.payload.wishList.map(el => ({ ...el }))
        },
        addWish: (state, action: PayloadAction<{ wish: WishListType }>) => {
            state.unshift({ ...action.payload.wish })
        },
        deleteWish: (state, action: PayloadAction<{ wishId: number }>) => {
            return state.filter(el => el.id !== action.payload.wishId)
        }
    }
}
)

export const wishListReducer = slice.reducer
export const { setWish, addWish, deleteWish } = slice.actions