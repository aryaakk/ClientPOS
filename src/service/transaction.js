import api from "@/api";

export async function postTransactions(data) {
  try {
    const response = await api.post("/transactions", data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
