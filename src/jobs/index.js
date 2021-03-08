import "../configs/LoadEnvironmentVariable";
import App from "../constants/App";
import ConsumerFactory from "../factories/ConsumerFactory";
import ReportProcessJobFactory from "../factories/ReportProcessJobFactory";


const consumer = ConsumerFactory(App.REPORT_QUEUE);
const reportProcessJob = ReportProcessJobFactory();
consumer.consume((data) => reportProcessJob.process(data));