import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEnrollments = async (page = 1, limit = 10) => {
  const response = await apiClient.get(
    `/enrollments?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getEnrollmentById = async (id: number) => {
  const response = await apiClient.get(`/enrollments/${id}`);
  return response.data; // Đảm bảo rằng response.data chứa thông tin sinh viên
};

export const createEnrollment = async (EnrollmentData: any) => {
  const response = await apiClient.post("/enrollments", EnrollmentData);
  return response.data;
};

export const updateEnrollment = async (id: number, updateData: any) => {
  const response = await apiClient.put(`/enrollments/${id}`, updateData);
  return response.data;
};

export const deleteEnrollment = async (id: number) => {
  console.log(id);
  const response = await apiClient.delete(`/enrollments/${id}`);
  return response.data;
};
