import api from "@/api";

export async function postTransactions(data) {
  try {
    const response = await api.post("/transactions", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTransactions() {
  try {
    const response = await api.get("/transactions");
    return response.data.payload;
  } catch (error) {
    throw error;
  }
}
