import runProducer from "./Kafka/producer";
//const { CommonTypes } = require("../Types/Common");

//#region kafkajs

export default function LogMessage(message) {
  console.log(message);
  runProducer();
}

//#endregion

// //#region  kafka-node

// var kafka = require("kafka-node"),
//   Producer = kafka.Producer,
//   client = new kafka.KafkaClient(CommonTypes.KafkaHost),
//   producer = new Producer(client);
// var topic = CommonTypes.KafkaTopic;

// var payloads = [
//   {
//     topic: topic,
//     messages: "test message",
//   },
// ];

// /**
//  * ready
//  */
// producer.on("ready", async function () {
//   producer.send(payloads, function (err, data) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(data);
//   });
// });

// /**
//  * error
//  */
// producer.on("error", (err) => {
//   console.log(err);
// });

// //#endregion
