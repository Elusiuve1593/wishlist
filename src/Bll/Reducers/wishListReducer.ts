import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WishListType, wishApi } from "../../Dal/wishApi";

const initialState: WishListType[] = []

export const fetchWishThunk = createAsyncThunk("fetchWish",
    async (arq, thunkAPI) => {
        try {
            const res = await wishApi.getWishList()
            thunkAPI.dispatch(setWish({ wishList: res.data }))
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            }
        } finally {
            console.log("Finally")
        }
    })

export const createWishThunk = createAsyncThunk("createWish",
    async (param: {
        description: string,
        title: string,
        price: string | number,
        categories: string[]
    }, thunkAPI) => {
        try {
            const res = await wishApi.createWish(param.description,
                param.title,
                param.price,
                param.categories
            )
            thunkAPI.dispatch(addWish({ wish: res.data }))

        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            }

        } finally {
            console.log("Finally")
        }
    })

export const deleteWishThunk = createAsyncThunk("deleteWish",
    async (id: number, thunkAPI) => {
        try {
            await wishApi.deleteWish(id)
            thunkAPI.dispatch(deleteWish({ wishId: id }))
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            }
        } finally {
            console.log("Finally")
        }
    }

)

const slice = createSlice({
    name: "wish",
    initialState,
    reducers: {
        setWish: (state, action: PayloadAction<{ wishList: WishListType[] }>) => {
            return action.payload.wishList.map(el => {
                return { ...el }
            })
        },
        addWish: (state, action: PayloadAction<{ wish: WishListType }>) => {
            state.push({ ...action.payload.wish })
        },
        deleteWish: (state, action: PayloadAction<{ wishId: number }>) => {
            return state.filter(el => el.id !== action.payload.wishId)
        }
    }
}
)

export const wishListReducer = slice.reducer
export const { setWish, addWish, deleteWish } = slice.actions