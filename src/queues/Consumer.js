import Queue from "./Queue";

class Consumer extends Queue {

    constructor(queueName) {
        super(queueName);
    }

    async consume(callback) {
        await this.create();
        return this.getChannel()
            .consume(
                this.getQueueName(), 
                (datas) => callback(JSON.parse(datas.content.toString())),
                { noAck: true }
            );
    }
}

export default Consumer;