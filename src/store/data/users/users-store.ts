import {action, makeObservable, observable} from 'mobx';
import RootStore from '../../root-store';
import User from "./user";


export default class UserStore {

    @observable
    users: User[] = [];

    private rootStore: RootStore;

    constructor(rootStore : RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            users: observable,
            addUser: action,
            removeUser: action
        })
    }

    @action
    addUser(name: string){
      this.users.push(new User(name, this.rootStore))
    }

    getUser(name : string) {
        return this.users.find(user=> user.name === name) as User;
    }


    @action 
    removeUser(name:string) {
        const userToRemove =this.getUser(name);

        if(userToRemove){
            userToRemove.todos.forEach(todo => this.rootStore.dataStores.todoStore.removeTodo(todo.name))
            const userToRemoveIndex = this.users.indexOf(userToRemove);

            this.users.splice(userToRemoveIndex, 1);
        
        }
    }
}