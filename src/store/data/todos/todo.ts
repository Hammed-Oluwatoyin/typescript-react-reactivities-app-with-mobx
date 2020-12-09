import { action,observable, makeObservable, reaction} from 'mobx';
import TodoStore from "./todo-store";
let runningId = 0;

export default class Todo {
    id:number;

    userId: number;

@observable 
    name:string;
@observable
    isCompleted: boolean = false;

     private readonly disposer: () => void;

     private store: TodoStore;

    constructor (name:string, userId: number, store: TodoStore) {

        this.store =store;
        this.name = name;
        this.id = runningId++;
        this.userId = userId;

        makeObservable(this, {
            name: observable,
            isCompleted: observable,
            toggleTodo: action,
            updateName: action
        })
       this.disposer =  reaction(
            () => this.isCompleted,
            () => console.log(`Todo ${this.name} changed to ${this.isCompleted ? 'Done' : 'isCompleted'}`)
        )

    }

    remove () {
        this.store.removeTodo(this.name);
    }


    @action
    toggleTodo() {
        this.isCompleted = !this.isCompleted;
    }

    @action
    updateName(name: string) {
        this.name = name;
    }

    dispose() {
        this.disposer()
     }
}

