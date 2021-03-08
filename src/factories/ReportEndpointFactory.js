import ReportEndpoint from "../endpoints/ReportEndpoint"
import ReportServiceFactory from "./ReportServiceFactory"

export default () => {
    return new ReportEndpoint(ReportServiceFactory());
}