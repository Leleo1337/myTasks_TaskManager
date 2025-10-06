import api from "./api";

export async function getTasks(search?: string) {
  let response;
  try {
    if (search) {
      response = await api.get(`/?search=${search}`);
    } else {
      response = await api.get("/");
    }
    console.log(response)
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function getTask(id: string) {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function createTask(formData: any) {
  try {
    const response = await api.post("/", formData);
    return response.data.data;
  } catch (error: any) {
    throw error;
  }
}

export async function updateTask(id: string, data: any) {
  try {
    const response = await api.patch(`/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteTask(id: string) {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}
