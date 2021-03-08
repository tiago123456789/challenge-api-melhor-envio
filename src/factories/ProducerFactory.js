import Producer from "../queues/Producer";

export default (queueName) => {
    return new Producer(queueName);
}