import { runKafkaConsumer } from "@/apis/kafkaService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runKafkaConsumer();
  res.status(200).json({ status: "Kafka Consumer Started" });
}
