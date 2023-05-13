export type WishListType = {
    content: WishListContentType[]
    pageable: PageableType
    totalPages: number
    totalElements: number
    last: boolean
    size: number
    number: number
    sort: SortType
    numberOfElements: number
    first: boolean
    empty: boolean
}

export type WishListContentType = {
    id: number
    title: string
    description: string
    urlLinks: string | string[]
    price: string | number
    categories: string | string[]
}

export type PageableType = {
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
}

export type SortType = {
    empty: boolean
    sorted: boolean
    unsorted: boolean
}