import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { wishApi } from "../../Dal/wishApi";
import { WishListContentType, WishListType } from "../../Types/Types";
import { setSpinner } from "./spinnerReducer";

const initialState: WishListType = {
    content: [],
    pageable: {
        sort: {
            empty: false,
            sorted: true,
            unsorted: false
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 10,
        paged: true,
        unpaged: false
    },
    totalPages: 0,
    totalElements: 0,
    last: true,
    size: 0,
    number: 1,
    sort: {
        empty: false,
        sorted: true,
        unsorted: false
    },
    numberOfElements: 2,
    first: true,
    empty: false
}

export const fetchWishThunk = createAsyncThunk("fetchWish",
    async (arq: { currentPage: number, perPage: number }, { dispatch }) => {
        const { currentPage, perPage } = arq
        dispatch(setSpinner({ isLoading: true }))
        try {
            const res = await wishApi.getWishList(currentPage, perPage)
            dispatch(setWish({ wishList: res.data }))
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        } finally {
            dispatch(setSpinner({ isLoading: false }))
        }
    })

export const createWishThunk = createAsyncThunk("createWish",
    async (param: WishListContentType, { dispatch }) => {
        dispatch(setSpinner({ isLoading: true }))
        try {
            const res = await wishApi.createWish(param)
            dispatch(addWish({ wish: res.data }))
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        } finally {
            dispatch(setSpinner({ isLoading: false }))
        }
    })

export const deleteWishThunk = createAsyncThunk("deleteWish",
    async (id: number, { dispatch }) => {
        dispatch(setSpinner({ isLoading: true }))
        try {
            await wishApi.deleteWish(id)
            dispatch(deleteWish({ wishId: id }))
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message)
            }
        } finally {
            dispatch(setSpinner({ isLoading: false }))
        }
    }
)

const slice = createSlice({
    name: "wish",
    initialState,
    reducers: {
        setWish: (state, action: PayloadAction<{ wishList: WishListType }>) => {
            state.content = action.payload.wishList.content
            state.totalElements = action.payload.wishList.totalElements
        },
        setCurrentPage: (state, action: PayloadAction<{ pageNumber: number }>) => {
            state.number = action.payload.pageNumber

        },
        addWish: (state, action: PayloadAction<{ wish: WishListContentType }>) => {
            state.content.push(action.payload.wish)
        },
        deleteWish: (state, action: PayloadAction<{ wishId: number }>) => {
            state.content = state.content.filter(el => el.id !== action.payload.wishId)
        }
    }
}
)

export const wishListReducer = slice.reducer
export const { setWish, setCurrentPage, addWish, deleteWish } = slice.actions