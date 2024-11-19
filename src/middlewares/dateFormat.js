const dateFormat = async (params, next) => {
    const result = await next(params);

    if (Array.isArray(result)) {
        return result.map(item => ({
            ...item,
            date: item.date ? formatDate(item.date) : item.date
        }));
    } else if (result && typeof result === 'object') {
        return {
            ...result,
            date: result.date ? formatDate(result.date) : result.date
        };
    }

    return result;
}

export default dateFormat