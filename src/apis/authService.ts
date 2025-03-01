import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    // thêm các trường khác nếu cần
  };
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

interface RegisterResponse {
  username: string;
  password: string;
  id: number;
  role: number;
  createdAt: Date;
  updatedAt: Date;
}

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (authData: LoginData) => {
  try {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login",
      authData
    );
    return response.data;
  } catch (error) {
    throw new Error((error as any).response?.data?.message || "Login failed");
  }
};

export const register = async (authData: RegisterData) => {
  try {
    const response = await apiClient.post<RegisterResponse>(
      "/auth/register",
      authData
    );
    return response.data;
  } catch (error) {
    throw new Error((error as any).response?.data?.message || "Login failed");
  }
};
