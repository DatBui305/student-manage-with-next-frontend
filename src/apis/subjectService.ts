import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getSubjects = async (page = 1, limit = 10) => {
  const response = await apiClient.get(`/subjects?page=${page}&limit=${limit}`);
  return response.data;
};

export const getSubjectById = async (id: number) => {
  const response = await apiClient.get(`/subjects/${id}`);
  return response.data; // Đảm bảo rằng response.data chứa thông tin sinh viên
};

export const createSubject = async (SubjectData: any) => {
  const response = await apiClient.post("/subjects", SubjectData);
  return response.data;
};

export const updateSubject = async (id: number, updateData: any) => {
  const response = await apiClient.put(`/subjects/${id}`, updateData);
  return response.data;
};

export const deleteSubject = async (id: number) => {
  console.log(id);
  const response = await apiClient.delete(`/subjects/${id}`);
  return response.data;
};
