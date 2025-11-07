import api from "./api";

export async function getTasks(query?: any) {
  try {
    const response = await api.get(
      `/tasks?search=${query?.search || ""}&priority=${query?.priority || "all"}&status=${query?.status || "all"}`
    );
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function getTask(id: string) {
  try {
    const response = await api.get(`/tasks/${id}`);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function createTask(formData: any) {
  try {
    const response = await api.post("/tasks", formData);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function updateTask(id: string, data: any) {
  try {
    const response = await api.patch(`/tasks/${id}`, data);
    return response;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteTask(id: string) {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response;
  } catch (error: any) {
    throw error;
  }
}
