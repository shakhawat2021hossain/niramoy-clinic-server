export const buildWhere = (
    searchTerm: string | undefined,
    searchableFields: string[],
    filters: any
) => {
    const AND: any[] = [];

    // Search
    if (searchTerm) {
        AND.push({
            OR: searchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    console.log(filters) 

    // Filters
    Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined) {
            AND.push({ [key]: filters[key] });  // key: value
        }
    });

    return AND.length ? { AND } : {};
};
