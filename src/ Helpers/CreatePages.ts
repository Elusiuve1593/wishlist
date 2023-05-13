export const createPages = (pages: [], pagesCount: number, currentPage: number) => {
    if (pagesCount > 10) {
        if (currentPage > 5) {
            for (let i = currentPage - 4; i <= currentPage + 5; i++) {
                //@ts-ignore
                pages.push(i)
                if (i == pagesCount) break
            }
        }
        else {
            for (let i = 1; i <= 5; i++) {
                //@ts-ignore
                pages.push(i)
                if (i == pagesCount) break
            }
        }
    } else {
        for (let i = 1; i <= pagesCount; i++) {
            //@ts-ignore
            pages.push(i)
        }
    }
}