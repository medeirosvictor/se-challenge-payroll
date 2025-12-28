import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const healthCheck = async () => {
  const response = await api.get("/health/");
  return response.data;
};

export const uploadCSV = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const resp = await api.post("/payroll/add-time-report/", formData);
    return resp.data;
  } catch (error) {
    console.log("Error uploading CSV:", error);
    throw error;
  }
};

export const generatePayrollReport = async () => {
  try {
    const resp = await api.get(`/payroll/generate-payroll-report/`);
    return resp.data;
  } catch (error) {
    console.log("Error generating payroll report:", error);
    throw error;
  }
};
