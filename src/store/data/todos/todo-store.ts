import {observable, makeObservable, action,computed} from 'mobx';
import RootStore from "../../root-store";
import Todo from "./todo";

export default class TodoStore {
    @observable
    todoList: Todo[] =[];

    private rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this, {
            todoList:observable,
            addTodo:action,
            removeTodo: action,
            completedTodos: computed,
            inCompletedTodos: computed,
            getTodo:action
 } );

// reaction(
//     () => this.todoList.length,
//     () => console.log(`Current Todo Count ${this.todoList.length}, Done Todos: ${this.completedTodos}, incomplete todos:${this.inCompletedTodos}`)
// );
 
// when(
//     () => this.todoList.length > 0 && this.todoList.every( todo => todo.isCompleted),
//     () => console.log('congratulation')
// );


    }


    @action 
    addTodo(name:string, userId:number){
        this.todoList.push(new Todo(name, userId));
    }

    getUserTodos(userId: number){
        return this.todoList.filter(todo => todo.userId  === userId);
    }

    getTodo(name:string){
        return this.todoList.filter(todo => todo.name === name)[0];
    }


@action 
removeTodo(name:string){
    const todoToRemove = this.getTodo(name);

    if(todoToRemove){

        //todoToRemove.dispose();
        const todoToRemoveIndex = this.todoList.indexOf(todoToRemove);

        this.todoList.splice(todoToRemoveIndex, 1)
    }

}



@computed
get completedTodos() {
    return this.todoList.filter(todo => todo.isCompleted).length;
}

@computed
get inCompletedTodos() {
    return this.todoList.filter(todo => !todo.isCompleted).length;
}
}