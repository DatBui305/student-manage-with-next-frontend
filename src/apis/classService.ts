import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getClasses = async (page = 1, limit = 10) => {
  const response = await apiClient.get(`/classes?page=${page}&limit=${limit}`);
  return response.data;
};

export const getClassById = async (id: number) => {
  const response = await apiClient.get(`/classes/${id}`);
  return response.data; // Đảm bảo rằng response.data chứa thông tin sinh viên
};

export const createClass = async (ClassData: any) => {
  const response = await apiClient.post("/classes", ClassData);
  return response.data;
};

export const updateClass = async (id: number, updateData: any) => {
  const response = await apiClient.put(`/classes/${id}`, updateData);
  return response.data;
};

export const deleteClass = async (id: number) => {
  console.log(id);
  const response = await apiClient.delete(`/classes/${id}`);
  return response.data;
};
