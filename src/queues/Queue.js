import connection from "../configs/Rabbitmq";

class Queue {

    constructor(queueName) {
        this._connection = connection;
        this._queueName = queueName;
        this._channel = null;
    }

    getChannel() {
        return this._channel;
    }

    getQueueName() {
        return this._queueName;
    }

    async create() {
        this._channel = await (await this._connection).createChannel();
        this._channel.assertQueue(this._queueName, { durable: true });
    }

}


export default Queue;


