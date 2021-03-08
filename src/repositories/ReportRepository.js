import database from "../configs/Database";

class ReportRepository {

    constructor(paginatorUtil) {
        this._paginatorUtil = paginatorUtil;
        this._collection = "metrics";
    }

    getMediaTimeOfRequestProxyAndGateway(quantityRegisterReturn = 1000, offset = 0) {
        return database()
            .then(db => {
                return db.collection(this._collection);
            })
            .then(collection => {
                return new Promise((resolve, reject) => {
                    collection.aggregate([
                        {
                            $group: {
                                _id: "",
                                proxy: { $sum: "$latencies.proxy" },
                                request: { $sum: "$latencies.request" },
                                gateway: { $sum: "$latencies.gateway" },
                                totalRegisters: { $sum: 1 }
                            }
                        }
                    ])
                        .limit(quantityRegisterReturn)
                        .skip(this._paginatorUtil.getCurrentPage(offset, quantityRegisterReturn))
                        .toArray(function (err, result) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            return resolve(result);
                        });
                })
            })
            .then(data => {
                data = data[0];
                return {
                    proxy: (data.proxy / data.totalRegisters),
                    request: (data.request / data.totalRegisters),
                    gateway: (data.gateway / data.totalRegisters),
                };
            })
    }

    getRequestsPerService(serviceId, quantityRegisterReturn = 1000, offset = 0) {
        return database()
            .then(db => {
                return db.collection(this._collection);
            })
            .then(collection => {
                return new Promise((resolve, reject) => {
                    collection.find({
                        "service.id": serviceId
                    })
                        .limit(quantityRegisterReturn)
                        .skip(this._paginatorUtil.getCurrentPage(offset, quantityRegisterReturn))
                        .toArray(function (err, result) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            return resolve(result);
                        });
                })
            });
    }

    getRequestsPerConsumer(consumerId, quantityRegisterReturn = 1000, offset = 0) {
        return database()
            .then(db => {
                return db.collection(this._collection);
            })
            .then(collection => {
                return new Promise((resolve, reject) => {
                    collection.find({
                        "authenticated_entity.consumer_id.uuid": consumerId
                    })
                        .limit(quantityRegisterReturn)
                        .skip(this._paginatorUtil.getCurrentPage(offset, quantityRegisterReturn))
                        .toArray(function (err, result) {
                            if (err) {
                                reject(err);
                                return;
                            }
                            return resolve(result);
                        });
                })
            })
    }
}

export default ReportRepository;