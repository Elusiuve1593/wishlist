import axios from "axios"
import { WishListContentType, WishListType } from "../Types/Types"

const instance = axios.create({
    baseURL: "http://localhost:8080/",
})

export const wishApi = {
    getWishList: (currentPage: number, perPage: number) => {
        return instance.get<WishListType>(`wishes?page=${currentPage}&size=${perPage}`)
    },
    createWish(param: WishListContentType) {
        return instance.post<WishListContentType>(`wishes`, param)
    },
    deleteWish: (id: number) => {
        return instance.delete<number>(`wishes/${id}`)
    },
    updateWish(id: number, title: string, description: string) {
        const updateWish = { id, title, description }
        return instance.put(`wishes`, { updateWish })
    }
}