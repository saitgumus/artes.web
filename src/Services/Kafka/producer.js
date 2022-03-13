const { Kafka } = require("kafkajs");
const { CommonTypes } = require("../../Types/Common");
const config = require("./config");

// 1.Instantiating kafka
const kafka = new Kafka(config);
// 2.Creating Kafka Producer
const producer = kafka.producer();

export default async function runProducer() {
  const message = {
    nTransOrderID: 1000,
    sTransOrderCode: "TO-101212",
  };
  // 3.Connecting producer to kafka broker.
  await producer.connect();
  await producer.send({
    topic: CommonTypes.KafkaTopic,
    messages: [{ value: JSON.stringify(message) }],
  });
}
