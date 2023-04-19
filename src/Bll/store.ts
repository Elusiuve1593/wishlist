import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { wishListReducer } from "./Reducers/wishListReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    wishListReducer
})

export const store = configureStore({ reducer: rootReducer })

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector