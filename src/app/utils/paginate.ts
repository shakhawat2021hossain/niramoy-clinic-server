export interface IPaginate {
    page?: string | number;
    limit?: string | number;
    sortBy?: string;
    sortOrder?: "asc" | "desc" | string;
};

export interface IPaginateOp {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
    skip: number
};



export const paginate = (options: IPaginate): IPaginateOp => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit

    return {
        page,
        limit,
        skip,
        sortBy: options.sortBy || "createdAt",
        sortOrder: options.sortOrder === "asc" ? "asc" : "desc"
    };
};
