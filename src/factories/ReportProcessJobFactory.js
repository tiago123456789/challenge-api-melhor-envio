import ReportProcessJob from "../jobs/ReportProcessJob"
import ReportServiceFactory from "./ReportServiceFactory";
import ParserUtil from "./../utils/ParserUtil";
import UuidUtil from "./../utils/UuidUtil";
import S3Storage from "../storage/S3Storage";
import Email from "../email/Email";

export default () => {
    return new ReportProcessJob(
        ReportServiceFactory(),
        new ParserUtil(),
        new UuidUtil(),
        new S3Storage(),
        new Email()
    );
}