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
import Enrollment from "@/interfaces/Enrollment";
import {
  createEnrollment,
  deleteEnrollment,
  getEnrollmentById,
  getEnrollments,
  updateEnrollment,
} from "@/apis/enrollmentService";

const EnrollmentDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(1);
  const itemsPerPage = 10;

  const [studentID, setStudentID] = useState<number>(0);
  const [subjectID, setSubjectID] = useState<number>(0);
  const [enrollmentDate, setEnrollmentDate] = useState<Date>(new Date());

  const [idUpdate, setIdUpdate] = useState(0);
  const [studentIDUpdate, setStudentIDUpdate] = useState<number>(0);
  const [subjectIDUpdate, setSubjectIDUpdate] = useState<number>(0);
  const [enrollmentDateUpdate, setEnrollmentDateUpdate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [isDisplayCreate, setIsDisplayCreate] = useState(false);
  const [isDisplayUpdate, setIsDisplayUpdate] = useState(false);

  const [searchTerm, setSearchTerm] = useState(1);
  const [searchEnrollment, setSearchEnrollment] = useState<Enrollment>();
  useEffect(() => {
    setMounted(true);

    fetchEnrollments();
  }, [currentPage]);

  const fetchEnrollments = async () => {
    try {
      const response = await getEnrollments(currentPage, itemsPerPage);
      // Validate and transform data if needed
      const validatedEnrollments = response.data.map(
        (enrollment: { student: any; subject: any }) => ({
          ...enrollment,
          student: enrollment.student || { full_name: "No Student" },
          subject: enrollment.subject || { subject_name: "No Subject" },
        })
      );
      setEnrollments(validatedEnrollments);
      setTotal(response.total || 0);
      setTotalPages(Math.ceil(response.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      toast.error("Failed to fetch enrollments");
    } finally {
      setLoading(false);
    }
  };

  const createNewEnrollment = async () => {
    try {
      const enrollmentData = {
        student: {
          id: studentID, // Thêm studentID state
        },
        subject: {
          id: subjectID, // Thêm subjectID state
        },
        enrollment_date: enrollmentDateUpdate, // Hoặc dùng enrollmentDate từ form
      };

      const response = await createEnrollment(enrollmentData); // Đổi tên hàm API call
      console.log("Enrollment created successfully:", response);
      toast.success("Enrollment created successfully!");
      setEnrollments((prev) => [...prev, response]); // Đổi tên state
      setIsDisplayCreate(false);
      fetchEnrollments(); // Đổi tên hàm fetch
      clearInput();
    } catch (error: any) {
      console.error("Error creating enrollment:", error);
      if (error.response?.status === 500) {
        toast.error("Failed to create enrollment. Please check your input.");
      } else {
        toast.error("Failed to create enrollment. Please try again.");
      }
    }
  };
  const updateExistEnrollment = async () => {
    try {
      const updateData = {
        student: {
          id: studentIDUpdate,
        },
        subject: {
          id: subjectIDUpdate,
        },
        enrollment_date: new Date(enrollmentDateUpdate).toISOString(),
      };

      const response = await updateEnrollment(idUpdate, updateData);
      console.log("Enrollment updated successfully:", response);
      fetchEnrollments();
      clearInputUpdate();
      setIsDisplayUpdate(false);
      toast.success("Enrollment updated successfully!");
    } catch (error) {
      console.error("Error updating enrollment:", error);
      toast.error("Failed to update enrollment");
    }
  };
  const clearInputUpdate = () => {
    setEnrollmentDateUpdate(new Date().toISOString().split("T")[0]);
    setStudentIDUpdate(0);
    setSubjectIDUpdate(0);
  };

  const handleUpdate = (enrollment: Enrollment) => {
    setIdUpdate(enrollment.id);
    setStudentIDUpdate(enrollment.student?.id || 0);
    setSubjectIDUpdate(enrollment.subject?.id || 0);
    const date = new Date(enrollment.enrollment_date);
    setEnrollmentDateUpdate(date.toISOString().split("T")[0]);
    setIsDisplayUpdate(true);
  };
  const clearInput = () => {
    setEnrollmentDate(new Date()); // Xóa trường tên
    setStudentID(0); // Xóa trường email
    setSubjectID(0);
  };
  const handleDelete = (enrollment: Enrollment) => {
    console.log(enrollment);
    toast.warning(`Are you sure you want to delete ${enrollment.id}?`, {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteEnrollment(enrollment.id); // Call API to delete student
            toast.success("✅ enrollment deleted successfully!");
            fetchEnrollments(); // Refresh student list
          } catch (error) {
            toast.error("❌ Failed to delete enrollment!");
            console.error("Error deleting enrollment:", error);
          }
        },
      },
    });
  };
  const handleSearch = async () => {
    try {
      const id = Number(searchTerm);
      console.log(id);
      const response = await getEnrollmentById(id);

      if (response) {
        setSearchEnrollment(response);
        console.log("Fetched enrollment:", response); // In ra dữ liệu sinh viên đã nhận được
        setTotal(1); // Cập nhật tổng số sinh viên tìm thấy
      } else {
        console.log("No subject found with this ID.");
        setSearchEnrollment(undefined); // Đặt lại searchStudent nếu không tìm thấy
        setTotal(0); // Cập nhật tổng số sinh viên tìm thấy
      }
    } catch (error) {
      console.error("Error fetching enrollment:", error);
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
              Create new enrollment
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
                placeholder="Student ID"
                type="number"
                onChange={(e) => setStudentID(Number(e.target.value))}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={studentID}
                required
              />
              <Input
                placeholder="Subject ID"
                type="number"
                onChange={(e) => setSubjectID(Number(e.target.value))}
                className="shadow-md hover:shadow-lg transition-shadow"
                value={subjectID}
                required
              />
              <Button
                className="shadow-md hover:shadow-lg transition-shadow"
                onClick={createNewEnrollment}
                disabled={!studentID || !subjectID}
              >
                Create Enrollment
              </Button>
            </div>
          ) : null}
          {isDisplayUpdate ? (
            <div className="grid gap-5 px-6 py-3">
              <Input
                type="number"
                placeholder="Student ID"
                value={studentIDUpdate}
                onChange={(e) => setStudentIDUpdate(Number(e.target.value))}
                className="shadow-md hover:shadow-lg transition-shadow"
              />
              <Input
                type="number"
                placeholder="Subject ID"
                value={subjectIDUpdate}
                onChange={(e) => setSubjectIDUpdate(Number(e.target.value))}
                className="shadow-md hover:shadow-lg transition-shadow"
              />
              <Input
                type="date"
                value={enrollmentDateUpdate}
                onChange={(e) => setEnrollmentDateUpdate(e.target.value)}
                className="shadow-md hover:shadow-lg transition-shadow"
              />
              <Button
                className="shadow-md hover:shadow-lg transition-shadow"
                onClick={updateExistEnrollment}
                disabled={
                  !studentIDUpdate || !subjectIDUpdate || !enrollmentDateUpdate
                }
              >
                Update
              </Button>
            </div>
          ) : (
            <></>
          )}

          <div className="px-6">
            {searchEnrollment ? (
              <Table className="px-6">
                <TableHeader>
                  <TableRow className="grid grid-cols-5 bg-gray-100 px-4">
                    <TableHead className="flex items-center ">Id</TableHead>
                    <TableHead className="flex items-center ">
                      Enrollment date
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Subject name
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Student name
                    </TableHead>
                    <TableHead className="w-[50px] text-center flex items-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow
                    key={searchEnrollment.id}
                    className="grid grid-cols-5 items-center gap-2 px-4 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="flex items-center gap-2">
                      <IdCard className="h-4 w-4 text-blue-500" />
                      {searchEnrollment.id}
                    </TableCell>

                    <TableCell className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      {new Date(
                        searchEnrollment.enrollment_date
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 hover:shadow-md transition-shadow">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {searchEnrollment.subject?.subject_name?.charAt(0) ||
                            "S"}
                        </AvatarFallback>
                      </Avatar>
                      {searchEnrollment.subject?.subject_name || "No Subject"}
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 hover:shadow-md transition-shadow">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {searchEnrollment.student?.full_name?.charAt(0) ||
                            "S"}
                        </AvatarFallback>
                      </Avatar>
                      {searchEnrollment.student?.full_name || "No Student"}
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
                            onClick={() => handleUpdate(searchEnrollment)}
                            className="flex flex-row"
                          >
                            <Edit className="h-4 w-4 mr-2 text-blue-500" />
                            Update
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(searchEnrollment)}
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
              Enrollment List
            </CardTitle>

            <Badge
              variant="secondary"
              className="h-8 px-3 bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors"
            >
              Total: {enrollments.length}
            </Badge>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="grid grid-cols-5 bg-gray-100 px-4">
                    <TableHead className="flex items-center ">Id</TableHead>
                    <TableHead className="flex items-center ">
                      Enrollment date
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Subject name
                    </TableHead>
                    <TableHead className="flex items-center ">
                      Student name
                    </TableHead>
                    <TableHead className="w-[50px] text-center flex items-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.length > 0 ? (
                    enrollments.map((enrollment) => (
                      <TableRow
                        key={enrollment.id}
                        className="grid grid-cols-5 items-center gap-2 px-4 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="flex items-center gap-2">
                          <IdCard className="h-4 w-4 text-blue-500" />
                          {enrollment.id}
                        </TableCell>

                        <TableCell className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          {new Date(
                            enrollment.enrollment_date
                          ).toLocaleDateString()}
                        </TableCell>

                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 hover:shadow-md transition-shadow">
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {enrollment.subject?.subject_name?.charAt(0) ||
                                "S"}
                            </AvatarFallback>
                          </Avatar>
                          {enrollment.subject?.subject_name || "No Subject"}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 hover:shadow-md transition-shadow">
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {enrollment.student?.full_name?.charAt(0) || "S"}
                            </AvatarFallback>
                          </Avatar>
                          {enrollment.student?.full_name || "No Student"}
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
                                onClick={() => handleUpdate(enrollment)}
                                className="flex flex-row"
                              >
                                <Edit className="h-4 w-4 mr-2 text-blue-500" />
                                Update
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(enrollment)}
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

export default EnrollmentDashboard;
