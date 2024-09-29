import { createContext, useContext } from "react";
import UserStore from "./userStore";
import TodolistStore from "./todolistStore";
import TodoListItemStore from "./todolistitemStore";

interface Store {
  userStore: UserStore;
  todolistStore: TodolistStore;
  todolistitemStore: TodoListItemStore;
}

export const store: Store = {
  userStore: new UserStore(),
  todolistStore: new TodolistStore(),
  todolistitemStore: new TodoListItemStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
