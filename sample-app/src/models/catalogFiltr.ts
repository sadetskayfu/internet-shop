export interface IFetchCatalogFiltr {
    genderCategory: string[]
    catalogCategory: string[]
    colorCategory: string[]
    sizeCategory: string[]
}

export interface ICatalogFiltr {
    genderCategory: string[]
    catalogCategory: string[]
    colorCategory: string[]
    sizeCategory: string[]
    search: string
    sort: string
}

export interface ICatalogPagination {
    totalCount: number
    totalPerPage: number
    currentPage: number
}