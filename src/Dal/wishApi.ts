import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:8080/",
})

export const wishApi = {
    getWishList: () => instance.get<WishListType[]>(`wishes`),
    createWish(
        description: string,
        title: string,
        price: string | number,
        categories: string | string[],
        urlLinks: string | string[]
    ) {
        const createWish = { description, title, price, categories, urlLinks }
        return instance.post<WishListType>(`wishes`, createWish)
    },
    deleteWish: (id: number) => instance.delete<number>(`wishes/${id}`),
    updateWish(id: number, title: string, description: string) {
        const updateWish = { id, title, description }
        return instance.put(`wishes`, { updateWish })
    }
}

export type WishListType = {
    id: number
    title: string
    description: string
    urlLinks: string | string[]
    price: string | number
    categories: string | string[]
}