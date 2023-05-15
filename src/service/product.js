import api from "@/api";

export async function getProductss() {
  try {
    const response = await api.get("/products");
    return response.data.payload;
  } catch (error) {
    throw error;
  }
}
