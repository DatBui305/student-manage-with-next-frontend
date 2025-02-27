import Link from "next/link";
import {
  Grid,
  MessageCircle,
  Users,
  User,
  Calendar,
  DollarSign,
  Utensils,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-900 text-white shadow-lg">
      <div className="flex items-center justify-center h-20 bg-purple-700">
        <h1 className="text-2xl font-bold">AdminSchool</h1>
      </div>
      <div className="flex flex-col p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Main Menu</h2>
        </div>
        <Link
          href="/"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Grid className="mr-2" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/chat"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <MessageCircle className="mr-2" />
          <span>Chat</span>
        </Link>
        <Link
          href="/students"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Users className="mr-2" />
          <span>Student</span>
          <span className="ml-auto bg-purple-500 rounded-full px-2 text-xs">
            35
          </span>
        </Link>
        <Link
          href="/teachers"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <User className="mr-2" />
          <span>Teacher</span>
        </Link>
        <Link
          href="/events"
          className="flex items-center p-2 rounded-lg bg-purple-600"
        >
          <Calendar className="mr-2" />
          <span>Event</span>
        </Link>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Others</h2>
        </div>
        <Link
          href="/finance"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <DollarSign className="mr-2" />
          <span>Finance</span>
        </Link>
        <Link
          href="/food"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Utensils className="mr-2" />
          <span>Food</span>
          <span className="ml-auto bg-purple-500 rounded-full px-2 text-xs">
            1
          </span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Settings className="mr-2" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
