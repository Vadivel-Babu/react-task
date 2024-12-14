import axios from "axios";
import { Task } from "../type";

const BASE_URL = "https://658a4e12ba789a962236e2f6.mockapi.io/task";

export async function fetchAllTasks() {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export async function postTask(data: Task) {
  const res = await axios.post(BASE_URL, data);
  return res.data;
}

export async function deleteTask(id: string) {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
}

export async function updateTask(data: Task) {
  const res = await axios.put(`${BASE_URL}/${data.id}`, data);
  return res.data;
}
