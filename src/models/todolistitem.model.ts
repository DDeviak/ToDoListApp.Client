export default interface TodoListItem extends TodoListItemCreate {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  todolistId: string;
  status: string;
}

export interface TodoListItemCreate {
  title: string;
  description: string;
  deadline: Date;
  todolistId: string;
}
