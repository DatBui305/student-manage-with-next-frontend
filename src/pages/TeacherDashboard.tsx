"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudent,
} from "../apis/studentService";
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
  IdCard,
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
import { toast } from "sonner";
import Teacher from "@/interfaces/Teacher";
import {
  createTeacher,
  deleteTeacher,
  getTeacherById,
  getTeachers,
  updateTeacher,
} from "@/apis/teacherService";

const TeacherDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(1);
  const itemsPerPage = 10;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [idUpdate, setIdUpdate] = useState(1);
  const [nameUpdate, setNameUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");
  const [phoneUpdate, setPhoneUpdate] = useState("");

  const [isDisplayCreate, setIsDisplayCreate] = useState(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState(false);

  const [searchTerm, setSearchTerm] = useState(1);
  const [searchTeacher, setSearchTeacher] = useState<Teacher>();
  useEffect(() => {
    setMounted(true);

    fetchTeachers();
  }, [currentPage]);
  const fetchTeachers = async () => {
    try {
      const response = await getTeachers(currentPage, itemsPerPage);
      console.log(response.data);
      setTeachers(response.data || []);
      setTotal(response.total || 0);
      setTotalPages(Math.ceil(response.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };
  const createNewTeacher = async () => {
    try {
      const teacherData = {
        full_name: name,
        phone: phone,
        email: email,
      };

      const response = await createTeacher(teacherData); // Gọi hàm createStudent
      console.log("Teacher created successfully:", response);
      setTeachers((prev) => [...prev, response]);
      setIsDisplayCreate(false);
      createNewTeacher();
      clearInput();
    } catch (error) {
      console.error("Error creating Teacher:", error);
    }
  };
  const clearInput = () => {
    setName(""); // Xóa trường tên
    setEmail(""); // Xóa trường email
    setPhone(""); // Xóa trường điện thoại
  };

  const clearInputUpdate = () => {
    setNameUpdate(""); // Xóa trường tên
    setEmailUpdate(""); // Xóa trường email
    setPhoneUpdate(""); // Xóa trường điện thoại
  };
  const updateExistTeacher = async () => {
    try {
      const updateData = {
        full_name: nameUpdate,
        phone: phoneUpdate,
        email: emailUpdate,
      };
      const response = await updateTeacher(idUpdate, updateData);
      console.log("Student updated successfully:", response);
      fetchTeachers(); // Cập nhật danh sách sinh viên
      clearInputUpdate();
      setIsDisplayUpdate(false); // Đóng form cập nhật
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
  const handleUpdate = async (teacher: Teacher) => {
    console.log(teacher);
    // Cập nhật các trường thông tin
    setIdUpdate(teacher.id);
    setEmailUpdate(teacher.email);
    setNameUpdate(teacher.full_name);
    setPhoneUpdate(teacher.phone);
    setIsDisplayUpdate(!isDisplayUpdate); // Hiển thị form cập nhật
  };
  const handleDelete = (teacher: Teacher) => {
    console.log(teacher);
    toast.warning(`Are you sure you want to delete ${teacher.full_name}?`, {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteTeacher(teacher.id); // Call API to delete student
            toast.success("✅ Teacher deleted successfully!");
            fetchTeachers(); // Refresh student list
          } catch (error) {
            toast.error("❌ Failed to delete student!");
            console.error("Error deleting student:", error);
          }
        },
      },
    });
  };
  const handleSearch = async () => {
    try {
      const id = Number(searchTerm);
      console.log(id);
      const response = await getTeacherById(id);

      if (response) {
        setSearchTeacher(response);
        console.log("Fetched teacher:", response); // In ra dữ liệu sinh viên đã nhận được
        setTotal(1); // Cập nhật tổng số sinh viên tìm thấy
      } else {
        console.log("No student found with this ID.");
        setSearchTeacher(undefined); // Đặt lại searchStudent nếu không tìm thấy
        setTotal(0); // Cập nhật tổng số sinh viên tìm thấy
      }
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="flex flex-row gap-3">
              <Input
                placeholder="Search students by Id..."
                type="number"
                className="pl-9 w-[300px] h-10 bg-white shadow-md hover:shadow-lg transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(Number(e.target.value))}
              />
              <Button className="h-10" onClick={handleSearch}>
                <Search className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>

          {/*  */}

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

              <Button
                className="shadow-md hover:shadow-lg transition-shadow"
                onClick={createNewTeacher}
              >
                Create
              </Button>
            </div>
          ) : (
            <></>
          )}

          {/*  */}
          {isDisplayUpdate ? (
            <div className="grid gap-5 px-6 py-3">
              <Input
                placeholder="Name"
                onChange={(e) => setNameUpdate(e.target.value)}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={nameUpdate}
              ></Input>
              <Input
                placeholder="Email"
                onChange={(e) => setEmailUpdate(e.target.value)}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={emailUpdate}
              ></Input>
              <Input
                placeholder="Phone"
                className="shadow-md hover:shadow-lg transition-shadow"
                onChange={(e) => setPhoneUpdate(e.target.value)}
                value={phoneUpdate}
              ></Input>
              <Button
                className="shadow-md hover:shadow-lg transition-shadow"
                onClick={() => updateExistTeacher()}
              >
                Update
              </Button>
            </div>
          ) : (
            <></>
          )}

          {/*  */}
          <div className="px-6">
            {searchTeacher ? (
              <Table className="px-6">
                <TableHeader>
                  <TableRow className="grid grid-cols-[1fr_2fr_3fr_2fr_1fr] bg-gray-100 px-4">
                    <TableHead className="flex items-center ">Id</TableHead>
                    <TableHead className="flex items-center ">Name</TableHead>
                    <TableHead className="flex items-center "> Email</TableHead>
                    <TableHead className="flex items-center ">Phone</TableHead>
                    <TableHead className="w-[50px] text-center flex items-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    key={searchTeacher.id}
                    className="grid grid-cols-[1fr_2fr_3fr_2fr_1fr] items-center gap-2 px-4 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="flex items-center gap-2">
                      <IdCard className="h-4 w-4 text-blue-500" />
                      {searchTeacher.id}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 hover:shadow-md transition-shadow">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {searchTeacher.full_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {searchTeacher.full_name}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      {searchTeacher.email}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-500" />
                      {searchTeacher.phone}
                    </TableCell>
                    <TableCell className="w-[50px] flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="p-1">
                            <MoreVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleUpdate(searchTeacher)}
                            className="flex flex-row"
                          >
                            <Edit className="h-4 w-4 mr-2 text-blue-500" />
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(searchTeacher)}
                            className="flex flex-row"
                          >
                            <Trash className="h-4 w-4 mr-2 text-red-500" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    {/* Nút Actions */}
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-8 text-center">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </div>
          {/*  */}
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800 ">
              Teacher List
            </CardTitle>

            <Badge
              variant="secondary"
              className="h-8 px-3 bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            >
              Total: {teachers.length}
            </Badge>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="grid grid-cols-[1fr_2fr_3fr_2fr_1fr] bg-gray-100 px-4">
                    <TableHead className="flex items-center ">Id</TableHead>
                    <TableHead className="flex items-center ">Name</TableHead>
                    <TableHead className="flex items-center "> Email</TableHead>
                    <TableHead className="flex items-center ">Phone</TableHead>
                    <TableHead className="w-[50px] text-center flex items-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                      <TableRow
                        key={teacher.id}
                        className="grid grid-cols-[1fr_2fr_3fr_2fr_1fr] items-center gap-2 px-4 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="flex items-center gap-2">
                          <IdCard className="h-4 w-4 text-blue-500" />
                          {teacher.id}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 hover:shadow-md transition-shadow">
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {teacher.full_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {teacher.full_name}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          {teacher.email}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-green-500" />
                          {teacher.phone}
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
                                onClick={() => handleUpdate(teacher)}
                                className="flex flex-row"
                              >
                                <Edit className="h-4 w-4 mr-2 text-blue-500" />
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(teacher)}
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
                        No teachers found
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

export default TeacherDashboard;
