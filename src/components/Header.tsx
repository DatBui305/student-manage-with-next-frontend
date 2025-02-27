"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Bell, MessageSquare, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center h-20 p-4 bg-gray-900 shadow-md" // Đặt chiều cao ở đây
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-2">
        <div className="bg-white text-purple-600 p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <Users className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold text-white">AdminSchool</h1>
      </div>

      {/* Search Bar */}

      {/* Icons + Avatar */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-purple-600"
        >
          <Bell className="h-5 w-5 text-white" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
            3
          </Badge>
        </Button>

        <Button variant="ghost" size="icon" className="hover:bg-purple-600">
          <MessageSquare className="h-5 w-5 text-white" />
        </Button>

        <Button variant="ghost" size="icon" className="hover:bg-purple-600">
          <Settings className="h-5 w-5 text-white" />
        </Button>

        {/* Avatar */}
        <Avatar className="hover:shadow-lg transition-shadow">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback className="bg-white text-purple-600">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  );
};

export default Header;
