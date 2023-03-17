import {QueryForBlogsType} from "../types";

export const getSortSkipLimit = async (query: QueryForBlogsType) => {
    const sortBy = query?.sortBy.toString()
    const sortDirection = query?.sortDirection
    const sort = {[sortBy]: sortDirection === "asc" ? 1 : -1}
    const pageNumber = query?.pageNumber
    const limit = query?.pageSize
    const skip: number = (+pageNumber - 1) * +limit
    return [sort,skip ,limit]
}