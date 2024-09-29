export default interface TodoList {
  id: string;
  title: string;
  userId: string;
}

export interface TodoListCreate {
  title: string;
  userId: string;
}
