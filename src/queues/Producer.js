import Queue from "./Queue";

class Producer extends Queue {

    constructor(queueName) {
        super(queueName);
    }

    async publish(datas) { 
        await this.create();
        return this.getChannel().sendToQueue(
            this.getQueueName(), 
            Buffer.from(
                JSON.stringify(datas)
            )
        )
    }
}

export default Producer;