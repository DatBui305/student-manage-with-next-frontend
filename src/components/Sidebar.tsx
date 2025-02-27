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
  Book,
  ClipboardList,
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
          href="/student"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Users className="mr-2" />
          <span>Student</span>
          <span className="ml-auto bg-purple-500 rounded-full px-2 text-xs">
            35
          </span>
        </Link>
        <Link
          href="/teacher"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <User className="mr-2" />
          <span>Teacher</span>
        </Link>
        <Link
          href="/class"
          className="flex items-center p-2 rounded-lg bg-purple-600"
        >
          <Book className="mr-2" />
          <span>Class</span>
        </Link>

        <Link href="/subject" className="flex items-center p-2 rounded-lg">
          <ClipboardList className="mr-2" />
          <span>Subject</span>
        </Link>

        <Link href="/enrollment" className="flex items-center p-2 rounded-lg">
          <Users className="mr-2" />
          <span>Enrollment</span>
        </Link>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Others</h2>
        </div>

        <Link
          href="/chat"
          className="flex items-center p-2 rounded-lg hover:bg-purple-600 transition-colors"
        >
          <MessageCircle className="mr-2" />
          <span>Chat</span>
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
