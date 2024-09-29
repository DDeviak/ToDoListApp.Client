import axios, { AxiosResponse } from "axios";
import TodoList, { TodoListCreate } from "../models/todolist.model";
import { Patch } from "json-patch";
import TodoListItem, { TodoListItemCreate } from "../models/todolistitem.model";
import {
  UserAuthenticationResponse,
  UserLogin,
  UserRegister,
} from "../models/user.model";
import UserStore from "../store/userStore";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = UserStore.token;
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(undefined, (error) => {
  console.error(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axios
      .patch<T>(url, body, {
        headers: { "Content-Type": "application/json-patch+json" },
      })
      .then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const TodoLists = {
  list: (userId: string) =>
    requests.get<TodoList[]>("/Tasklists/GetByUser/" + userId),
  create: (TodoList: TodoListCreate) =>
    requests.post<TodoList>("/Tasklists/Create", TodoList),
  update: (id: string, patch: Patch[]) =>
    requests.patch<TodoList>("/Tasklists/Update/" + id, patch),
  replace: (TodoList: TodoList) =>
    requests.put<TodoList>("/Tasklists/Put/", TodoList),
  delete: (id: string) => requests.del("/Tasklists/Delete/" + id),
};

const TodoListItems = {
  list: (listId: string) =>
    requests.get<TodoListItem[]>("/Tasks/GetByList/" + listId),
  create: (item: TodoListItemCreate) =>
    requests.post<TodoListItem>("/Tasks/Create/", item),
  update: (id: string, patch: Patch[]) =>
    requests.patch<TodoListItem>("/Tasks/Update/" + id, patch),
  replace: (item: TodoListItem) =>
    requests.put<TodoListItem>("/Tasks/Put/", item),
  delete: (id: string) => requests.del("/Tasks/Delete/" + id),
};

const User = {
  login: (user: UserLogin) =>
    requests.post<UserAuthenticationResponse>("/Users/Login", user),
  register: (user: UserRegister) =>
    requests.post<UserAuthenticationResponse>("/Users/Register", user),
};

const agent = {
  TodoLists,
  TodoListItems,
  User,
};

export default agent;
