class PaginatorUtil {

    getCurrentPage(offset, limit) {
        const value = (offset - 1) * limit;
        if (value < 0) return 0;
        return value;
    }
}

export default PaginatorUtil;