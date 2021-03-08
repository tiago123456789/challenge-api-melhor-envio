import ReportType from "../model/ReportType";
import fs from "fs";

class ReportProcessJob {

    constructor(reportService, parserUtil, uuidUtil, s3Storage, email) {
        this._reportService = reportService;
        this._parserUtil = parserUtil;
        this._uuidUtil = uuidUtil;
        this._s3Storage = s3Storage;
        this._email = email;
    }

    async process(data) {
        data.quantityRegisterReturn = parseInt(data.quantityRegisterReturn);
        data.offset = parseInt(data.offset);
        let datas = await this._getDataByType(data, data.type);
        const isNotExistDatas = (datas.length == 0 || Object.keys(datas).length == 0);
        if (isNotExistDatas) {
            return; 
        }
        datas = this._parserUtil.parseArrayObjectToCsv(datas);
        const filename = `${this._uuidUtil.get()}.csv`;
        const pathFile = `${process.env.DIRECTORY_REPORT}${filename}`;
        fs.writeFileSync(pathFile, datas);

        const dataFileUpload = await this._s3Storage.store(pathFile, filename);
        await this._email
            .withFrom(process.env.EMAIL_FROM)
            .withTo(data.to)
            .withSubject(data.title)
            .withHtml(`<a href=${dataFileUpload.urlPublic} >Link do relatório</a>`)
            .send();

        fs.unlinkSync(pathFile); 
    };


    _getDataByType(data, type) {
        if (type == ReportType.REPORT_CONSUMER) {
            return this._reportService.getRequestsPerConsumer(
                data.consumerId, data.quantityRegisterReturn, data.offset
            );
        }

        if (type == ReportType.REPORT_SERVICE) {
            return this._reportService.getRequestsPerService(
                data.serviceId,
                data.quantityRegisterReturn,
                data.offset
            );
        }

        if (type == ReportType.REPORT_MEDIA_TIME_REQUEST_PROXY_GATEWAY) {
            return this._reportService.getMediaTimeOfRequestProxyAndGateway(
                data.quantityRegisterReturn,
                data.offset
            );
        }
    }
}


export default ReportProcessJob;