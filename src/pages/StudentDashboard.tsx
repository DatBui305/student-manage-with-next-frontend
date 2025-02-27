"use client";

import { useEffect, useMemo, useState } from "react";
import { createStudent, getStudents } from "../apis/studentService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Search,
  Bell,
  MessageSquare,
  Settings,
  Edit,
  Trash,
  MoreVerticalIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Pagination from "@/components/Pagination";
import Student from "@/interfaces/Student";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gender } from "@/types/gender";

const StudentDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(1);
  const itemsPerPage = 10;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [classId, setClassId] = useState("");
  const [isDisplayCreate, setIsDisplayCreate] = useState(false);
  useEffect(() => {
    setMounted(true);
    const fetchStudents = async () => {
      try {
        const response = await getStudents(currentPage, itemsPerPage);
        console.log(response.data);
        setStudents(response.data || []);
        setTotal(response.total || 0);
        setTotalPages(Math.ceil(response.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [currentPage]);

  const createNewStudent = async () => {
    try {
      const studentData = {
        full_name: name,
        date_of_birth: dob,
        gender: gender,
        class_id: classId,
        phone: phone,
        email: email,
        address: address,
      };

      const response = await createStudent(studentData); // Gọi hàm createStudent
      console.log("Student created successfully:", response);
      setStudents((prev) => [...prev, response]);
      setIsDisplayCreate(false);
      createNewStudent(); // Gọi hàm tạo sinh viên
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const displayedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return students.slice(startIndex, startIndex + itemsPerPage);
  }, [students, currentPage, itemsPerPage]);
  const clearInput = () => {
    setName(""); // Xóa trường tên
    setEmail(""); // Xóa trường email
    setPhone(""); // Xóa trường điện thoại
    setAddress(""); // Xóa trường địa chỉ
    setDob(""); // Xóa trường ngày sinh
    setGender(""); // Xóa trường giới tính
    setClassId(""); // Xóa trường ID lớp
  };
  const handleUpdate = () => {};
  const handleDelete = () => {};
  if (!mounted) return null;
  if (loading)
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6"
      >
        <Card className="w-full bg-white dark:bg-slate-800 shadow-lg rounded-lg hover:shadow-xl transition-shadow">
          <div className="px-6 py-3 flex flex-row justify-between">
            <Button
              className="shadow-md hover:shadow-lg transition-shadow"
              onClick={(e) => setIsDisplayCreate(!isDisplayCreate)}
            >
              Create new student
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                className="pl-9 w-[300px] h-10 bg-white  shadow-md hover:shadow-lg transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isDisplayCreate ? (
            <div className="grid gap-5 px-6 py-3">
              <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={name}
              ></Input>
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={email}
              ></Input>
              <Input
                placeholder="Phone"
                className="shadow-md hover:shadow-lg transition-shadow"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              ></Input>
              <Input
                placeholder="Address"
                className="shadow-md hover:shadow-lg transition-shadow"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              ></Input>
              <Input
                type="date"
                placeholder="Date of Birth"
                className="shadow-md hover:shadow-lg transition-shadow"
                onChange={(e) => setDob(e.target.value)}
                value={dob}
              ></Input>
              <Select
                onValueChange={(value) => setGender(value as Gender)}
                defaultValue={gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Class ID"
                type="number"
                className="shadow-md hover:shadow-lg transition-shadow"
                onChange={(e) => setClassId(e.target.value)}
                value={classId}
              ></Input>
              <Button
                className="shadow-md hover:shadow-lg transition-shadow"
                onClick={createNewStudent}
              >
                Create
              </Button>
            </div>
          ) : (
            <></>
          )}

          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800 ">
              Students List
            </CardTitle>

            <Badge
              variant="secondary"
              className="h-8 px-3 bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            >
              Total: {students.length}
            </Badge>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="grid grid-cols-[2fr_2fr_2fr_3fr_2fr_1fr_50px] bg-gray-100 px-4">
                    <TableHead className="flex items-center ">Name</TableHead>
                    <TableHead className="flex items-center "> Email</TableHead>
                    <TableHead className="flex items-center ">Phone</TableHead>
                    <TableHead className="flex items-center ">
                      Address
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Date of Birth
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Class ID
                    </TableHead>
                    <TableHead className="w-[50px] text-center flex items-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow
                        key={student.id}
                        className="grid grid-cols-[2fr_2fr_2fr_3fr_2fr_1fr_50px] items-center gap-2 px-4 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 hover:shadow-md transition-shadow">
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {student.full_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {student.full_name}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          {student.email}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-500" />
                          {student.phone}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-500" />
                          {student.address}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-500" />
                          {student.date_of_birth}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-purple-50 hover:bg-purple-100 transition-colors"
                          >
                            Class {student.class_id}
                          </Badge>
                        </TableCell>
                        {/* Nút Actions */}
                        <TableCell className="w-[50px] flex justify-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="p-1"
                              >
                                <MoreVerticalIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleUpdate()}
                                className="flex flex-row"
                              >
                                <Edit className="h-4 w-4 mr-2 text-blue-500" />
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete()}
                                className="flex flex-row"
                              >
                                <Trash className="h-4 w-4 mr-2 text-red-500" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No students found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
