"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
type ChatStorage = {
  id: number;
  createdAt: string;
  updatedAt: string;
};
export interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoom {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export default function ChatPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [chatRoomSelect, setChatRoomSelect] = useState<ChatRoom>();
  const [selectedRoom, setSelectedRoom] = useState(1);
  const adminId = 3; // admin cần lấy room

  useEffect(() => {
    fetch(`http://localhost:3000/chat-room/admin/${adminId}`)
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Failed to fetch rooms:", err));
  }, []);
  const handleRoomClick = (roomId: number) => {
    setSelectedRoom(roomId);
    fetchRoomData();
  };
  const [room, setRoom] = useState<ChatRoom | null>(null);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get<ChatRoom>(
        `http://localhost:3000/chat-room/room-chat/${selectedRoom}`
      );
      setChatRoomSelect(response.data);
    } catch (error) {
      console.error("Failed to fetch room data", error);
    }
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Rooms</h1>
      <div className="grid grid-cols-6 gap-4 py-6">
        {rooms.map((room) => (
          <Card
            className="hover:shadow-xl transition-shadow"
            onClick={() => handleRoomClick(room.id)}
          >
            <CardHeader className="px-6 py-2">{room.name}</CardHeader>
            <div>
              <h2 className="px-6 pb-2">{room.createdAt}</h2>
            </div>
          </Card>
        ))}
      </div>
      <div className="p-6 w-full h-full  border-gray-300 border rounded-md ">
        {/* Showing message */}
        <div className="">
          <h1 className="text-black text-lg">{chatRoomSelect?.name}</h1>
          <div className="space-y-3">
            {chatRoomSelect?.messages.map((msg) => (
              <div key={msg.id} className="p-2 rounded-lg">
                <p className="text-black text-sm">{msg.content}</p>
                <p className="text-gray-500 text-sm">{msg.createdAt}</p>
              </div>
            ))}
          </div>
        </div>
        {/* input */}
        <div>
          <div className="grid grid-cols-5 gap-4">
            <Textarea
              className="col-span-4 text-sm border-gray-300 border hover:shadow-xl transition-shadow"
              placeholder="Type your message here."
            />
            <Button className="w-full h-full hover:shadow-xl transition-shadow">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
