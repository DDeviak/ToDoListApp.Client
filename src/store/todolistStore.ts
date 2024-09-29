import { makeAutoObservable } from "mobx";
import TodoList from "../models/todolist.model";
import agent from "../api/agent";

export default class TodoListStore {
  todoLists: Map<string, TodoList> = new Map<string, TodoList>();
  isLoading: boolean = true;
  constructor() {
    makeAutoObservable(this);
  }
  get todoListsArray() {
    return Array.from(this.todoLists.values());
  }
  loadTodoLists = async (userId: string) => {
    this.isLoading = true;
    try {
      const lists = await agent.TodoLists.list(userId);
      this.todoLists = new Map(lists.map((list) => [list.id, list]));
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  };
  getTodoList = (id: string) => {
    return this.todoLists.get(id);
  };
  setTodoList = (todoList: TodoList) => {
    this.todoLists.set(todoList.id, todoList);
  };
  removeTodoList = (id: string) => {
    this.todoLists.delete(id);
  };
}
