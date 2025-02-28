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
import {
  createClass,
  getClassById,
  getClasses,
  updateClass,
} from "@/apis/classService";
import Class from "@/interfaces/Class";
import Subject from "@/interfaces/Subject";
import {
  createSubject,
  deleteSubject,
  getSubjectById,
  getSubjects,
  updateSubject,
} from "@/apis/subjectService";

const SubjectDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(1);
  const itemsPerPage = 10;

  const [subjectName, setSubjectName] = useState("");
  const [teacherID, setTeacherID] = useState(0);
  const [classID, setClassID] = useState(0);

  const [idUpdate, setIdUpdate] = useState(0);
  const [subjectNameUpdate, setSubjectNameUpdate] = useState("");
  const [teacherIDUpdate, setteacherIDUpdate] = useState(0);
  const [classIDUpdate, setClassIDUpdate] = useState(0);

  const [isDisplayCreate, setIsDisplayCreate] = useState(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState(false);

  const [searchTerm, setSearchTerm] = useState(1);
  const [searchSubject, setSearchSubject] = useState<Subject>();
  useEffect(() => {
    setMounted(true);

    fetchSubject();
  }, [currentPage]);

  const fetchSubject = async () => {
    try {
      const response = await getSubjects(currentPage, itemsPerPage);
      console.log(response.data);
      setSubjects(response.data || []);
      setTotal(response.total || 0);
      setTotalPages(Math.ceil(response.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };
  const createNewSubject = async () => {
    try {
      // Validate input
      if (!subjectName.trim()) {
        toast.error("Subject name cannot be empty");
        return;
      }

      const subjectData = {
        subject_name: subjectName,
        teacher: {
          id: teacherID,
        },
        class: {
          id: classID,
        },
      };

      const response = await createSubject(subjectData);
      console.log("Class created successfully:", response);
      toast.success("Class created successfully!");
      setSubjects((prev) => [...prev, response]);
      setIsDisplayCreate(false);
      fetchSubject(); // Refresh the list
      clearInput();
    } catch (error: any) {
      console.error("Error creating class:", error);
      // Check if it's a duplicate class name error
      if (
        error.response?.status === 500 &&
        error.response?.data?.message?.includes("duplicate key value")
      ) {
        toast.error("A class with this name already exists");
      } else {
        toast.error("Failed to create class. Please try again.");
      }
    }
  };
  const updateExistSubject = async () => {
    try {
      const updateData = {
        subject_name: subjectNameUpdate,
        teacher: {
          id: teacherIDUpdate,
        },
        class: {
          id: classIDUpdate,
        },
      };
      console.log("update data" + updateData);
      const response = await updateSubject(idUpdate, updateData);
      console.log("Class updated successfully:", response);
      fetchSubject();
      clearInputUpdate();
      setIsDisplayUpdate(false);
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };
  const clearInput = () => {
    setSubjectName(""); // Xóa trường tên
    setTeacherID(0); // Xóa trường email
    setClassID(0);
  };
  const clearInputUpdate = () => {
    setSubjectNameUpdate(""); // Xóa trường tên
    setteacherIDUpdate(0); // Xóa trường email
    setClassIDUpdate(0); // Xóa trường email
  };

  const handleUpdate = async (subject: Subject) => {
    console.log(subject);
    setIdUpdate(subject.id);
    setSubjectNameUpdate(subject.subject_name);
    setteacherIDUpdate(subject.teacher ? subject.teacher.id : 0);
    setClassIDUpdate(subject.class ? subject.class.id : 0);
    setIsDisplayUpdate(!isDisplayUpdate);
  };
  const handleDelete = (subject: Subject) => {
    console.log(subject);
    toast.warning(`Are you sure you want to delete ${subject.subject_name}?`, {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteSubject(subject.id); // Call API to delete student
            toast.success("✅ Subject deleted successfully!");
            fetchSubject(); // Refresh student list
          } catch (error) {
            toast.error("❌ Failed to delete subject!");
            console.error("Error deleting subject:", error);
          }
        },
      },
    });
  };
  const handleSearch = async () => {
    try {
      const id = Number(searchTerm);
      console.log(id);
      const response = await getSubjectById(id);

      if (response) {
        setSearchSubject(response);
        console.log("Fetched subject:", response); // In ra dữ liệu sinh viên đã nhận được
        setTotal(1); // Cập nhật tổng số sinh viên tìm thấy
      } else {
        console.log("No subject found with this ID.");
        setSearchSubject(undefined); // Đặt lại searchStudent nếu không tìm thấy
        setTotal(0); // Cập nhật tổng số sinh viên tìm thấy
      }
    } catch (error) {
      console.error("Error fetching subject:", error);
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
              Create new subject
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

          {isDisplayCreate ? (
            <div className="grid gap-5 px-6 py-3">
              <Input
                placeholder="Class Name"
                onChange={(e) => setSubjectName(e.target.value)}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={subjectName}
                required
              ></Input>
              <Input
                placeholder="Class ID"
                type="number"
                onChange={(e) => setClassID(Number(e.target.value))}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={classID}
              ></Input>
              <Input
                placeholder="Teacher ID"
                type="number"
                onChange={(e) => setTeacherID(Number(e.target.value))}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={teacherID}
              ></Input>

              <Button
                className="shadow-md hover:shadow-lg transition-shadow"
                onClick={createNewSubject}
                disabled={!subjectName.trim()}
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
                placeholder="Class Name"
                onChange={(e) => setSubjectNameUpdate(e.target.value)}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={subjectNameUpdate}
              ></Input>
              <Input
                placeholder="Class ID"
                type="number"
                onChange={(e) => setClassIDUpdate(Number(e.target.value))}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={classIDUpdate}
              ></Input>
              <Input
                placeholder="Teacher ID"
                type="number"
                onChange={(e) => setteacherIDUpdate(Number(e.target.value))}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={teacherIDUpdate}
              ></Input>
              <Button
                className="shadow-md hover:shadow-lg transition-shadow"
                onClick={() => updateExistSubject()}
              >
                Update
              </Button>
            </div>
          ) : (
            <></>
          )}
          {/*  */}
          <div className="px-6">
            {searchSubject ? (
              <Table className="px-6">
                <TableHeader>
                  <TableRow className="grid grid-cols-5 bg-gray-100 px-4">
                    <TableHead className="flex items-center ">Id</TableHead>
                    <TableHead className="flex items-center ">
                      Subject name
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Class name
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Teacher name
                    </TableHead>
                    <TableHead className="w-[50px] text-center flex items-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    key={searchSubject.id}
                    className="grid grid-cols-5 items-center gap-2 px-4 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="flex items-center gap-2">
                      <IdCard className="h-4 w-4 text-blue-500" />
                      {searchSubject.id}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 hover:shadow-md transition-shadow">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {searchSubject.subject_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {searchSubject.subject_name}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      {searchSubject.class
                        ? searchSubject.class?.class_name
                        : "No class"}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      {searchSubject.teacher
                        ? searchSubject.teacher.full_name
                        : "No class"}
                    </TableCell>

                    {/* Nút Actions */}
                    <TableCell className="w-[50px] flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="p-1">
                            <MoreVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleUpdate(searchSubject)}
                            className="flex flex-row"
                          >
                            <Edit className="h-4 w-4 mr-2 text-blue-500" />
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(searchSubject)}
                            className="flex flex-row"
                          >
                            <Trash className="h-4 w-4 mr-2 text-red-500" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-800 ">
              Subject List
            </CardTitle>

            <Badge
              variant="secondary"
              className="h-8 px-3 bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            >
              Total: {subjects.length}
            </Badge>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="grid grid-cols-5 bg-gray-100 px-4">
                    <TableHead className="flex items-center ">Id</TableHead>
                    <TableHead className="flex items-center ">
                      Subject name
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Class name
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Teacher name
                    </TableHead>
                    <TableHead className="w-[50px] text-center flex items-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.length > 0 ? (
                    subjects.map((subject) => (
                      <TableRow
                        key={subject.id}
                        className="grid grid-cols-5 items-center gap-2 px-4 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="flex items-center gap-2">
                          <IdCard className="h-4 w-4 text-blue-500" />
                          {subject.id}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 hover:shadow-md transition-shadow">
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {subject.subject_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {subject.subject_name}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          {subject.class
                            ? subject.class?.class_name
                            : "No class"}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          {subject.teacher
                            ? subject.teacher.full_name
                            : "No class"}
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
                                onClick={() => handleUpdate(subject)}
                                className="flex flex-row"
                              >
                                <Edit className="h-4 w-4 mr-2 text-blue-500" />
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(subject)}
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
                        No subject found
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

export default SubjectDashboard;
