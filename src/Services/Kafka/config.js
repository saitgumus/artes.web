const { CommonTypes } = require("../../Types/Common");

module.exports = {
  clientId: "apman-ui",
  kafka_topic: CommonTypes.KafkaTopic,
  brokers: [CommonTypes.KafkaHost],
  connectionTimeout: 3000,
  authenticationTimeout: 1000,
  reauthenticationThreshold: 10000,
};
