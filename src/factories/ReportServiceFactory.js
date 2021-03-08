import App from "../constants/App";
import ReportService from "../services/ReportService";
import ReportRepositoryFactory from "./ReportRepositoryFactory";
import ProducerFactory from "../factories/ProducerFactory";

export default () => {
    return new ReportService(
        ReportRepositoryFactory(),
        ProducerFactory(App.REPORT_QUEUE)
    );
}