import api from "./api";

export async function getTasksStats() {
  try {
    const response = await api.get(`/stats`);
    return response;
  } catch (error: any) {
    throw error;
  }
}
