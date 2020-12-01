import { action,observable, makeObservable, reaction} from 'mobx';

let runningId = 0;

export default class Todo {
    id:number;

    userId: number;

@observable 
    name:string;
@observable
    isCompleted: boolean = false;

    // private readonly disposer: () => void;

    constructor (name:string, userId: number) {
        this.name = name;
        this.id = runningId++;
        this.userId = userId;

        makeObservable(this, {
            name: observable,
            isCompleted: observable,
            toggleTodo: action,
            updateName: action
        })
    //   this.disposer =  reaction(
    //         () => this.isCompleted,
    //         () => console.log(`Todo ${this.name} changed to ${this.isCompleted ? 'Done' : 'isCompleted'}`)
    //     )

    }



    @action
    toggleTodo() {
        this.isCompleted = !this.isCompleted;
    }

    @action
    updateName(name: string) {
        this.name = name;
    }

    // dispose() {
    //     this.disposer()
    // // }
}

