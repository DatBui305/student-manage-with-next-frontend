import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStudents = async (page = 1, limit = 10) => {
  const response = await apiClient.get(`/students?page=${page}&limit=${limit}`);
  return response.data;
};

export const getStudentById = async (id: number) => {
  const response = await apiClient.get(`/students/${id}`);
  return response.data; // Đảm bảo rằng response.data chứa thông tin sinh viên
};

export const createStudent = async (studentData: any) => {
  const response = await apiClient.post("/students", studentData);
  return response.data;
};

export const updateStudent = async (id: number, updateData: any) => {
  const response = await apiClient.put(`/students/${id}`, updateData);
  return response.data;
};

export const deleteStudent = async (id: number) => {
  console.log(id);
  const response = await apiClient.delete(`/students/${id}`);
  return response.data;
};
