import { makeAutoObservable } from "mobx";
import TodoListItem from "../models/todolistitem.model";
import agent from "../api/agent";
import jsonpatch from "json-patch";

export default class TodoListItemStore {
  todoListItems: Map<string, TodoListItem> = new Map<string, TodoListItem>();
  isLoading: boolean = true;
  constructor() {
    makeAutoObservable(this);
  }
  get todoListItemsArray() {
    return Array.from(this.todoListItems.values());
  }
  setTodoListItem = (todoListItem: TodoListItem) => {
    this.todoListItems.set(todoListItem.id, todoListItem);
  };
  removeTodoListItem = (id: string) => {
    this.todoListItems.delete(id);
    agent.TodoListItems.delete(id);
  };
  loadTodoListItems = async (listId: string) => {
    this.isLoading = true;
    try {
      const items = await agent.TodoListItems.list(listId);

      this.todoListItems = new Map(
        [...items, ...this.todoListItemsArray].map((item) => [
          item.id,
          {
            ...item,
            deadline: new Date(item.deadline),
          },
        ])
      );
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  };
  setTodoListItemStatus = async (id: string, status: string) => {
    try {
      const item = await agent.TodoListItems.update(id, [
        {
          op: "replace",
          path: "/status",
          value: status,
        } as jsonpatch.ReplacePatch,
      ]);
      this.setTodoListItem(item);
    } catch (e) {
      console.error(e);
    }
  };
  getTodoListItemsByList(listId: string) {
    return this.todoListItemsArray.filter((item) => item.todolistId === listId);
  }
}
