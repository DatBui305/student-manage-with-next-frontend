import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTeachers = async (page = 1, limit = 10) => {
  const response = await apiClient.get(`/teachers?page=${page}&limit=${limit}`);
  return response.data;
};

export const getTeacherById = async (id: number) => {
  const response = await apiClient.get(`/teachers/${id}`);
  return response.data; // Đảm bảo rằng response.data chứa thông tin sinh viên
};

export const createTeacher = async (TeacherData: any) => {
  const response = await apiClient.post("/teachers", TeacherData);
  return response.data;
};

export const updateTeacher = async (id: number, updateData: any) => {
  const response = await apiClient.put(`/teachers/${id}`, updateData);
  return response.data;
};

export const deleteTeacher = async (id: number) => {
  console.log(id);
  const response = await apiClient.delete(`/teachers/${id}`);
  return response.data;
};
