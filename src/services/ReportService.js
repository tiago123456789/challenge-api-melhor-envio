import ReportServiceFactory from "../factories/ReportServiceFactory";
import ReportType from "../model/ReportType";

class ReportService {

    constructor(reportRepository, producer) {
        this._reportRepository = reportRepository;
        this._producer = producer;
    }

    async generateReport(id, limit = 10000, offset = 0, type, emailSendReport) {
        const titlePerReport = {
            [ReportType.REPORT_MEDIA_TIME_REQUEST_PROXY_GATEWAY]: "Relatório media de tempo da request, proxy e gateway",
            [ReportType.REPORT_SERVICE]: "Relatório de requesições por serviços",
            [ReportType.REPORT_CONSUMER]: "Relatório de requisições por consumidor"
        };

        const message = {
            quantityRegisterReturn: limit,
            offset,
            title: titlePerReport[type],
            to: emailSendReport,
            type
        };

        if (ReportType.REPORT_CONSUMER == type) {
            message.consumerId = id;
        }

        if (ReportType.REPORT_SERVICE == type) {
            message.serviceId = id;
        }

        return this._producer.publish(message);
    }

    async getMediaTimeOfRequestProxyAndGateway(quantityRegisterReturn = 1000, offset = 0) {
        return this._reportRepository
            .getMediaTimeOfRequestProxyAndGateway(quantityRegisterReturn, offset);
    }

    getRequestsPerService(serviceId, quantityRegisterReturn = 1000, offset = 0) {
        return this._reportRepository.getRequestsPerService(serviceId, quantityRegisterReturn, offset);
    }

    getRequestsPerConsumer(consumerId, quantityRegisterReturn = 1000, offset = 0) {
        return this._reportRepository.getRequestsPerConsumer(consumerId, quantityRegisterReturn, offset);
    }
}

export default ReportService;