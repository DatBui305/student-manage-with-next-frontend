import { Kafka } from "kafkajs";

let isRunning = false;

export async function runKafkaConsumer() {
  if (isRunning) return; // Tránh chạy lại nhiều lần

  isRunning = true;

  const kafka = new Kafka({
    clientId: "nextjs-consumer",
    brokers: ["localhost:9092"],
  });

  const consumer = kafka.consumer({ groupId: "notification-group" });

  await consumer.connect();
  await consumer.subscribe({
    topic: "notification-topic",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (message.value) {
        const notification = JSON.parse(message.value.toString());
        console.log("Notification:", notification);
        // Có thể lưu vào file / memory store nếu cần
      }
    },
  });

  console.log("Kafka Consumer is running");
}
