import RootStore from "../root-store";
import TodoStore from "./todos/todo-store";
import UsersStore from "./users/users-store";



export default class DataStore {
    todoStore: TodoStore;
    usersStore: UsersStore;

    constructor(rootStore: RootStore) {
        this.todoStore = new TodoStore(rootStore);
        this.usersStore = new UsersStore(rootStore);
    }
}