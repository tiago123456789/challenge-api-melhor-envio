import amqplib from "amqplib";

export default amqplib.connect(process.env.URL_RABBITMQ);
 