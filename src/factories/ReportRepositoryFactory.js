import ReportRepository from "../repositories/ReportRepository"
import PaginatorUtil from "../utils/PaginatorUtil";

export default () => {
    return new ReportRepository(new PaginatorUtil());
}