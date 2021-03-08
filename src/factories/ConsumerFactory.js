import Consumer from "../queues/Consumer";

export default (queueName) => {
    return new Consumer(queueName);
}