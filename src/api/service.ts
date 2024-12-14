import axios from "axios";

const BASE_URL = "https://658a4e12ba789a962236e2f6.mockapi.io/task";

export async function fetchAllTasks() {
  const res = await axios.get(BASE_URL);
  return res.data;
}
