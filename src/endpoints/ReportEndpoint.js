import Joi from "joi";
import ReportType from "../model/ReportType";
import Endpoint from "./Endpoint";

class ReportEndpoint extends Endpoint {

    constructor(reportService) { 
        super();
        this._reportService = reportService;
        this.getMediaTimeOfRequestProxyAndGateway = this.getMediaTimeOfRequestProxyAndGateway.bind(this);
        this.getRequestsPerConsumer = this.getRequestsPerConsumer.bind(this);
        this.getRequestsPerService = this.getRequestsPerService.bind(this);
    }

    async getMediaTimeOfRequestProxyAndGateway(request, response, next) {
        try {
            const limit = request.query.limit;
            const offset = request.query.page;
            const data = request.body;
            this.isValid(data, Joi.object({
                email: Joi.string().min(1).required(),
            }));
            await this._reportService.generateReport(
                null, limit, offset,
                ReportType.REPORT_MEDIA_TIME_REQUEST_PROXY_GATEWAY,
                data.email
            );
            return response.json({
                "message": "Relatório será processado é enviado para seu email."
            });
        } catch (error) {
            next(error);
        }
    }

    async getRequestsPerService(request, response, next) {
        try {
            const limit = request.query.limit;
            const offset = request.query.page;
            const id = request.params.id;
            const data = request.body;
            this.isValid(data, Joi.object({
                email: Joi.string().min(1).required(),
            }));
            await this._reportService.generateReport(
                id, limit,
                offset, ReportType.REPORT_SERVICE, data.email
            );
            return response.json({
                "message": "Relatório será processado é enviado para seu email."
            });
        } catch (error) {
            next(error);
        }
    }

    async getRequestsPerConsumer(request, response, next) {
        try {
            const limit = request.query.limit;
            const offset = request.query.page;
            const id = request.params.id;
            const data = request.body;
            this.isValid(data, Joi.object({
                email: Joi.string().min(1).required(),
            }));
            await this._reportService.generateReport(
                id, limit, offset,
                ReportType.REPORT_CONSUMER, data.email
            );
            return response.json({
                "message": "Relatório será processado é enviado para seu email."
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ReportEndpoint;